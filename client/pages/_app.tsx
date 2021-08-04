import React, { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import nprogress from "nprogress";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { VideoMeta } from "../types/types";
import { RecoilRoot } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/style.css";
import "../styles/grid.css";
import "../styles/globals.css";
import "../styles/nprogress.css";
import Head from "next/head";

Router.events.on("routeChangeStart", () => nprogress.start());
Router.events.on("routeChangeComplete", () => nprogress.done());
Router.events.on("routeChangeError", () => nprogress.done());

interface AppProps {
  Component: any;
  pageProps: {
    [key: string]: any;
  };
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <div style={{ height: "45px", paddingLeft: "0.5em" }}>
            <Image src="/logo.svg" width={46} height={44} />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav.Link
            href="https://patreon.com/katsukixyz"
            target="_blank"
            style={{ color: "white" }}
          >
            Donate
          </Nav.Link>
          <Nav.Link href="/contact" style={{ color: "white" }}>
            Contact
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default App;
