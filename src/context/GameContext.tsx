import React, { createContext, useContext, useState } from "react";
import {
  GridSizeOptions,
  NumberOfPlayerOptions,
  GridThemeOptions,
} from "../data/gameOptions";
import { throwContextError } from "../utils/throwContextError";

type GameContextProviderProp = {
  children: React.ReactNode;
};
type OptionCategory = "gridTheme" | "numberOfPlayers" | "gridSize";
type SelectedOption =
  | GridThemeOptions
  | NumberOfPlayerOptions
  | GridSizeOptions;
type GameContextValues = {
  handleSelectGridTheme: (gameTheme: GridThemeOptions) => void;
  handleSelectNumberOfPlayers: (numberOfPlayers: NumberOfPlayerOptions) => void;
  handleSelectGridSize: (gridSize: GridSizeOptions) => void;
  isOptionSelected: (
    optionCategory: OptionCategory,
    selectedOption: SelectedOption
  ) => boolean;
  selectedGridTheme: GridThemeOptions;
  selectedNumberOfPlayers: NumberOfPlayerOptions;
  selectedGridSize: GridSizeOptions;
};

export const GameContext = createContext<GameContextValues | null>(null);

const GameContextProvider = ({ children }: GameContextProviderProp) => {
  const [selectedGridTheme, setSelectedGridTheme] =
    useState<GridThemeOptions>("Numbers");
  const [selectedNumberOfPlayers, setSelectedNumberOfPlayers] =
    useState<NumberOfPlayerOptions>(1);
  const [selectedGridSize, setSelectedGridSize] =
    useState<GridSizeOptions>("4x4");

  const handleSelectGridTheme = (gameTheme: GridThemeOptions) => {
    setSelectedGridTheme(gameTheme);
  };

  const handleSelectNumberOfPlayers = (
    numberOfPlayers: NumberOfPlayerOptions
  ) => {
    setSelectedNumberOfPlayers(numberOfPlayers);
  };

  const handleSelectGridSize = (gridSize: GridSizeOptions) => {
    setSelectedGridSize(gridSize);
  };

  const isOptionSelected = (
    optionCategory: OptionCategory,
    selectedOption: SelectedOption
  ) => {
    const optionCategoryMap = {
      gridTheme: selectedGridTheme,
      numberOfPlayers: selectedNumberOfPlayers,
      gridSize: selectedGridSize,
    };

    const matchedOption = optionCategoryMap[optionCategory];
    const isSelecteOptionMatchedCurrentOption =
      matchedOption === selectedOption;

    if (isSelecteOptionMatchedCurrentOption) {
      return true;
    }
    return false;
  };

  const gameContextValues = {
    handleSelectGridTheme,
    handleSelectNumberOfPlayers,
    handleSelectGridSize,
    isOptionSelected,
    selectedGridTheme,
    selectedNumberOfPlayers,
    selectedGridSize,
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
