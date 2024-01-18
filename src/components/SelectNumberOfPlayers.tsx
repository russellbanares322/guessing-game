import { useGameContext } from "../context/GameContext";
import { numberOfPlayerOptions } from "../data/gameOptions";
import Button from "./Button";

const SelectNumberOfPlayers = () => {
  const { handleSelectNumberOfPlayers, isOptionSelected } = useGameContext();

  return (
    <div>
      <p className="text-light-blue text-sm font-semibold">
        Select Number of Players
      </p>
      <div className="flex justify-between w-full items-center gap-5 mt-3">
        {numberOfPlayerOptions.map((option) => (
          <Button
            onClick={() => handleSelectNumberOfPlayers(option)}
            size="medium"
            key={option}
            type={
              isOptionSelected("numberOfPlayers", option) ? "primary" : "ghost"
            }
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectNumberOfPlayers;
