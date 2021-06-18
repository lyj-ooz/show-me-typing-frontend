import React, { useEffect, useState, useRef, memo } from "react";
import "./Loading.css";

const Loading = memo(() => {
  const text = useRef("Fetching records from server...");
  const idx = useRef(0);
  const timeout = useRef(null);
  const [loadingText, setLoadingText] = useState("");

  const typeText = () => {
    setLoadingText(text.current.slice(0, idx.current));
    idx.current += 1;

    if (idx.current > text.current.length) {
      idx.current = 0;
    }
    timeout.current = setTimeout(typeText, 200);
  };

  useEffect(() => {
    typeText();

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return (
    <div className="loading-container">
      <span className="loading-text">{loadingText}</span>
    </div>
  );
});

export default Loading;
