import React, { useState, useEffect } from "react";

// Stopwatch Component
const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [running]);

  return (
    <div>
      <h2>Stopwatch</h2>
      <p>{time}s</p>
      <button onClick={() => setRunning(!running)}>
        {running ? "Stop" : "Start"}
      </button>
    </div>
  );
};