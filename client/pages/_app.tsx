import React, { useState, useEffect } from "react";
import Router, { NextRouter, useRouter } from "next/router";
import nprogress from "nprogress";
import { RecoilRoot } from "recoil";
import { appWithTranslation, useTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config.js";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/nprogress.css";
import Head from "next/head";
import AutoplayContext from "../contexts/AutoplayContext";
import CustomNav from "../components/CustomNav";
import LocaleContext from "../contexts/LocaleContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Maintenance from "../components/Maintenance";

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
  const { i18n } = useTranslation();
  const router = useRouter();
  const [autoplay, setAutoplay] = useState(true);
  const [locale, setLocale] = useState(i18n.language);

  const toggleAutoplay = () => {
    localStorage.setItem("autoplay", (!autoplay).toString());
    setAutoplay(!autoplay);
  };

  const changeLocale = () => {
    const newLocale = locale === "en" ? "ko" : "en";
    setLocale(newLocale);
    i18n.changeLanguage(newLocale);
    router.push(router.pathname, router.asPath, {
      locale: newLocale,
    });
  };

  useEffect(() => {
    localStorage.getItem("autoplay") === null
      ? localStorage.setItem("autoplay", "true")
      : setAutoplay(localStorage.getItem("autoplay") === "true");
  }, []);

  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    return <Maintenance />;
  }

  return (
    <AutoplayContext.Provider value={{ autoplay, toggleAutoplay }}>
      <LocaleContext.Provider value={{ locale, changeLocale }}>
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
      </LocaleContext.Provider>
    </AutoplayContext.Provider>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["main"])),
    },
  };
}

export default appWithTranslation(App);
