import { gql } from "@apollo/client";
import { LocalApolloClient } from "./UserRepository";

const PAY_BILL = gql`
  mutation PayBill($id: ID!) {
    payBill(id: $id) {
      id
    }
  }
`;

const PAY_CONTRIBUTION_TO_BILL = gql`
  query PayContribution($id: ID!, $contribution: String!) {
    payContribution(id: $id, amount: $contribution) {
      id
    }
  }
`;


export class BillRepository {
  client: LocalApolloClient;

  constructor(client: LocalApolloClient) {
    this.client = client;
  }

  async payBill(id: string) {
    const response = await this.client.mutate({
      mutation: PAY_BILL,
      variables: { id },
    });

    return response.data.payBill;
  }

  async payContribution(id: string) {
    const response = await this.client.query({
      query: PAY_CONTRIBUTION_TO_BILL,
      variables: { id },
    });

    return response.data.bill;
  }
}
