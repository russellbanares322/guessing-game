type ButtonProps = {
  children: React.ReactNode;
  ghost?: boolean;
};

const Button = ({ children, ghost = false }: ButtonProps) => {
  const getButtonColorClassName = () => {
    if (ghost) {
      return "bg-ghost-blue text-dark-blue";
    }
    return "bg-orange text-white";
  };

  return (
    <button
      className={`py-2 px-6 rounded-full font-bold ${getButtonColorClassName()}`}
    >
      {children}
    </button>
  );
};

export default Button;
