type FlexDirections = "row" | "col";

type GridLayoutProps = {
  children: React.ReactNode;
  flexDirection: FlexDirections;
};
const GridLayout = ({ children, flexDirection }: GridLayoutProps) => {
  const getGridClassName = () => {
    const gridClassNameMap = {
      row: "flex flex-row gap-3 items-center justify-center w-full",
      col: "flex flex-col gap-3",
    };

    const selectedClassName = gridClassNameMap[flexDirection];

    return selectedClassName;
  };

  return <div className={`${getGridClassName()}`}>{children}</div>;
};

export default GridLayout;
