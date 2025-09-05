import React, { useState } from "react";
import { Animated } from "./Animated";

interface LoginScreenProps {
  onLogin: (user: { username: string }) => void;
  onGuest: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onGuest }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would add real authentication logic
    onLogin({ username });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Animated>
        <div className="p-8 bg-white rounded shadow-md w-full max-w-sm min-h-[400px]">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? "Sign Up" : "Login"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <button type="submit" style={{
              background: "black",
              color: "white",
              padding: "8px",
              borderRadius: "8px",
              width: "100%",
              marginTop: "8px",
            }}>
              {isSignUp ? "Sign Up" : "Login"}
            </button>
          </form>
          <button
            style={{
              background: "blue",
              color: "white",
              padding: "8px",
              borderRadius: "8px",
              width: "100%",
              marginTop: "8px",
            }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Already have an account? Login" : "Create an account"}
          </button>
          <button
            style={{
              background: "gray",
              color: "white",
              padding: "8px",
              borderRadius: "8px",
              width: "100%",
              marginTop: "8px",
            }}
            onClick={onGuest}
          >
            Proceed as Guest
          </button>
        </div>
      </Animated>
    </div>
  );
};

export default LoginScreen;
