import React from "react";
import { useContext } from "react";
import AutoplayContext from "../contexts/AutoplayContext";

const Pref: React.FC = () => {
  const { autoplay, toggleAutoplay } = useContext(AutoplayContext);

  return (
    <div className="pref" style={{ padding: "20px" }}>
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
        }}
      >
        <h3>User preferences</h3>
        <div>
          Autoplay toggle:
          <button
            style={
              autoplay
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" }
            }
            onClick={toggleAutoplay}
          >
            Toggle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pref;
