type ButtonTypes = "ghost" | "primary" | "orange";
type ButtonSizes = "small" | "medium" | "large";

type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSizes;
  type: ButtonTypes;
};

const Button = ({ children, size = "small", type }: ButtonProps) => {
  const getButtonSizeClassName = () => {
    const buttonSizesMap = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    };

    const selectedButtonSize = buttonSizesMap[size];

    return selectedButtonSize;
  };

  const getButtonColorClassName = () => {
    const buttonTypesMap = {
      ghost: "bg-ghost-blue text-dark-blue",
      primary: "bg-dark-blue text-white",
      orange: "bg-orange text-white",
    };
    const selectedButtonType = buttonTypesMap[type];

    return selectedButtonType;
  };

  return (
    <button
      className={`py-2 w-full px-6 rounded-full font-bold whitespace-nowrap ${getButtonColorClassName()} ${getButtonSizeClassName()}`}
    >
      {children}
    </button>
  );
};

export default Button;
