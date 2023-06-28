import axios from "axios";
import { User } from "../components/user/User";

const API_URL = `${process.env.REACT_APP_API}/users`;

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error}`);
  }
};

export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await axios.post(API_URL, user);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching user with id ${id}: ${error}`);
  }
};

export const updateUser = async (id: string, user: User): Promise<User> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating user with id ${id}: ${error}`);
  }
};

export const deleteUser = async (id: string): Promise<User> => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting user with id ${id}: ${error}`);
  }
};
