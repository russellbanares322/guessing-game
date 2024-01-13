import Button from "./Button";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center">
      <p className="text-2xl font-extrabold text-dark-blue">memory</p>
      <div className="flex items-center justify-center gap-3">
        <Button>Restart</Button>
        <Button ghost>New Game</Button>
      </div>
    </nav>
  );
};

export default Navbar;
