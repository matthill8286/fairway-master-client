export interface User {
  id: string;
  username?: string;
  name?: string;
  password?: string;
  email?: string;
  contribution?: number;
}

export type UserContribution = {
  id: string;
  name: string;
  contribution: number;
};
