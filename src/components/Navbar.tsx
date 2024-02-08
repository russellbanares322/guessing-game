import { useNavigate } from "react-router-dom";
import Button from "./Button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center">
      <p className="text-2xl font-extrabold text-dark-blue">memory</p>
      <div className="flex items-center justify-center gap-4">
        <Button onClick={() => console.log("Restart")} type="orange">
          Restart
        </Button>
        <Button onClick={() => navigate("/game-options")} type="ghost">
          New Game
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
