import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, Clock, ChevronUp, ChevronDown, BookOpen, Heart, Dumbbell, Activity } from 'lucide-react';

export default function TimerApp() {
  const navigate = useNavigate();
  const [workMinutes, setWorkMinutes] = useState(0);
  const [workSeconds, setWorkSeconds] = useState(45);
  const [restMinutes, setRestMinutes] = useState(0);
  const [restSeconds, setRestSeconds] = useState(15);
  const [reps, setReps] = useState(10);
  const [sets, setSets] = useState(3);
  const [currentSet, setCurrentSet] = useState(1);
  const [currentRep, setCurrentRep] = useState(1);
  const [isWorkPhase, setIsWorkPhase] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Calculate total workout time
  const calculateTotalTime = () => {
    const workTimeSeconds = workMinutes * 60 + workSeconds;
    const restTimeSeconds = restMinutes * 60 + restSeconds;
    const totalSecondsPerSet = (workTimeSeconds * reps) + (restTimeSeconds * (reps - 1));
    const totalSeconds = (totalSecondsPerSet * sets) + (restTimeSeconds * (sets - 1));
    return totalSeconds;
  };

  // Format total time to HH:MM:SS
  const formatTotalTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format time for display during workout
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
        setTotalTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeRemaining === 0) {
      // Handle phase transitions
      handlePhaseTransition();
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeRemaining]);

  const handlePhaseTransition = () => {
    if (isWorkPhase) {
      // Just finished work phase
      if (currentRep < reps) {
        // Start rest phase
        setIsWorkPhase(false);
        setTimeRemaining(restMinutes * 60 + restSeconds);
      } else if (currentSet < sets) {
        // Finished all reps in set, start rest before next set
        setIsWorkPhase(false);
        setTimeRemaining(restMinutes * 60 + restSeconds);
        setCurrentRep(0); // Will be incremented to 1 when starting next set
      } else {
        // Workout complete
        setIsRunning(false);
        setTimeRemaining(0);
      }
    } else {
      // Just finished rest phase
      if (currentRep < reps) {
        // Continue with next rep in same set
        setCurrentRep(currentRep + 1);
        setIsWorkPhase(true);
        setTimeRemaining(workMinutes * 60 + workSeconds);
      } else {
        // Start next set
        setCurrentSet(currentSet + 1);
        setCurrentRep(1);
        setIsWorkPhase(true);
        setTimeRemaining(workMinutes * 60 + workSeconds);
      }
    }
  };

  const startTimer = () => {
    if (timeRemaining === 0) {
      // Starting fresh
      setTimeRemaining(workMinutes * 60 + workSeconds);
      setTotalTimeRemaining(calculateTotalTime());
      setCurrentSet(1);
      setCurrentRep(1);
      setIsWorkPhase(true);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setTotalTimeRemaining(0);
    setCurrentSet(1);
    setCurrentRep(1);
    setIsWorkPhase(true);
  };

  const applyPreset = (preset) => {
    switch (preset) {
      case 'pomodoro':
        setWorkMinutes(25);
        setWorkSeconds(0);
        setRestMinutes(5);
        setRestSeconds(0);
        setReps(1);
        setSets(4);
        break;
      case 'hiit':
        setWorkMinutes(0);
        setWorkSeconds(45);
        setRestMinutes(0);
        setRestSeconds(15);
        setReps(8);
        setSets(3);
        break;
      case 'yoga':
        setWorkMinutes(1);
        setWorkSeconds(30);
        setRestMinutes(0);
        setRestSeconds(30);
        setReps(20);
        setSets(1);
        break;
      case 'weightlifting':
        setWorkMinutes(0);
        setWorkSeconds(30);
        setRestMinutes(2);
        setRestSeconds(0);
        setReps(10);
        setSets(4);
        break;
    }
    resetTimer();
  };

  const handleTimeInput = (value, setter, max = 59) => {
    if (value === '') {
      setter('');
    } else {
      const num = parseInt(value);
      if (!isNaN(num) && num >= 0 && num <= max) {
        setter(num);
      }
    }
  };

  const handleTimeBlur = (value, setter, defaultValue = 0) => {
    if (value === '' || isNaN(value)) {
      setter(defaultValue);
    }
  };

  const totalTime = calculateTotalTime();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1
          onClick={() => navigate('/')}
          className="text-4xl font-bold text-center mb-4 flex items-center justify-center gap-2 cursor-pointer hover:text-gray-300 transition-colors"
        >
          <Clock className="w-8 h-8" />
          TaskTempo
        </h1>

        {/* Total Time Display */}
        <div className="bg-gray-800 rounded-2xl p-6 text-center">
          <p className="text-sm text-gray-400 mb-2 uppercase">
            {isRunning ? 'Time Remaining' : 'Total Workout Time'}
          </p>
          <div className="text-5xl font-mono font-bold text-blue-400 mb-4">
            {isRunning ? formatTotalTime(totalTimeRemaining) : formatTotalTime(totalTime)}
          </div>
          {isRunning && (
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-[#BB4430] transition-all duration-1000 ease-linear"
                style={{
                  width: `${(totalTimeRemaining / totalTime) * 100}%`
                }}
              />
            </div>
          )}
        </div>

        {timeRemaining === 0 && !isRunning && (
          <div className="space-y-6 bg-gray-800 rounded-2xl p-8">
            {/* Work Time Input */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Work Time (MM:SS)</label>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={workMinutes}
                  onChange={(e) => handleTimeInput(e.target.value, setWorkMinutes)}
                  onBlur={(e) => handleTimeBlur(e.target.value, setWorkMinutes)}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00"
                />
                <span className="text-xl">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={workSeconds}
                  onChange={(e) => handleTimeInput(e.target.value, setWorkSeconds)}
                  onBlur={(e) => handleTimeBlur(e.target.value, setWorkSeconds)}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00"
                />
              </div>
            </div>

            {/* Rest Time Input */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Rest Time (MM:SS)</label>
              <div className="flex items-center gap-2 w-full">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={restMinutes}
                  onChange={(e) => handleTimeInput(e.target.value, setRestMinutes)}
                  onBlur={(e) => handleTimeBlur(e.target.value, setRestMinutes)}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00"
                />
                <span className="text-xl">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={restSeconds}
                  onChange={(e) => handleTimeInput(e.target.value, setRestSeconds)}
                  onBlur={(e) => handleTimeBlur(e.target.value, setRestSeconds)}
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="00"
                />
              </div>
            </div>

            {/* Reps and Sets */}
            <div className="space-y-4 w-full">
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Reps</label>
                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={() => setReps(Math.max(1, reps - 1))}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={reps}
                    onChange={(e) => handleTimeInput(e.target.value, setReps, 999)}
                    onBlur={(e) => handleTimeBlur(e.target.value, setReps, 1)}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setReps(reps + 1)}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium mb-2">Sets</label>
                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={() => setSets(Math.max(1, sets - 1))}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={sets}
                    onChange={(e) => handleTimeInput(e.target.value, setSets, 999)}
                    onBlur={(e) => handleTimeBlur(e.target.value, setSets, 1)}
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => setSets(sets + 1)}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {(timeRemaining > 0 || isRunning) && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-2xl p-8 text-center">
              <div className={`text-2xl mb-2 ${isWorkPhase ? 'text-green-400' : 'text-yellow-400'} font-bold uppercase`}>
                {isWorkPhase ? 'WORK' : 'REST'}
              </div>
              <div className="text-6xl font-mono font-bold mb-4">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-gray-400 text-lg">
                Rep {currentRep} of {reps} • Set {currentSet} of {sets}
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 justify-center">
          {!isRunning && timeRemaining === 0 && (
            <button
              onClick={startTimer}
              className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 rounded-full text-lg font-semibold transition-colors"
              disabled={!workMinutes && !workSeconds}
            >
              <Play className="w-5 h-5" />
              Start Workout
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

        {/* Presets Section */}
        <div className="mt-8 space-y-4">
          <div className="border-t border-dotted border-gray-600 pt-6">
            <h3 className="text-xl font-semibold text-center text-gray-300 mb-4">Presets</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => applyPreset('pomodoro')}
                className="flex flex-col items-center gap-1 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <BookOpen className="w-6 h-6 text-blue-400" />
                <span className="font-medium">Pomodoro</span>
                <span className="text-xs text-gray-400">25:00 work / 5:00 rest</span>
                <span className="text-xs text-gray-500">1 rep × 4 sets</span>
              </button>
              <button
                onClick={() => applyPreset('hiit')}
                className="flex flex-col items-center gap-1 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <Heart className="w-6 h-6 text-red-400" />
                <span className="font-medium">HIIT Cardio</span>
                <span className="text-xs text-gray-400">0:45 work / 0:15 rest</span>
                <span className="text-xs text-gray-500">8 reps × 3 sets</span>
              </button>
              <button
                onClick={() => applyPreset('yoga')}
                className="flex flex-col items-center gap-1 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <Activity className="w-6 h-6 text-purple-400" />
                <span className="font-medium">Yoga Flow</span>
                <span className="text-xs text-gray-400">1:30 work / 0:30 rest</span>
                <span className="text-xs text-gray-500">20 reps × 1 set</span>
              </button>
              <button
                onClick={() => applyPreset('weightlifting')}
                className="flex flex-col items-center gap-1 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <Dumbbell className="w-6 h-6 text-green-400" />
                <span className="font-medium">Weightlifting</span>
                <span className="text-xs text-gray-400">0:30 work / 2:00 rest</span>
                <span className="text-xs text-gray-500">10 reps × 4 sets</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-dotted border-gray-600">
          <p className="text-center text-gray-500 text-sm">
            TaskTempo - Created by Grace Park (2025)
          </p>
        </div>
      </div>
    </div>
  );
}