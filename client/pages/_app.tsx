import React, { useState } from "react";
import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ListDataContext from "../contexts/ListDataContext";
import DateRangeContext from "../contexts/DateRangeContext";
import SortContext from "../contexts/SortContext";
import SearchContext from "../contexts/SearchContext";
import { VideoMeta } from "../types/types";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../styles/style.css";
import Head from "next/head";

interface AppProps {
  Component: any;
  pageProps: {
    data: VideoMeta[];
    initListData: VideoMeta[];
  };
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [listData, setListData] = useState<VideoMeta[]>([]);
  const [dateRange, setDateRange] = useState<any>(null);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ListDataContext.Provider value={{ listData, setListData }}>
        <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
          <SortContext.Provider value={{ sort, setSort }}>
            <SearchContext.Provider value={{ search, setSearch }}>
              <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">
                  <div style={{ height: "45px", paddingLeft: "0.5em" }}>
                    <Image src="/logo.svg" width={46} height={44} />
                  </div>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
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
            </SearchContext.Provider>
          </SortContext.Provider>
        </DateRangeContext.Provider>
      </ListDataContext.Provider>
    </>
  );
};

export default App;
