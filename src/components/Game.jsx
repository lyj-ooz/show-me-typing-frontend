import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import "./Game.css";
import Timer from "./Timer";

const shuffleWords = (data) => {
  // console.log("shuffleWords !!!");

  const wordsArr = [];
  for (let i = 0; i < data.length; i++) {
    wordsArr.push(data[i].word);
  }

  const shuffle = [];
  while (wordsArr.length > 0) {
    shuffle.push(
      wordsArr.splice(Math.floor(Math.random() * wordsArr.length), 1)[0]
    );
  }

  return shuffle;
};

const Game = memo(({ setUpdateRanking }) => {
  // console.log("Game 컴포넌트 !!");
  const wordlist = useRef(null);

  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [word, setWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [showSave, setShowSave] = useState(false);
  const [username, setUsername] = useState("");
  const [remainZero, setRemainZero] = useState(false);

  const getWords = async () => {
    // console.log("getWords!!!");
    try {
      // const res = await fetch("/api/words");
      const res = await fetch("https://show-me-typing.herokuapp.com/api/words");
      const data = await res.json();
      wordlist.current = shuffleWords(data);
      setWord(wordlist.current.pop());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!showSave) {
      getWords();
    }
  }, [showSave]);

  const onClickStartBtn = useCallback((e) => {
    // console.log("start!");
    setStart(true);
  });

  const onClickClose = useCallback(() => {
    setShowSave(false);
    resetGame();
  }, []);

  const onSubmitTyping = useCallback((e) => {
    e.preventDefault();

    if (word === inputValue.trim().toLowerCase()) {
      // console.log("일치");
      showNextWord();
      setInputValue("");
      updateScore();
      setRefresh((prev) => prev + 1);
    } else if (
      word !== inputValue.trim().toLowerCase() ||
      remainZero === true
    ) {
      // console.log("불일치 혹은 시간초과로 끝");
      setStart(false);
      setShowSave(true);
    }
  });

  const onInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  });

  const onUsernameChange = useCallback((e) => {
    setUsername(e.target.value);
  });

  const showNextWord = () => {
    if (wordlist.current.length > 0) {
      setWord(wordlist.current.pop());
    } else {
      setStart(false);
      setShowSave(true);
    }
  };

  const updateScore = () => {
    setScore((prev) => prev + 100);
  };

  const onSubmitScore = useCallback((e) => {
    e.preventDefault();
    // console.log("form submit..!!");

    const userData = {
      username: username,
      score: parseInt(score),
    };
    // postData("/api/scores", userData);
    postData("https://show-me-typing.herokuapp.com/api/scores", userData);
  });

  const postData = async (url, data) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setUpdateRanking((prev) => prev + 1);
      resetGame();
    } catch (error) {
      console.log(error);
    }
  };

  const resetGame = () => {
    setScore(0);
    setShowSave(false);
    setUsername("");
    setRemainZero(false);
    setStart(false);
    setInputValue("");
  };

  return (
    <div className="game-container">
      {showSave || remainZero ? (
        <div className="game-save">
          <p>
            You typed {inputValue.trim() === "" ? "nothing" : inputValue} for{" "}
            {word}
          </p>
          <p>Your Score: {score}</p>
          <form onSubmit={onSubmitScore}>
            <label>
              Username
              <input
                type="text"
                value={username}
                onChange={onUsernameChange}
                minLength={1}
                maxLength={15}
                pattern="[A-Z|a-z|0-9|ㄱ-ㅎ|가-힣][A-Z|a-z|0-9|ㄱ-ㅎ|가-힣]*"
                required
              />
            </label>
            <small>1-15 characters in length</small>
            <input type="submit" value="Save" />
          </form>
          <button className="close-btn" onClick={onClickClose}>
            X
          </button>
        </div>
      ) : (
        <div className="game-playing">
          {start && <Timer refresh={refresh} setRemainZero={setRemainZero} />}
          <div className="game-word">{start ? word : "?????"}</div>
          <form onSubmit={onSubmitTyping}>
            <input
              type="text"
              disabled={!start}
              value={inputValue}
              onChange={onInputChange}
              pattern="[a-z][a-z]*"
            />
          </form>
          <button onClick={onClickStartBtn} disabled={start}>
            Start Game
          </button>
          <div className="game-score">
            Score: <span>{score}</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default Game;
