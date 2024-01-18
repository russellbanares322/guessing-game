import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <p className="text-2xl font-extrabold text-dark-blue">memory</p>
      <div className="flex items-center justify-center gap-3">
        <Button onClick={() => console.log("Restart")} type="orange">
          Restart
        </Button>
        <Button onClick={() => console.log("New Game")} type="ghost">
          New Game
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
