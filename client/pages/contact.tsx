import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="contact" style={{ paddingTop: "20px" }}>
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
            href="https://github.com/katsukixyz/izone-archive/issues"
            target="_blank"
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
            href="https://github.com/katsukixyz/izone-archive/issues"
            target="_blank"
          >
            GitHub
          </a>{" "}
          or email me at{" "}
          <a href="mailto:katsukidotxyz@gmail.com">katsukidotxyz@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default Contact;
