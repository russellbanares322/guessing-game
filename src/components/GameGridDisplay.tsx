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
  const [prevClickedGridItem, setPrevClickedGridItem] = useState<number | null>(
    null
  );
  const [gameTimerOptions, setGameTimerOptions] = useState({
    startTime: false,
    minutes: 0,
    seconds: 0,
  });
  const [disableGridButtons, setDisableGridButtons] = useState(false);

  const startGameTime = () => {
    setGameTimerOptions({
      ...gameTimerOptions,
      startTime: true,
    });
  };

  const showItem = (rowIndex: number, colIndex: number) => {
    const clickedGridItem = gridItems[rowIndex][colIndex];
    const hasPrevClickedGridItem = prevClickedGridItem !== null;
    const newRevealedGrid = [...revealedGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid(newRevealedGrid);
    setPrevClickedGridItem(clickedGridItem);
    startGameTime();

    if (hasPrevClickedGridItem) {
      const matchedSelectedGridItem = prevClickedGridItem === clickedGridItem;
      handleDisableGridButtons();
      if (!matchedSelectedGridItem) {
        setTimeout(() => {
          setPrevClickedGridItem(null);
          handleEnableGridButtons();
          newRevealedGrid[rowIndex][colIndex] = false;
          setRevealedGrid(newRevealedGrid);
        }, 700);
      }
    }
    incrementMovesMade();
  };

  const handleDisableGridButtons = () => {
    setDisableGridButtons(true);
  };

  const handleEnableGridButtons = () => {
    setDisableGridButtons(false);
  };

  const incrementMovesMade = () => {
    setMovesMade(movesMade + 1);
  };

  const closeGameResultModal = () => {
    setShowGameResultModal(false);
  };

  useEffect(() => {
    if (gameTimerOptions.startTime) {
      const isSecondReachedMaximum = gameTimerOptions.seconds === 60;
      const gameTimeInterval = setInterval(() => {
        setGameTimerOptions((prev) => ({ ...prev, seconds: prev.seconds + 1 }));

        if (isSecondReachedMaximum) {
          setGameTimerOptions((prev) => ({
            ...prev,
            seconds: 0,
            minutes: prev.minutes + 1,
          }));
        }
      }, 1000);
      return () => clearInterval(gameTimeInterval);
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
