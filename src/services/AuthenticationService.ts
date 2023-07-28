import { UserRepository } from "../repositories/UserRepository";
import { AdvancedLocalStorage } from "../utils/local.storage";

export class AuthenticationService {
  userRepository;
  advancedLocalStorage;

  constructor(userRepository: UserRepository, advancedLocalStorage: AdvancedLocalStorage) {
    this.userRepository = userRepository;
    this.advancedLocalStorage = advancedLocalStorage
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }

    localStorage.setItem("userId", user.id);
  }

  async registerAndCreateUser(username: string, password: string) {
    const response = await this.userRepository.createUser(username, password);

    if (!response || response.data.createUser) {
      throw new Error(`Failed to create user ${username}`);
    }

    return response.data.createUser
  }

  logout() {
    localStorage.removeItem("userId");
  }

  getCurrentUserId() {
    return localStorage.getItem("userId");
  }
}
