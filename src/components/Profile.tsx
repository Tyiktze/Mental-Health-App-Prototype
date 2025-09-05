import React from "react";

interface ProfileProps {
  user: { username?: string };
  onClose: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onClose }) => (
  <div className="p-8 max-w-md mx-auto bg-white dark:bg-gray-900 rounded shadow text-gray-900 dark:text-gray-100">
    <h2 className="text-2xl font-bold mb-4">Profile</h2>
    <p>
      <strong>Username:</strong> {user.username}
    </p>
    <p>You are doing good today.</p>
    <button
      className="mt-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded dark:bg-blue-600 dark:hover:bg-blue-700"
      onClick={onClose}
    >
      Close
    </button>
  </div>
);

export default Profile;
