import { useState } from "react";
import { fourByFourGridData } from "../data/gridDatas";
import { GridLayout } from "../layout";
import { randomIndexGenerator } from "../utils/randomIndexGenerator";

//*TODO: Create a separate grid renderer layout that can be reused at any component

const FourByFourGridDisplay = () => {
  const [grid] = useState(fourByFourGridData);

  return (
    <GridLayout flexDirection="col">
      {grid?.map((row, rowIndex) => (
        <GridLayout flexDirection="row" key={randomIndexGenerator(rowIndex)}>
          {row.map((col, colIndex) => (
            <div
              className="bg-dark-blue p-3 rounded-full h-16 w-16 text-center text-white text-3xl"
              key={randomIndexGenerator(colIndex)}
            >
              {col}
            </div>
          ))}
        </GridLayout>
      ))}
    </GridLayout>
  );
};

export default FourByFourGridDisplay;
