import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, User } from 'lucide-react';
import ScrollingFeatures from './ScrollingFeatures';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-center animate-fade-in-up">
            Interval Timer
          </h1>
          
          <ScrollingFeatures />
        </div>
        
        <div className="space-y-4 animate-fade-in-up animation-delay-400">
          <button
            onClick={() => navigate('/timer')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 rounded-2xl text-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
          >
            <Timer className="w-6 h-6" />
            Just Take Me to the Timer
          </button>
          
          <div className="relative">
            <button
              onClick={() => navigate('/auth')}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 px-8 rounded-2xl text-xl font-semibold transition-all transform hover:scale-105 shadow-lg border border-gray-700 flex items-center justify-center gap-3"
            >
              <User className="w-6 h-6" />
              Create an Account or Login
            </button>
            <p className="text-gray-400 text-sm text-center mt-3 px-4">
              Save your favorite interval workouts, track progress, and access your timers from any device
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}