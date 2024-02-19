import { GameTimerAndMovesLayout } from "../layout";

type GameTimerProps = {
  minutes: number;
  seconds: number;
};

const GameTimer = ({ minutes, seconds }: GameTimerProps) => {
  const isGameTimeDouble = seconds.toString().length === 2;
  const formattedSeconds = isGameTimeDouble ? seconds : `0${seconds}`;
  const formattedGameTime = `${minutes}:${formattedSeconds}`;
  return <GameTimerAndMovesLayout label="Time" value={formattedGameTime} />;
};

export default GameTimer;
