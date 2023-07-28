import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { LocalApolloClient } from "./UserRepository";

const CREATE_SCORECARD = gql`
  mutation CreateScorecard {
    createScorecard {
      id
    }
  }
`;

const GET_SCORECARD_BY_ID = gql`
  query GetScorecardById($id: ID!) {
    scorecard(id: $id) {
      id
      scores
    }
  }
`;

const ADD_SCORE_TO_SCORECARD = gql`
  mutation AddScoreToScorecard($scorecardId: ID!, $value: Int!) {
    addScoreToScorecard(scorecardId: $scorecardId, value: $value) {
      id
      scores
    }
  }
`;

export class ScorecardRepository {
  client: LocalApolloClient;

  constructor(client: LocalApolloClient) {
    this.client = client;
  }

  async createScorecard() {
    const response = await this.client.mutate({
      mutation: CREATE_SCORECARD,
    });

    return response.data.createScorecard;
  }

  async getScorecardById(id: string) {
    const response = await this.client.query({
      query: GET_SCORECARD_BY_ID,
      variables: { id },
    });

    return response.data.scorecard;
  }

  async addScoreToScorecard(scorecardId: string, value: string | string[]) {
    const response = await this.client.mutate({
      mutation: ADD_SCORE_TO_SCORECARD,
      variables: { scorecardId, value },
    });

    return response.data.addScoreToScorecard;
  }
}
