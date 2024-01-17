import { Route, Routes } from "react-router-dom";
import { GameOptions, Home } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game-options" element={<GameOptions />} />
    </Routes>
  );
};

export default App;
