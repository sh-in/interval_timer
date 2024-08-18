import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
  font-family: 'Arial', sans-serif;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const TimerDisplay = styled.div`
  font-size: 6rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 2rem 0;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: ${props => props.primary ? '#3498db' : '#e74c3c'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.primary ? '#2980b9' : '#c0392b'};
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #bdc3c7;
  border-radius: 3px;
`;

const StatusText = styled.h2`
  color: ${props => props.isWork ? '#27ae60' : '#f39c12'};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

function IntervalTimerWithStyle() {
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
    <AppContainer>
      <Title>Interval Timer</Title>
      <InputGroup>
        <Label>Work Time (seconds):</Label>
        <Input 
          type="number" 
          value={workTime} 
          onChange={(e) => setWorkTime(parseInt(e.target.value))} 
        />
      </InputGroup>
      <InputGroup>
        <Label>Rest Time (seconds):</Label>
        <Input 
          type="number" 
          value={restTime} 
          onChange={(e) => setRestTime(parseInt(e.target.value))} 
        />
      </InputGroup>
      <InputGroup>
        <Label>Sets:</Label>
        <Input 
          type="number" 
          value={sets} 
          onChange={(e) => setSets(parseInt(e.target.value))} 
        />
      </InputGroup>
      <ControlsContainer>
        <Button primary onClick={startTimer} disabled={isRunning}>Start</Button>
        <Button onClick={stopTimer} disabled={!isRunning}>Stop</Button>
      </ControlsContainer>
      <StatusText isWork={isWork}>{isWork ? 'Work' : 'Rest'}</StatusText>
      <StatusText>Set: {currentSet} / {sets}</StatusText>
      <TimerDisplay>{timer}</TimerDisplay>
    </AppContainer>
  );
}

export default IntervalTimerWithStyle;