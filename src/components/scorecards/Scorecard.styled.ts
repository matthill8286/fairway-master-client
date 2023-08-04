import { styled } from "styled-components";

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

export { Container, Header, GolferName, Date, FinalScore, Table }