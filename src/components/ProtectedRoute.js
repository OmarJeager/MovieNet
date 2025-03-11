import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check authentication status
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(user ? true : false); // If a user is authenticated, set to true
    });

    // Cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <h2>Loading...</h2>; // Show loading while checking authentication
  }

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Redirect to="/login" />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
