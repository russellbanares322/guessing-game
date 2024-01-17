import {
  Button,
  SelectGameTheme,
  SelectGridSize,
  SelectNumberOfPlayers,
} from "../components";

const GameOptions = () => {
  return (
    <div className="bg-dark-blue h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-xl p-9 max-w-[450px] w-full m-5 flex flex-col gap-3">
        <SelectGameTheme />
        <SelectNumberOfPlayers />
        <SelectGridSize />
        <div className="mt-3">
          <Button size="large" type="orange">
            Start Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOptions;
