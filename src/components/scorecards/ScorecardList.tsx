import { FC, useEffect, useState } from "react";

interface ScorecardListProps {
  scorecardRepository: any;
}

const ScorecardList: FC<ScorecardListProps> = ({ scorecardRepository }) => {
  const [scorecards, setScorecards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scorecards = await scorecardRepository.getAllScorecards();
        setScorecards(scorecards);
      } catch (error) {
        console.error("Failed to fetch scorecards:", error);
      }
    };

    fetchData();
  }, [scorecardRepository]);

  return (
    <div>
      <h2>Scorecard List</h2>
      <ul>
        {scorecards.map((scorecard: any) => (
          <li key={scorecard.id}>
            <span>Scorecard ID: {scorecard.id}</span>
            <span>Scores: {scorecard.scores.join(", ")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScorecardList;
