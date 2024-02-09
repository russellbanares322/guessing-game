import { useState } from "react";
import { fourByFourGridData } from "../data/gridDatas";
import { GridLayout } from "../layout";
import { randomIndexGenerator } from "../utils/randomIndexGenerator";
import GameTimer from "./GameTimer";
import Modal from "./Modal";
import MoveCounter from "./MoveCounter";

const GameGridDisplay = () => {
  const [gridOptions, setGridOptions] = useState(fourByFourGridData);
  const [showGameResultModal, setShowGameResultModal] = useState(false);
  const [movesMade, setMovesMade] = useState(0);
  const [prevClicked, setPrevClicked] = useState<number | null>(null);
  const [revealedGrid, setRevealedGrid] = useState([]);

  const showItem = (rowIndex: number, colIndex: number) => {
    const selectedGridOption = gridOptions[rowIndex][colIndex];
    setPrevClicked(selectedGridOption);
  };

  const closeGameResultModal = () => {
    setShowGameResultModal(false);
  };

  return (
    <div>
      <GridLayout flexDirection="col">
        {gridOptions?.map((row, rowIndex) => (
          <GridLayout flexDirection="row" key={randomIndexGenerator(rowIndex)}>
            {row.map((number, colIndex) => (
              <button
                onClick={() => showItem(rowIndex, colIndex)}
                className={`p-3 rounded-full h-16 w-16 text-center text-white text-3xl cursor-pointer disabled:cursor-default bg-dark-blue duration-200 hover:scale-110`}
                key={randomIndexGenerator(colIndex)}
              >
                {number}
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
