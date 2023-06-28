import { UserRepository } from "../repositories/UserRepository";

export class AuthenticationService {
  userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async login(username: any, password: any) {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }

    localStorage.setItem("userId", user.id);
  }

  logout() {
    localStorage.removeItem("userId");
  }

  getCurrentUserId() {
    return localStorage.getItem("userId");
  }
}
