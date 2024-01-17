import { themeOptions } from "../data/gameOptions";
import Button from "./Button";

const SelectGameTheme = () => {
  return (
    <div>
      <p className="text-light-blue text-sm font-semibold">Select Theme</p>
      <div className="flex w-full items-center gap-5 mt-3">
        {themeOptions.map((option) => (
          <Button size="medium" key={option} type="primary">
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectGameTheme;
