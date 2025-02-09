"use client"; // Ensure client-side rendering

import React, { useState } from 'react';
import MainPage from '@/components/MainPage';

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(true); // Toggle for signup form
  const [state0, setState0] = useState(true);
  const [state1, setState1] = useState(true);

  // Hardcoded users storage (just for demo purposes)
  const [users, setUsers] = useState<{ username: string; password: string }[]>([]);

  // Handle Signup and Login logic
  const handleAuth = () => {
    setMessage(""); // Reset message

    // Handle Signup
    if (isSignup) {
      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        setMessage("User already exists.");
        return;
      }

      // Add new user to the "users" array
      setUsers([...users, { username, password }]);
      setMessage("User created. You can now log in.");
    }

    // Handle Login
    else {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );
      if (!user) {
        setMessage("Invalid username or password.");
        return;
      }

      setMessage("Login successful.");
      setState0(false);
    }
  };

  if(state0) {
    return (<div className="container">
      <div className="auth-card">
        <h1>{isSignup ? "Sign Up" : "Log In"}</h1>

        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input-field"
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
          />
        </div>
        <div className="button-group">
          <button onClick={handleAuth} className="auth-button">
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </div>
        {message && <div className="message">{message}</div>}
        <div className="toggle-action">
          <button onClick={() => setIsSignup(!isSignup)} className="toggle-button">
            {isSignup
              ? "Already have an account? Log In"
              : "Don't have an account? Sign Up"}
          </button>
        </div>

        {/* Continue as Guest Button */}
        <div className="guest-action">
          <button onClick={() => setState0(false)} className="guest-button">
            Continue as Guest
          </button>
        </div>
      </div>
    </div>);
}
  

  if(state1) {
    return (<div className="w-full flex flex-col items-center justify-center h-screen bg-[#f5f5dc]">
        <img src="/logoX.png" alt="HackCrypt Logo"/>
        <button 
          className="px-6 py-3 text-lg font-bold text-white bg-gray-800 border-2 border-gray-900 rounded-md shadow-md hover:bg-gray-700" 
          style={{ fontFamily: 'Pixel, sans-serif' }}
          onClick={() => setState1(false)}
        >
          Enter App
        </button>
      </div>)
  }

  return (<MainPage/>)
}