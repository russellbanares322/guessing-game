import { numberOfPlayerOptions } from "../data/gameOptions";
import Button from "./Button";

const SelectNumberOfPlayers = () => {
  return (
    <div>
      <p className="text-light-blue text-sm font-semibold">
        Select Number of Players
      </p>
      <div className="flex justify-between w-full items-center gap-5 mt-3">
        {numberOfPlayerOptions.map((option) => (
          <Button size="medium" key={option} type="primary">
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SelectNumberOfPlayers;
