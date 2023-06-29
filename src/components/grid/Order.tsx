import React, { ReactElement } from "react";

type OrderProps = {
  order: number;
  children: ReactElement | ReactElement[];
};

const Order: React.FC<OrderProps> = ({ order, children }) => {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { style: { order } })
      )}
    </>
  );
};

export default Order;
