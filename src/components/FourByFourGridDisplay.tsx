import { useState } from "react";
import { fourByFourGridData } from "../data/gridDatas";
import { randomIndexGenerator } from "../utils/randomIndexGenerator";

//*TODO: Create a separate grid renderer layout that can be reused at any component

const FourByFourGridDisplay = () => {
  const [gridArr] = useState(fourByFourGridData);

  return (
    <div className="flex flex-col gap-5">
      {gridArr?.map((row, rowIndex) => (
        <div className="flex" key={randomIndexGenerator(rowIndex)}>
          {row.map((col, colIndex) => (
            <div key={randomIndexGenerator(colIndex)}>{col}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FourByFourGridDisplay;
