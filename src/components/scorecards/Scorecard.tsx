import styled from "styled-components";

const GolfScorecard = () => {
  const scorecardData = [
    { hole: 1, par: 4, score: 5, yardage: 375 },
    { hole: 2, par: 3, score: 4, yardage: 180 },
    { hole: 3, par: 5, score: 6, yardage: 540 },
    // Add more scorecard data as needed
  ];

  const golferName = "John Doe";
  const date = "June 27, 2023";
  const finalScore = scorecardData.reduce(
    (total, data) => total + data.score,
    0,
  );

  return (
    <Container>
      <Header>
        <GolferName>{golferName}</GolferName>
        <div>
          <Date>{date}</Date>
          <FinalScore>Final Score: {finalScore}</FinalScore>
        </div>
      </Header>
      <Table>
        <thead>
          <tr>
            <th>Hole</th>
            <th>Par</th>
            <th>Score</th>
            <th>Yardage</th>
          </tr>
        </thead>
        <tbody>
          {scorecardData.map((data) => (
            <tr key={data.hole}>
              <td>{data.hole}</td>
              <td>{data.par}</td>
              <td>{data.score}</td>
              <td>{data.yardage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const GolferName = styled.h2`
  font-size: 24px;
`;

const Date = styled.p`
  margin: 0;
`;

const FinalScore = styled.p`
  margin: 0;
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    text-align: center;
    border: 1px solid #ccc;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }
`;

export default GolfScorecard;
