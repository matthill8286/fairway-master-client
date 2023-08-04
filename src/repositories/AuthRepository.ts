// src/repositories/AuthRepository.ts
export interface AuthRepository<T> {
    login: (credentials: T) => Promise<boolean>;
    register: (userData: T) => Promise<boolean>;
  }
  
  const users: { username: string; password: string }[] = []; // Simulated user data, replace with actual API calls
  
  export const createAuthRepository = <T>(credentialMapper: (credentials: T) => { username: string; password: string }, userDataMapper: (userData: T) => { username: string; password: string }): AuthRepository<T> => {
    return {
      login: async (credentials: T): Promise<boolean> => {
        // Simulated login logic
        const { username, password } = credentialMapper(credentials);
        const user = users.find((u) => u.username === username && u.password === password);
        return Promise.resolve(!!user);
      },
      register: async (userData: T): Promise<boolean> => {
        // Simulated registration logic
        const { username } = userDataMapper(userData);
        const userExists = users.some((u) => u.username === username);
        if (userExists) {
          return Promise.resolve(false);
        }
  
        const { username: newUsername, password: newPassword } = userDataMapper(userData);
        users.push({ username: newUsername, password: newPassword });
        return Promise.resolve(true);
      },
    };
  };
  