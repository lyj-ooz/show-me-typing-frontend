import React from "react";
import ReactDOM from "react-dom";
import TypingGame from "./components/TypingGame";

const App = () => {
  return (
    <>
      <TypingGame />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
