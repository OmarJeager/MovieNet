import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthForm from "./components/AuthForm";
import MovieSearch from "./components/MovieSearch";
import MovieDetails from "./components/MovieDetails";
import MoviePlayer from "./components/MoviePlayer";
import Profile from "./components/Profile";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/search" element={<MovieSearch />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watch:id" element={<MoviePlayer />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
