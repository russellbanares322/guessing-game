import { useState } from "react";
import { fourByFourGridData } from "../data/gridDatas";
import { GridLayout } from "../layout";
import { randomIndexGenerator } from "../utils/randomIndexGenerator";

type SavedGridNumbers = {
  id: number;
  selectedNumber: number;
};

type TGridOptions = {
  selectedGridNumber: SavedGridNumbers[] | [];
  matchedNumbers: SavedGridNumbers[] | [];
};

const FourByFourGridDisplay = () => {
  const [gridOptions, setGridOptions] = useState<TGridOptions>({
    selectedGridNumber: [],
    matchedNumbers: [],
  });
  const hasTwoSelectedGridNumber = gridOptions.selectedGridNumber.length === 2;

  const clearSelectedGridNumberArr = () => {
    const selectedGridNumberRemoverTimeout = setTimeout(() => {
      setGridOptions({
        ...gridOptions,
        selectedGridNumber: [],
      });
    }, 2000);

    return () => clearTimeout(selectedGridNumberRemoverTimeout);
  };

  const selectNumber = (selectedNumberData: SavedGridNumbers) => {
    const selectedGridNumberArr = gridOptions.selectedGridNumber;
    setGridOptions({
      ...gridOptions,
      selectedGridNumber: [...selectedGridNumberArr, selectedNumberData],
    });

    if (hasTwoSelectedGridNumber) {
      const firstSelectedGridNumber = selectedGridNumberArr[0].selectedNumber;
      const secondSelectedGridNumber = selectedGridNumberArr[1].selectedNumber;
      const gridNumbersMatched =
        firstSelectedGridNumber === secondSelectedGridNumber;

      if (!gridNumbersMatched) {
        clearSelectedGridNumberArr();
      }
      setGridOptions({
        ...gridOptions,
        matchedNumbers: [
          ...gridOptions.matchedNumbers,
          ...selectedGridNumberArr,
        ],
      });
    }
  };

  const showGridNumber = (
    selectedNumberIndex: number,
    selectedNumber: number
  ) => {
    const isGridNumberPresent = gridOptions.matchedNumbers.some(
      (num) =>
        num.id === selectedNumberIndex && num.selectedNumber === selectedNumber
    );
    const isGridNumberSelected = gridOptions.selectedGridNumber.some(
      (num) =>
        num.id === selectedNumberIndex && num.selectedNumber === selectedNumber
    );

    if (isGridNumberPresent || isGridNumberSelected) {
      return selectedNumber;
    }

    return "";
  };

  return (
    <>
      {JSON.stringify(gridOptions)}
      <GridLayout flexDirection="col">
        {fourByFourGridData?.map((row, rowIndex) => (
          <GridLayout flexDirection="row" key={randomIndexGenerator(rowIndex)}>
            {row.map((number, colIndex) => {
              const selectedNumberData = {
                id: colIndex,
                selectedNumber: number,
              };
              return (
                <button
                  disabled={hasTwoSelectedGridNumber}
                  onClick={() => selectNumber(selectedNumberData)}
                  className="bg-dark-blue p-3 rounded-full h-16 w-16 text-center text-white text-3xl cursor-pointer"
                  key={randomIndexGenerator(colIndex)}
                >
                  {showGridNumber(colIndex, number)}
                </button>
              );
            })}
          </GridLayout>
        ))}
      </GridLayout>
    </>
  );
};

export default FourByFourGridDisplay;
