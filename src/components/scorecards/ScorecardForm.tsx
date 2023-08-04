import { useState } from "react";

interface ScorecardFormProps {
  scorecardRepository: any;
}

const ScorecardForm = () => {
  const [value, setValue] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      // const scorecard = await scorecardRepository.createScorecard();
      // await scorecardRepository.addScoreToScorecard(
      //   scorecard.id,
      //   parseInt(value, 10),
      // );
      // Perform necessary actions upon successful scorecard creation and score addition
    } catch (error) {
      console.error("Failed to create scorecard or add score:", error);
    }
  };

  return (
    <div>
      <h2>Scorecard Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Score Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">Add Score</button>
      </form>
    </div>
  );
};

export default ScorecardForm;
