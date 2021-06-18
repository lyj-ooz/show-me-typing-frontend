import React, { useState, useEffect, useRef, memo } from "react";

const Timer = memo(({ refresh, setRemainZero }) => {
  const [timer, setTimer] = useState("10");
  const intervalRef = useRef(null);
  const mounted = useRef(false);

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    return {
      total,
      seconds,
    };
  }

  function startTimer(deadline) {
    let { total, seconds } = getTimeRemaining(deadline);
    if (total >= 0) {
      setTimer(seconds);
    } else if (total < 0) {
      clearInterval(intervalRef.current);
    }
  }

  function clearTimer(endtime) {
    setTimer("10");
    if (intervalRef.current) clearInterval(intervalRef.current);

    const interval = setInterval(() => {
      startTimer(endtime);
    }, 1000);

    intervalRef.current = interval;
  }

  function getDeadlineTime() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  }

  useEffect(() => {
    clearTimer(getDeadlineTime());
    return () => {
      // console.log("Timer 컴포넌트 사라짐..");
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refresh]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      if (timer === 0) {
        // console.log("0초다!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        setRemainZero(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }
  }, [timer]);

  // function onClickResetBtn() {
  //   if (intervalRef.current) clearInterval(intervalRef.current);
  //   clearTimer(getDeadlineTime());
  // }

  return <div className="game-time">{timer}</div>;
});

export default Timer;
