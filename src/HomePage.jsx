import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, User, LogOut } from 'lucide-react';
import ScrollingFeatures from './ScrollingFeatures';
import { supabase } from './supabaseClient';

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-center animate-fade-in-up">
            TaskTempo
          </h1>
          
          {user && (
            <div className="text-center animate-fade-in-up animation-delay-200">
              <p className="text-xl text-gray-300">
                Welcome back, <span className="text-blue-400 font-semibold">
                  {user.user_metadata?.name || user.email?.split('@')[0]}
                </span>!
              </p>
            </div>
          )}
          
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
          
          {user ? (
            <button
              onClick={handleSignOut}
              className="w-full bg-gray-800 hover:bg-gray-700 text-white py-6 px-8 rounded-2xl text-xl font-semibold transition-all transform hover:scale-105 shadow-lg border border-gray-700 flex items-center justify-center gap-3"
            >
              <LogOut className="w-6 h-6" />
              Sign Out
            </button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}