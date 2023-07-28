import styled, { css } from "styled-components";
import { GridContainerProps } from "./types";

const GridContainer = styled.div<GridContainerProps>`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1em;
  text-align: ${(props) => props.textAlign || "left"};

  ${(props) =>
    props.columnSizes &&
    css`
      grid-template-columns: ${props.columnSizes};
    `}

  ${(props) =>
    props.gap &&
    css`
      grid-gap: ${props.gap};
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
`;

export default GridContainer;
