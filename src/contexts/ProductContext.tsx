// src/contexts/ProductContext.tsx
import { ReactNode } from "react";
import { Product } from "../models/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import { Children } from "../types/global";
import { createBaseContext } from "./BaseContext";

const { Provider, useDataContext } = createBaseContext<Product>(
  new ProductRepository(),
);

export const useProductContext = useDataContext;

export const ProductProvider: React.FC<Children<ReactNode>> = ({
  children,
}) => {
  return <Provider>{children}</Provider>;
};
