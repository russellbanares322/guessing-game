import { gridSizeOptions } from "../data/gameOptions";
import Button from "./Button";

const SelectGridSize = () => {
  return (
    <div>
      <p className="text-light-blue text-sm font-semibold">Select Grid Size</p>
      <div className="flex w-full items-center gap-5 mt-3">
        {gridSizeOptions.map((option) => (
          <Button size="medium" key={option} type="primary">
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectGridSize;
