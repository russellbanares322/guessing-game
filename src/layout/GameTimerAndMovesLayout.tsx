type GameTimerAndMovesLayoutProps = {
  label: string;
  value: string | number;
};

const GameTimerAndMovesLayout = ({
  label,
  value,
}: GameTimerAndMovesLayoutProps) => {
  return (
    <div className="bg-ghost-blue py-3 px-3 rounded-md w-full flex justify-between items-center">
      <span className="text-sm text-light-blue">{label}</span>{" "}
      <span className="text-xl font-semibold text-dark-blue">{value}</span>
    </div>
  );
};

export default GameTimerAndMovesLayout;
