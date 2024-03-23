import { useEffect, useState } from "react";
import { fourByFourGridData } from "../data/gridDatas";
import { GridLayout } from "../layout";
import { randomIndexGenerator } from "../utils/randomIndexGenerator";
import GameTimer from "./GameTimer";
import Modal from "./Modal";
import MoveCounter from "./MoveCounter";

const dummy2dGrid = Array.from({ length: fourByFourGridData.length }).map(() =>
  Array.from({ length: fourByFourGridData[0].length }).fill(false)
);

const GameGridDisplay = () => {
  const [gridItems, setGridItems] = useState(fourByFourGridData);
  const [revealedGrid, setRevealedGrid] = useState(dummy2dGrid);
  const [showGameResultModal, setShowGameResultModal] = useState(false);
  const [matchedItems, setMatchedItems] = useState<number[]>([]);
  const [itemsToCompare, setItemsToCompare] = useState<number[]>([]);
  const [movesMade, setMovesMade] = useState(0);
  const [gameTimerOptions, setGameTimerOptions] = useState({
    startTime: false,
    minutes: 0,
    seconds: 0,
  });
  const [disableGridButtons, setDisableGridButtons] = useState(false);

  const startGameTime = () => {
    if (!gameTimerOptions.startTime) {
      setGameTimerOptions({
        ...gameTimerOptions,
        startTime: true,
      });
    }
  };

  const incrementMovesMade = () => {
    setMovesMade(movesMade + 1);
  };

  const showItem = (rowIndex: number, colIndex: number) => {
    // Reveal grid item using rowIndex and colIndex
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    const clickedGridItem = gridItems[rowIndex][colIndex];
    const isItemsBeingCompared = itemsToCompare.length === 2;

    setRevealedGrid(newRevealedGrid);
    setItemsToCompare([...itemsToCompare, clickedGridItem]);

    // Game time will start once user reveals an item
    startGameTime();
    // Increment move counter everytime user reveals an item
    incrementMovesMade();

    if (isItemsBeingCompared) {
      handleDisableGridButtons();
      compareClickedGridItems();
    }
  };

  const compareClickedGridItems = () => {
    // Do the logic for comparing selected grid item
    const isClickedItemsMatched = itemsToCompare.reduce((a, b) =>
      Number(a === b)
    );

    setTimeout(() => {
      if (!isClickedItemsMatched) {
        setItemsToCompare([]);
        handleEnableGridButtons();
      }

      // Implement checking of clicked grid items
      setMatchedItems([...matchedItems, ...itemsToCompare]);
    }, 2000);
  };

  const handleDisableGridButtons = () => {
    setDisableGridButtons(true);
  };

  const handleEnableGridButtons = () => {
    setDisableGridButtons(false);
  };

  const closeGameResultModal = () => {
    setShowGameResultModal(false);
  };

  useEffect(() => {
    if (gameTimerOptions.startTime) {
      const isSecondReachedMaximum = gameTimerOptions.seconds === 60;
      setInterval(() => {
        setGameTimerOptions((prev) => ({ ...prev, seconds: prev.seconds + 1 }));

        if (isSecondReachedMaximum) {
          setGameTimerOptions((prev) => ({
            ...prev,
            seconds: 0,
            minutes: prev.minutes + 1,
          }));
        }
      }, 1000);
    }
  }, [gameTimerOptions.startTime, gameTimerOptions.seconds]);

  return (
    <div>
      <GridLayout flexDirection="col">
        {gridItems?.map((row, rowIndex) => (
          <GridLayout flexDirection="row" key={randomIndexGenerator(rowIndex)}>
            {row.map((number, colIndex) => (
              <button
                disabled={disableGridButtons}
                onClick={() => showItem(rowIndex, colIndex)}
                className={`p-3 rounded-full h-16 w-16 text-center text-white text-3xl cursor-pointer disabled:cursor-default bg-dark-blue  ${
                  !disableGridButtons && "hover:scale-110  duration-200"
                }`}
                key={randomIndexGenerator(colIndex)}
              >
                {revealedGrid[rowIndex][colIndex] ? number : ""}
              </button>
            ))}
          </GridLayout>
        ))}
      </GridLayout>
      <div className="flex items-center justify-between gap-6 mt-16">
        <GameTimer
          minutes={gameTimerOptions.minutes}
          seconds={gameTimerOptions.seconds}
        />
        <MoveCounter movesMade={movesMade} />
      </div>
      <Modal open={showGameResultModal} onClose={closeGameResultModal}>
        <h1 className="text-dark-blue font-bold text-xl">You did it!</h1>
      </Modal>
    </div>
  );
};

export default GameGridDisplay;
