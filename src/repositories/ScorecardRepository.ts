import { gql } from "@apollo/client";

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
  client;

  constructor(client: any) {
    this.client = client;
  }

  async createScorecard() {
    const response = await this.client.mutate({
      mutation: CREATE_SCORECARD,
    });

    return response.data.createScorecard;
  }

  async getScorecardById(id: any) {
    const response = await this.client.query({
      query: GET_SCORECARD_BY_ID,
      variables: { id },
    });

    return response.data.scorecard;
  }

  async addScoreToScorecard(scorecardId: any, value: any) {
    const response = await this.client.mutate({
      mutation: ADD_SCORE_TO_SCORECARD,
      variables: { scorecardId, value },
    });

    return response.data.addScoreToScorecard;
  }
}
