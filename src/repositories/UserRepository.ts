import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;

const GET_USER_BY_USERNAME = gql`
  query GetUserById($username: String!) {
    user(username: $username) {
      id
      username
    }
  }
`;

const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $username: String!, $password: String!) {
    updateUser(id: $id, username: $username, password: $password) {
      id
      username
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export class UserRepository {
  client: ApolloClient<InMemoryCache>;

  constructor(client: ApolloClient<InMemoryCache>) {
    this.client = client;
  }

  async createUser(username: string, password: string) {
    const response = await this.client.mutate({
      mutation: CREATE_USER,
      variables: { username, password },
    });

    return response.data.createUser;
  }

  async getUserByUsername(username: string) {
    const response = await this.client.query({
      query: GET_USER_BY_USERNAME,
      variables: { username },
    });

    return response.data.user;
  }

  async getUserById(id: string) {
    const response = await this.client.query({
      query: GET_USER_BY_ID,
      variables: { id },
    });

    return response.data.user;
  }

  async getAllUsers() {
    const response = await this.client.query({
      query: GET_ALL_USERS,
    });

    return response.data.users;
  }

  async updateUser(id: string, username: string, password: string) {
    const response = await this.client.mutate({
      mutation: UPDATE_USER,
      variables: { id, username, password },
    });

    return response.data.updateUser;
  }

  async deleteUser(id: string) {
    const response = await this.client.mutate({
      mutation: DELETE_USER,
      variables: { id },
    });

    return response.data.deleteUser;
  }
}
