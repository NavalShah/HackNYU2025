"use client"; // Ensure client-side rendering
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSignup, setIsSignup] = useState(true); // Toggle for signup form

  // Hardcoded users storage (just for demo purposes)
  const [users, setUsers] = useState<{ username: string; password: string }[]>([]);

  const router = useRouter();

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
      router.push("/dashboard"); // Redirect to dashboard on successful login
    }
  };

  // Continue as guest
  const continueAsGuest = () => {
    router.push("/dashboard"); // Redirect to dashboard directly
  };

  return (
    <div className="container">
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
          <button onClick={continueAsGuest} className="guest-button">
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
