import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { currentUser } = useAuth();

  return (
    <div className="profile-container">
      {currentUser ? (
        <div>
          <h2>Profile</h2>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Display Name:</strong> {currentUser.displayName || "N/A"}</p>
          {/* Add any additional profile fields you want */}
        </div>
      ) : (
        <p>You are not logged in. Please sign in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
