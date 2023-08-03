import React, { ReactElement } from "react";

type OffsetProps = {
  offset: number;
  children: ReactElement | ReactElement[];
};

const Offset: React.FC<OffsetProps> = ({ offset, children }) => {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { offset })
      )}
    </>
  );
};

export default Offset;
