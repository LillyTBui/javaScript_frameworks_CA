import React from "react";

function Heading({ style, children }) {
  return <h1 className={`heading ${style}`}>{children}</h1>;
}

export default Heading;
