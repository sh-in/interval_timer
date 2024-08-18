import React, { useState, useEffect, useRef } from 'react';

function IntervalTimer() {
  const [workTime, setWorkTime] = useState(20);
  const [restTime, setRestTime] = useState(10);
  const [sets, setSets] = useState(3);
  const [currentSet, setCurrentSet] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            if (isWork) {
              if (currentSet === sets) {
                clearInterval(intervalRef.current);
                setIsRunning(false);
                return 0;
              }
              setIsWork(false);
              return restTime;
            } else {
              setIsWork(true);
              setCurrentSet((prevSet) => prevSet + 1);
              return workTime;
            }
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isWork, currentSet, sets, workTime, restTime]);

  const startTimer = () => {
    setIsRunning(true);
    setTimer(workTime);
    setIsWork(true);
    setCurrentSet(1);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  return (
    <div>
      <h1>Interval Timer</h1>
      <div>
        <label>Work Time(s): </label>
        <input 
          type="number" 
          value={workTime} 
          onChange={(e) => setWorkTime(parseInt(e.target.value))} 
        />
      </div>
      <div>
        <label>Rest Time(s): </label>
        <input 
          type="number" 
          value={restTime} 
          onChange={(e) => setRestTime(parseInt(e.target.value))} 
        />
      </div>
      <div>
        <label>Sets: </label>
        <input 
          type="number" 
          value={sets} 
          onChange={(e) => setSets(parseInt(e.target.value))} 
        />
      </div>
      <button onClick={startTimer} disabled={isRunning}>Start</button>
      <button onClick={stopTimer} disabled={!isRunning}>Stop</button>
      <h2>{isWork ? 'Work' : 'Rest'}</h2>
      <h2>Set: {currentSet} / {sets}</h2>
      <h2>Time: {timer}</h2>
    </div>
  );
}

export default IntervalTimer;