import { Navbar } from "./components";
import { Home } from "./pages";

const App = () => {
  return (
    <div className="max-w-[1140px] w-full mx-auto py-14 p-4">
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
