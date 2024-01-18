import { useGameContext } from "../context/GameContext";
import { gridThemeOptions } from "../data/gameOptions";
import Button from "./Button";

const SelectGameTheme = () => {
  const { handleSelectGridTheme, isOptionSelected } = useGameContext();

  return (
    <div>
      <p className="text-light-blue text-sm font-semibold">Select Theme</p>
      <div className="flex w-full items-center gap-5 mt-3">
        {gridThemeOptions.map((option) => (
          <Button
            onClick={() => handleSelectGridTheme(option)}
            size="medium"
            key={option}
            type={isOptionSelected("gridTheme", option) ? "primary" : "ghost"}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectGameTheme;
