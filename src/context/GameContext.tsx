import React, { createContext, useContext, useState } from "react";
import {
  GridSizeOptions,
  NumberOfPlayerOptions,
  ThemeOptions,
} from "../data/gameOptions";
import { throwContextError } from "../utils/throwContextError";

type GameContextProviderProp = {
  children: React.ReactNode;
};

type GameContextValues = {
  selectedGameTheme: ThemeOptions;
  selectedNumberOfPlayers: NumberOfPlayerOptions;
  selectedGridSize: GridSizeOptions;
  handleSelectGameTheme: (gameTheme: ThemeOptions) => void;
  handleSelectNumberOfPlayers: (numberOfPlayers: NumberOfPlayerOptions) => void;
  handleSelectGridSize: (gridSize: GridSizeOptions) => void;
};

export const GameContext = createContext<GameContextValues | null>(null);

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

export const useGameContext = () => {
  const gameContextData = useContext(GameContext);
  if (!gameContextData) {
    return throwContextError("useGameContext", "GameContextProvider");
  }
  return gameContextData;
};
