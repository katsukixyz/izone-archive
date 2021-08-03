import React from "react";
import Head from "next/head";

const Contact: React.FC = () => {
  return (
    <div className="contact" style={{ padding: "20px" }}>
      <Head>
        <title>Contact</title>
        <meta property="og:site_name" content="IZ*ONE VLIVE Archive" />
      </Head>
      <div
        className="card"
        style={{
          paddingLeft: "10px",
          paddingRight: "10px",
          padding: "20px",
          maxWidth: "1000px",
          borderRadius: "6px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          flexDirection: "row",
          border: "0px",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          // backgroundColor: "#F8F8F8",
        }}
      >
        <h3>Issues with the site/feature suggestions</h3>
        <p>
          Create a new issue on the{" "}
          <a
            style={{
              backgroundColor: "#f8f4f4",
              padding: "0.3em",
              borderRadius: 6,
            }}
            href="https://github.com/katsukixyz/izone-archive/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub repository
          </a>{" "}
          with the corresponding labels (bug, enhancement, etc) and it will be
          dealt with promptly.
        </p>
        <h3>Miscellaneous</h3>
        <p>
          For any miscellaneous questions, either leave an issue on{" "}
          <a
            style={{
              backgroundColor: "#f8f4f4",
              padding: "0.3em",
              borderRadius: 6,
            }}
            href="https://github.com/katsukixyz/izone-archive/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          or email me at{" "}
          <a
            style={{
              backgroundColor: "#f8f4f4",
              padding: "0.3em",
              borderRadius: 6,
            }}
            href="mailto:katsukidotxyz@gmail.com"
          >
            katsukidotxyz@gmail.com
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Contact;
