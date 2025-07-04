import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Clock, ChevronUp, ChevronDown } from 'lucide-react';

export default function TimerApp() {
  const [totalMinutes, setTotalMinutes] = useState(10);
  const [intervalSeconds, setIntervalSeconds] = useState(30);
  const [totalSets, setTotalSets] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [nextInterval, setNextInterval] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Check if there are more sets to complete
            if (currentSet < totalSets) {
              // Start the next set
              setCurrentSet(currentSet + 1);
              setNextInterval(Math.ceil((totalMinutes * 60) / intervalSeconds));
              return totalMinutes * 60;
            } else {
              // All sets completed
              setIsRunning(false);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeRemaining, currentSet, totalSets, totalMinutes, intervalSeconds]);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      const currentInterval = Math.ceil(timeRemaining / intervalSeconds);
      if (currentInterval !== nextInterval && timeRemaining % intervalSeconds === 0) {
        setNextInterval(currentInterval);
        // Visual feedback for interval
        document.body.style.backgroundColor = '#ef4444';
        setTimeout(() => {
          document.body.style.backgroundColor = '';
        }, 300);
      }
    }
  }, [timeRemaining, intervalSeconds, nextInterval, isRunning]);

  const startTimer = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(totalMinutes * 60);
      setNextInterval(Math.ceil((totalMinutes * 60) / intervalSeconds));
      setCurrentSet(1);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setNextInterval(0);
    setCurrentSet(1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const remainingIntervals = Math.ceil(timeRemaining / intervalSeconds);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Clock className="w-8 h-8" />
          Interval Timer
        </h1>

        {timeRemaining === 0 && !isRunning && (
          <div className="space-y-6 bg-gray-800 rounded-2xl p-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Total Time (minutes)
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTotalMinutes(Math.max(1, totalMinutes - 1))}
                  className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  aria-label="Decrease total time"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={totalMinutes}
                  onChange={(e) => setTotalMinutes(parseInt(e.target.value) || 1)}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setTotalMinutes(Math.min(120, totalMinutes + 1))}
                  className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  aria-label="Increase total time"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Interval (seconds)
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIntervalSeconds(Math.max(5, intervalSeconds - 5))}
                  className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  aria-label="Decrease interval"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={intervalSeconds}
                  onChange={(e) => setIntervalSeconds(parseInt(e.target.value) || 5)}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setIntervalSeconds(Math.min(300, intervalSeconds + 5))}
                  className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  aria-label="Increase interval"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Number of Sets
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTotalSets(Math.max(1, totalSets - 1))}
                  className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  aria-label="Decrease sets"
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={totalSets}
                  onChange={(e) => setTotalSets(parseInt(e.target.value) || 1)}
                  className="flex-1 px-4 py-3 rounded-lg bg-gray-700 text-white text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => setTotalSets(Math.min(10, totalSets + 1))}
                  className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  aria-label="Increase sets"
                >
                  <ChevronUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {(timeRemaining > 0 || isRunning) && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className="text-6xl font-mono font-bold mb-4">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-gray-400 text-lg">
                {remainingIntervals} interval{remainingIntervals !== 1 ? 's' : ''} remaining
              </div>
              {totalSets > 1 && (
                <div className="text-gray-400 text-lg mt-2">
                  Set {currentSet} of {totalSets}
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-2xl p-4">
              <div className="text-center text-gray-400 mb-2">Next interval in:</div>
              <div className="text-3xl font-mono text-center font-semibold text-blue-400">
                {formatTime(timeRemaining % intervalSeconds || intervalSeconds)}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {!isRunning && timeRemaining === 0 && (
            <button
              onClick={startTimer}
              className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-full text-lg font-semibold transition-colors"
            >
              <Play className="w-5 h-5" />
              Start Timer
            </button>
          )}

          {!isRunning && timeRemaining > 0 && (
            <>
              <button
                onClick={startTimer}
                className="flex items-center gap-2 px-6 py-4 bg-green-600 hover:bg-green-700 rounded-full text-lg font-semibold transition-colors"
              >
                <Play className="w-5 h-5" />
                Resume
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 rounded-full text-lg font-semibold transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </>
          )}

          {isRunning && (
            <>
              <button
                onClick={pauseTimer}
                className="flex items-center gap-2 px-6 py-4 bg-yellow-600 hover:bg-yellow-700 rounded-full text-lg font-semibold transition-colors"
              >
                <Pause className="w-5 h-5" />
                Pause
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 rounded-full text-lg font-semibold transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}