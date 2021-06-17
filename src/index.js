import React from "react";
import ReactDOM from "react-dom";
import TypingGame from "./components/TypingGame";
import "./index.css";

const App = () => {
  return (
    <>
      <TypingGame />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
