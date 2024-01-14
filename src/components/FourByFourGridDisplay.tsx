import { useEffect, useState } from "react";
import { fourByFourGridData } from "../data/gridDatas";
import { GridLayout } from "../layout";
import { randomIndexGenerator } from "../utils/randomIndexGenerator";
import GameTimer from "./GameTimer";
import Modal from "./Modal";
import MoveCounter from "./MoveCounter";

type SavedGridNumbers = {
  id: number;
  selectedNumber: number;
};

type TGridOptions = {
  selectedGridNumber: SavedGridNumbers[] | [];
  matchedNumbers: SavedGridNumbers[] | [];
  movesMade: number;
  showGameResultModal: boolean;
};

const FourByFourGridDisplay = () => {
  const [gridOptions, setGridOptions] = useState<TGridOptions>({
    selectedGridNumber: [],
    matchedNumbers: [],
    movesMade: 0,
    showGameResultModal: false,
  });
  const hasTwoSelectedGridNumber = gridOptions.selectedGridNumber.length === 2;
  const flattenGridData = fourByFourGridData.flat();
  const allOptionsMatched =
    gridOptions.matchedNumbers.length === flattenGridData.length;

  const clearSelectedGridNumberArr = () => {
    const selectedGridNumberRemoverTimeout = setTimeout(() => {
      setGridOptions({
        ...gridOptions,
        selectedGridNumber: [],
      });
    }, 1000);

    return () => clearTimeout(selectedGridNumberRemoverTimeout);
  };

  const selectNumber = (selectedNumberData: SavedGridNumbers) => {
    setGridOptions({
      ...gridOptions,
      movesMade: gridOptions.movesMade + 1,
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

  const openGameResultModal = () => {
    setGridOptions({
      ...gridOptions,
      showGameResultModal: true,
    });
  };

  const closeGameResultModal = () => {
    clearGridOptionsState();
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
          ...gridOptions,
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

  useEffect(() => {
    if (allOptionsMatched) {
      openGameResultModal();
    }
  }, [gridOptions.matchedNumbers]);

  const clearGridOptionsState = () => {
    setGridOptions({
      selectedGridNumber: [],
      matchedNumbers: [],
      movesMade: 0,
      showGameResultModal: false,
    });
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
                  )} ${
                    !hasTwoSelectedGridNumber && "hover:scale-110"
                  } duration-200`}
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
        <MoveCounter movesMade={gridOptions.movesMade} />
      </div>
      <Modal
        open={gridOptions.showGameResultModal}
        onClose={closeGameResultModal}
      >
        <h1 className="text-dark-blue font-bold text-xl">You did it!</h1>
      </Modal>
    </div>
  );
};

export default FourByFourGridDisplay;
