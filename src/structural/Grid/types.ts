import { mediaQueries } from "./mediaQueries";

type MediaSizes = {
  desktop: number;
  tablet: number;
  mobile: number;
};

type GridContainerProps = {
  columnSizes?: string;
  gap?: string;
  alignItems?: string;
  justifyItems?: string;
  alignContent?: string;
  justifyContent?: string;
  textAlign?: string;
};

type GridItemProps = {
  span?: number;
  alignItems?: string;
  justifyItems?: string;
  alignContent?: string;
  justifyContent?: string;
  order?: number;
  offset?: number;
  area?: string;
  tablet?: number;
  mobile?: number;
  responsiveSpan?: Partial<Record<keyof MediaSizes, number>>;
} & React.HTMLAttributes<HTMLDivElement>;

type OrderProps = {
  order: number;
};

type OffsetProps = {
  offset: number;
};

type MediaQueryProps = {
  query: keyof typeof mediaQueries;
};

export type {
  MediaQueryProps,
  OffsetProps,
  OrderProps,
  GridItemProps,
  GridContainerProps,
  MediaSizes,
};
