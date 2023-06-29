import React, { ReactElement } from "react";
import { mediaQueries } from "../../utils/mediaQueries";

type MediaQueryProps = {
  query: keyof typeof mediaQueries;
  children: ReactElement | ReactElement[];
};

const MediaQuery: React.FC<MediaQueryProps> = ({ query, children }) => {
  const mediaQuery = mediaQueries[query];

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { mediaQuery })
      )}
    </>
  );
};

export default MediaQuery;
