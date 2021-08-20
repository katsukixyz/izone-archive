import React, { createContext } from "react";
const AutoplayContext = createContext({
  autoplay: true,
  toggleAutoplay: () => {},
});

export default AutoplayContext;
