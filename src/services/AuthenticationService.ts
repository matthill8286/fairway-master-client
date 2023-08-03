// AuthService.ts
import AuthSubject from "./AuthSubject";

class AuthService {
  private baseUrl: string;
  private authSubject: AuthSubject;

  constructor(authSubject: AuthSubject) {
    // Replace the base URL with your backend API URL
    this.baseUrl = "http://localhost:3001";
    this.authSubject = authSubject;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/auth/sign-in`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data: { accessToken: string } = await response.json();

      this.authSubject.setAccessToken(data.accessToken);

      return { accessToken: data.accessToken };
    } catch (error: any) {
      throw new Error("Failed to log in. " + error.message);
    }
  }

  async register(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/v1/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data: { accessToken: string } = await response.json();

      this.authSubject.setAccessToken(data.accessToken);

      return { accessToken: data.accessToken };
    } catch (error: any) {
      throw new Error("Failed to register. " + error.message);
    }
  }

  async forgotPassword(username: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      await response.json();
    } catch (error: any) {
      throw new Error("Failed to log in. " + error.message);
    }
  }

  async fetchWithToken(url: string, options?: RequestInit): Promise<Response> {
    const accessToken = this.authSubject.getAccessToken();
    if (!accessToken) {
      throw new Error("Access token not available.");
    }

    const headers = {
      ...options?.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    return fetch(url, { ...options, headers });
  }
}

export default AuthService;
