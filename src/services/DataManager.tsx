// DataManager.ts
import AuthSubject from "./AuthSubject";

interface State {
  data: any;
  loading: boolean;
  error: string | null;
}

interface Observer {
  update(newState: State): void;
}

class DataManager {
  private static instance: DataManager | null = null;

  static getInstance(authManager: AuthSubject): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager(authManager);
    }
    return DataManager.instance;
  }

  private state: State = {
    data: null,
    loading: false,
    error: null,
  };

  private observers: Observer[] = [];
  private authManager: AuthSubject;

  constructor(authManager: AuthSubject) {
    this.authManager = authManager;
  }

  async fetchData(url: string) {
    this.setState({ loading: true });

    try {
      const accessToken = this.authManager.getAccessToken();

      if (!accessToken) {
        throw new Error("Access token not available.");
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error: any) {
      this.setState({ error: error.message, loading: false });
    }
  }

  private setState(newState: Partial<State>) {
    this.state = { ...this.state, ...newState };
    this.notifyObservers();
  }

  addObserver(observer: Observer) {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private notifyObservers() {
    this.observers.forEach((observer) => observer.update(this.state));
  }
}

export default DataManager;
