import { useEffect, useState } from "react";
import { fourByFourGridData } from "../data/gridDatas";
import { GridLayout } from "../layout";
import { randomIndexGenerator } from "../utils/randomIndexGenerator";
import GameTimer from "./GameTimer";
import MoveCounter from "./MoveCounter";

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
    setGridOptions({
      ...gridOptions,
      selectedGridNumber: [
        ...gridOptions.selectedGridNumber,
        selectedNumberData,
      ],
    });
  };

  const showGridNumber = (
    selectedNumberIndex: number,
    selectedNumber: number
  ): string | number => {
    if (
      isOptionSaved(selectedNumberIndex, selectedNumber) ||
      isOptionSelected(selectedNumberIndex, selectedNumber)
    ) {
      return selectedNumber;
    }

    return "";
  };

  useEffect(() => {
    if (hasTwoSelectedGridNumber) {
      const selectedGridNumberArr = gridOptions.selectedGridNumber;

      const firstSelectedGridNumber = selectedGridNumberArr[0].selectedNumber;
      const secondSelectedGridNumber = selectedGridNumberArr[1].selectedNumber;
      const gridNumbersMatched =
        firstSelectedGridNumber === secondSelectedGridNumber;

      if (gridNumbersMatched) {
        setGridOptions({
          selectedGridNumber: [],
          matchedNumbers: [
            ...gridOptions.matchedNumbers,
            ...selectedGridNumberArr,
          ],
        });
      } else {
        clearSelectedGridNumberArr();
      }
    }
  }, [gridOptions.selectedGridNumber.length]);

  const isOptionSelected = (
    selectedNumberIndex: number,
    selectedNumber: number
  ): boolean => {
    const optionCurrentlySelected = gridOptions.selectedGridNumber.some(
      (num) =>
        num.id === selectedNumberIndex && num.selectedNumber === selectedNumber
    );

    if (optionCurrentlySelected) {
      return true;
    }

    return false;
  };

  const isOptionSaved = (
    selectedNumberIndex: number,
    selectedNumber: number
  ): boolean => {
    const optionSaved = gridOptions.matchedNumbers.some(
      (num) =>
        num.id === selectedNumberIndex && num.selectedNumber === selectedNumber
    );

    if (optionSaved) {
      return true;
    }
    return false;
  };

  const getGridOptionButtonColor = (
    selectedNumberIndex: number,
    selectedNumber: number
  ): string => {
    if (isOptionSaved(selectedNumberIndex, selectedNumber)) {
      return "bg-ghost-blue";
    } else if (isOptionSelected(selectedNumberIndex, selectedNumber)) {
      return "bg-orange";
    } else {
      return "bg-dark-blue";
    }
  };

  return (
    <div>
      <GridLayout flexDirection="col">
        {fourByFourGridData?.map((row, rowIndex) => (
          <GridLayout flexDirection="row" key={randomIndexGenerator(rowIndex)}>
            {row.map((number, colIndex) => {
              const selectedNumberData: SavedGridNumbers = {
                id: colIndex,
                selectedNumber: number,
              };

              return (
                <button
                  disabled={hasTwoSelectedGridNumber}
                  onClick={() => selectNumber(selectedNumberData)}
                  className={`p-3 rounded-full h-16 w-16 text-center text-white text-3xl cursor-pointer disabled:cursor-default ${getGridOptionButtonColor(
                    colIndex,
                    number
                  )}`}
                  key={randomIndexGenerator(colIndex)}
                >
                  {showGridNumber(colIndex, number)}
                </button>
              );
            })}
          </GridLayout>
        ))}
      </GridLayout>
      <div className="flex items-center justify-between gap-6 mt-16">
        <GameTimer />
        <MoveCounter />
      </div>
    </div>
  );
};

export default FourByFourGridDisplay;
