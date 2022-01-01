import React, { createContext } from "react";
const LocaleContext = createContext({
  locale: "en",
  changeLocale: () => {},
});

export default LocaleContext;
