import styled, { css } from "styled-components";
import { mediaQueries } from "../../utils/mediaQueries";
import { GridItemProps } from "./types";

const GridItem = styled.div<GridItemProps>`
  grid-column: span ${(props) => props.span || "12"};
  order: ${(props) => props.order || 0};
  display: grid;

  ${(props) =>
    props.offset &&
    css`
      margin-left: ${props.offset * (100 / 12)}%;
    `}

  ${(props) =>
    props.area &&
    css`
      grid-area: ${props.area};
    `}

    ${(props) =>
    props.alignItems &&
    css`
      align-items: ${props.alignItems};
    `}

  ${(props) =>
    props.justifyItems &&
    css`
      justify-items: ${props.justifyItems};
    `}

  ${(props) =>
    props.alignContent &&
    css`
      align-content: ${props.alignContent};
    `}

  ${(props) =>
    props.justifyContent &&
    css`
      justify-content: ${props.justifyContent};
    `}

  ${(props) =>
    props.tablet &&
    css`
      ${mediaQueries.tablet`
        grid-column: span ${props.tablet};
      `}
    `}

  ${(props) =>
    props.mobile &&
    css`
      ${mediaQueries.mobile`
        grid-column: span ${props.mobile};
      `}
    `}

  ${(props) =>
    props.responsiveSpan &&
    Object.keys(mediaQueries).map(
      (label) => css`
        ${
          // @ts-expect-error types not being picked up correctly
          mediaQueries[label as keyof MediaSizes]`
        grid-column: span ${
          // @ts-ignore types not being picked up correctly
          props.responsiveSpan[label as keyof MediaSizes] || props.span || "12"
        };
      `
        }
      `
    )}
`;

export default GridItem;
