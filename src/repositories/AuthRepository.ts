import AuthSubject from "../services/AuthSubject";

export type AccessToken = { accessToken: string };

export interface AuthRepository<T> {
  login: (credentials: T) => Promise<AccessToken>;
  register: (userData: T) => void;
  resetPassword?: (userData: T) => void;
}

const baseUrl = process.env.REACT_APP_API || "http://localhost:3001";

export const createAuthRepository = <T>(
  credentialMapper: (credentials: T) => { email: string; password: string },
  userDataMapper: (userData: T) => { email: string; password: string },
  authSubject: AuthSubject,
): AuthRepository<T> => {
  return {
    login: async (credentials: T): Promise<AccessToken> => {
      try {
        const { email, password } = credentialMapper(credentials);
        const response = await fetch(`${baseUrl}/v1/auth/sign-in`, {
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

        authSubject.setAccessToken(data.accessToken);

        return { accessToken: data.accessToken };
      } catch (error: any) {
        throw new Error("Failed to log in. " + error.message);
      }
    },
    register: async (userData: T) => {
      try {
        const { email, password } = userDataMapper(userData);
        const response = await fetch(`${baseUrl}/v1/auth/sign-up`, {
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

        authSubject.setAccessToken(data.accessToken);
      } catch (error: any) {
        throw new Error("Failed to register. " + error.message);
      }
    },
  };
};
