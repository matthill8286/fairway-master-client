import { Container, GolferName, FinalScore, Table, Header } from "./Scorecard.styled";

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


export default GolfScorecard;
