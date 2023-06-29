import { css, CSSProp } from "styled-components";

type MediaSizes = {
  desktop: number;
  tablet: number;
  mobile: number;
};

const mediaSizes: MediaSizes = {
  desktop: 992,
  tablet: 768,
  mobile: 576,
};

export const mediaQueries = Object.keys(mediaSizes).reduce((acc, label) => {
  acc[label as keyof MediaSizes] = (...args: CSSProp[]) => css`
    @media (max-width: ${mediaSizes[label as keyof MediaSizes]}px) {
      ${
        // @ts-expect-error args not picking up it's a tuple
        css(...args)
      }
    }
  `;
  return acc;
}, {} as Record<keyof MediaSizes, (strings: TemplateStringsArray, ...interpolations: CSSProp[]) => ReturnType<typeof css>>);
