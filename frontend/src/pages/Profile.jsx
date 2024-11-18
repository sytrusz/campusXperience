import React, { useState, useEffect } from 'react';
import EditProfile from '../components/EditProfile';
import CustomAppBar from '../components/Appbar';

const Profile = ({ userType, userData, onSaveProfile }) => {
  const [user, setUser] = useState(userData);

  useEffect(() => {
    // This effect can be used to fetch user data from API or context if needed
    setUser(userData);
  }, [userData]);

  const handleSaveProfile = (updatedData) => {
    // Call API or update user state (or context)
    console.log('Profile updated:', updatedData);
    onSaveProfile(updatedData);  // Pass the updated data to parent or context
  };

  return (
    <div>
        <EditProfile userType={userType} userData={user} onSave={handleSaveProfile} />
    </div>
  );
};

export default Profile;
