import React, { useState } from "react";
import Title from "./Title";
import Game from "./Game";
import Ranking from "./Ranking";
import "./TypingGame.css";

const TypingGame = () => {
  const [updateRanking, setUpdateRanking] = useState(0);

  return (
    <div id="container">
      <Title />
      <div id="content-container">
        <Ranking updateRanking={updateRanking} />
        <Game setUpdateRanking={setUpdateRanking} />
      </div>
    </div>
  );
};

export default TypingGame;
