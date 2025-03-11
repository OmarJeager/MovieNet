import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./AuthForm.css"; // Import the CSS file

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // State for password strength progress
  const [passwordError, setPasswordError] = useState(""); // State for password error message
  const [authError, setAuthError] = useState(""); // State for authentication errors
  const [resetEmail, setResetEmail] = useState(""); // State for password reset email
  const [isReset, setIsReset] = useState(false); // State to toggle between Sign In/Reset Password view
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(""); // Clear previous authentication errors

    if (isSignUp && passwordStrength < 100) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate("/search");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setAuthError("Invalid email address.");
      } else if (error.code === "auth/wrong-password") {
        setAuthError("Invalid password.");
      } else if (error.code === "auth/user-not-found") {
        setAuthError("No user found with this email.");
      } else {
        setAuthError("Authentication error. Please try again.");
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent!");
      setIsReset(false); // Switch back to Sign In view
    } catch (error) {
      setAuthError("Error sending reset email. Please try again.");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const validatePassword = (value) => {
    setPassword(value);
    const strength = Math.min((value.length / 6) * 100, 100);
    setPasswordStrength(strength);
    if (value.length >= 6) {
      setPasswordError("");
    } else {
      setPasswordError("Password must be at least 6 characters long.");
    }
  };

  return (
    <div className={`auth-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="auth-form">
        {isReset ? (
          <div>
            <h2>Reset Password</h2>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="auth-input"
            />
            {authError && <p className="error-message">{authError}</p>}
            <button onClick={handleResetPassword} className="auth-button">
              Send Reset Email
            </button>
            <button onClick={() => setIsReset(false)} className="toggle-button">
              Back to Sign In
            </button>
          </div>
        ) : (
          <div>
            <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                required
                className={`auth-input ${passwordStrength === 100 ? "valid" : "invalid"}`}
              />
              <div className="password-strength-bar">
                <div
                  className="password-strength-progress"
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
              {isSignUp && passwordError && <p className="error-message">{passwordError}</p>}
              {authError && <p className="error-message">{authError}</p>}
              <button type="submit" className="auth-button">
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
            <button onClick={() => setIsSignUp(!isSignUp)} className="toggle-button">
              {isSignUp ? "Already have an account? Sign In" : "Create an account"}
            </button>
            <button onClick={() => setIsReset(true)} className="reset-password-button">
              Forgot Password?
            </button>
            <button onClick={toggleDarkMode} className="dark-mode-button">
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;