import { useEffect, useState } from "react";
import { fourByFourGridData } from "../data/gridDatas";
import { GridLayout } from "../layout";
import { randomIndexGenerator } from "../utils/randomIndexGenerator";
import GameTimer from "./GameTimer";
import Modal from "./Modal";
import MoveCounter from "./MoveCounter";

const GameGridDisplay = () => {
  const [gridItems] = useState(fourByFourGridData);
  const [revealedGrid, setRevealedGrid] = useState(
    Array.from({ length: gridItems.length }).map(() =>
      Array.from({ length: gridItems[0].length }).fill(false)
    )
  );
  const [showGameResultModal, setShowGameResultModal] = useState(false);
  const [movesMade, setMovesMade] = useState(0);
  const [prevClickedGridItems, setPrevClickedGridItems] = useState<number[]>(
    []
  );
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);
  const [selectedColIndex, setSelectedColIndex] = useState<number | null>(null);

  const showItem = (rowIndex: number, colIndex: number) => {
    const clickedGridItem = gridItems[rowIndex][colIndex];
    setSelectedRowIndex(rowIndex);
    setSelectedColIndex(colIndex);

    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);
    setPrevClickedGridItems([...prevClickedGridItems, clickedGridItem]);
    incrementMovesMade();
  };

  useEffect(() => {
    if (selectedRowIndex === null && selectedColIndex === null) return;

    if (prevClickedGridItems.length === 2) {
      setTimeout(() => {
        const isNumberMatched = prevClickedGridItems.reduce((a, b) =>
          Number(a === b)
        );
        if (!isNumberMatched) {
          newRevealedGrid[selectedRowIndex][selectedColIndex] = false;
          setRevealedGrid(newRevealedGrid);
          clearPreviousSelectedItems();
        } else {
          newRevealedGrid[selectedRowIndex][selectedColIndex] = true;
          setRevealedGrid(newRevealedGrid);
          clearPreviousSelectedItems();
        }
      }, 500);
    }
  }, []);

  const clearPreviousSelectedItems = () => {
    setPrevClickedGridItems([]);
  };

  const incrementMovesMade = () => {
    setMovesMade(movesMade + 1);
  };

  const closeGameResultModal = () => {
    setShowGameResultModal(false);
  };

  return (
    <div>
      <GridLayout flexDirection="col">
        {gridItems?.map((row, rowIndex) => (
          <GridLayout flexDirection="row" key={randomIndexGenerator(rowIndex)}>
            {row.map((number, colIndex) => (
              <button
                onClick={() => showItem(rowIndex, colIndex)}
                className={`p-3 rounded-full h-16 w-16 text-center text-white text-3xl cursor-pointer disabled:cursor-default bg-dark-blue duration-200 hover:scale-110`}
                key={randomIndexGenerator(colIndex)}
              >
                {revealedGrid[rowIndex][colIndex] ? number : ""}
              </button>
            ))}
          </GridLayout>
        ))}
      </GridLayout>
      <div className="flex items-center justify-between gap-6 mt-16">
        <GameTimer />
        <MoveCounter movesMade={movesMade} />
      </div>
      <Modal open={showGameResultModal} onClose={closeGameResultModal}>
        <h1 className="text-dark-blue font-bold text-xl">You did it!</h1>
      </Modal>
    </div>
  );
};

export default GameGridDisplay;
