import React, { useState, useEffect } from "react";
import Router from "next/router";
import nprogress from "nprogress";
import { RecoilRoot } from "recoil";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/nprogress.css";
import Head from "next/head";
import AutoplayContext from "../contexts/AutoplayContext";
import CustomNav from "../components/CustomNav";
import "react-datepicker/dist/react-datepicker.css";

const theme = extendTheme({
  colors: {
    brand: { 100: "#f8e1eb", 200: "#F0BCD3", 500: "#DB679A" },
  },
});

Router.events.on("routeChangeStart", () => nprogress.start());
Router.events.on("routeChangeComplete", () => nprogress.done());
Router.events.on("routeChangeError", () => nprogress.done());

interface AppProps {
  Component: any;
  pageProps: {
    [key: string]: any;
  };
}

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const [autoplay, setAutoplay] = useState(true);

  const toggleAutoplay = () => {
    localStorage.setItem("autoplay", (!autoplay).toString());
    setAutoplay(!autoplay);
  };

  useEffect(() => {
    localStorage.getItem("autoplay") === null
      ? localStorage.setItem("autoplay", "true")
      : setAutoplay(localStorage.getItem("autoplay") === "true");
  }, []);

  return (
    <AutoplayContext.Provider value={{ autoplay, toggleAutoplay }}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link href="//fonts.googleapis.com/css?family=Open+Sans" />
          </Head>
          <CustomNav />
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
    </AutoplayContext.Provider>
  );
};

export default App;
