// AuthSubject.ts
import { AuthObserver } from "./AuthObserver";

class AuthSubject {
  private observers: AuthObserver[] = [];
  private accessToken: string | null = null;

  // Register an observer
  addObserver(observer: AuthObserver): void {
    this.observers.push(observer);
  }

  // Unregister an observer
  removeObserver(observer: AuthObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  // Notify all registered observers when the access token is set
  private notifyObservers(): void {
    for (const observer of this.observers) {
      console.log("this.accessToken", { token: this.accessToken });

      // @ts-ignore
      observer.onTokenSet(this.accessToken);
    }
  }

  // Set the access token and notify the observers
  setAccessToken(accessToken: string | null): void {
    this.accessToken = accessToken;
    this.notifyObservers();
  }

  // Get the access token
  getAccessToken(): string | null {
    return this.accessToken;
  }
}

export default AuthSubject;
