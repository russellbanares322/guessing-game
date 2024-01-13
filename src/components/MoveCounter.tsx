import { GameTimerAndMovesLayout } from "../layout";

type MoveCounterProps = {
  movesMade: number;
};

const MoveCounter = ({ movesMade }: MoveCounterProps) => {
  return <GameTimerAndMovesLayout label="Moves" value={movesMade} />;
};

export default MoveCounter;
