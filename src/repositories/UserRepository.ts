// src/repositories/UserRepository.ts
import { User } from "../models/User";
import { Repository } from "./Repository";

const users: User[] = []; // Simulated user data, replace with actual API calls

export class UserRepository extends Repository<User> {
  constructor() {
    super(users);
  }
}
