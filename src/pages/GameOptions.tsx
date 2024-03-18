import { useNavigate } from "react-router-dom";
import {
  Button,
  SelectGameTheme,
  SelectGridSize,
  SelectNumberOfPlayers,
} from "../components";

const GameOptions = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate("/");
  };

  return (
    <div className="bg-dark-blue h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-xl max-w-[300px] w-full flex flex-col gap-3">
        <SelectGameTheme />
        <SelectNumberOfPlayers />
        <SelectGridSize />
        <div className="mt-3">
          <Button onClick={startGame} size="large" type="orange">
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOptions;
