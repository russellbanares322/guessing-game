import React, { createContext, useContext, useState } from "react";
import {
  GridSizeOptions,
  NumberOfPlayerOptions,
  ThemeOptions,
} from "../data/gameOptions";

type GameContextProviderProp = {
  children: React.ReactNode;
};

type GameContextValues = {
  selectedGameTheme: ThemeOptions;
  selectedNumberOfPlayers: NumberOfPlayerOptions;
  selectedGridSize: GridSizeOptions;
};

export const GameContext = createContext<GameContextValues>({
  selectedGameTheme: "Numbers",
  selectedNumberOfPlayers: 1,
  selectedGridSize: "4x4",
});

export const useGameContext = () => {
  const gameContextData = useContext(GameContext);
  if (!gameContextData) return;
  return gameContextData;
};

const GameContextProvider = ({ children }: GameContextProviderProp) => {
  const [selectedGameTheme, setSelectedGameTheme] =
    useState<ThemeOptions>("Numbers");
  const [selectedNumberOfPlayers, setSelectedNumberOfPlayers] =
    useState<NumberOfPlayerOptions>(1);
  const [selectedGridSize, setSelectedGridSize] =
    useState<GridSizeOptions>("4x4");

  const handleSelectGameTheme = (gameTheme: ThemeOptions) => {
    setSelectedGameTheme(gameTheme);
  };

  const handleSelectNumberOfPlayers = (
    numberOfPlayers: NumberOfPlayerOptions
  ) => {
    setSelectedNumberOfPlayers(numberOfPlayers);
  };

  const handleSelectGridSize = (gridSize: GridSizeOptions) => {
    setSelectedGridSize(gridSize);
  };

  const gameContextValues = {
    selectedGameTheme,
    selectedNumberOfPlayers,
    selectedGridSize,
    handleSelectGameTheme,
    handleSelectNumberOfPlayers,
    handleSelectGridSize,
  };

  return (
    <GameContext.Provider value={gameContextValues}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
