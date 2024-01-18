import { useGameContext } from "../context/GameContext";
import { gridSizeOptions } from "../data/gameOptions";
import Button from "./Button";

const SelectGridSize = () => {
  const { handleSelectGridSize, isOptionSelected } = useGameContext();

  return (
    <div>
      <p className="text-light-blue text-sm font-semibold">Select Grid Size</p>
      <div className="flex w-full items-center gap-5 mt-3">
        {gridSizeOptions.map((option) => (
          <Button
            onClick={() => handleSelectGridSize(option)}
            size="medium"
            key={option}
            type={isOptionSelected("gridSize", option) ? "primary" : "ghost"}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectGridSize;
