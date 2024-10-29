import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { getUserProfileByUsername, updateUserProfile, uploadUserProfileAvatar } from '../../Services/UserProfileService';
import { UserProfileHandling } from '../../Models/User';
import { useAuth } from '../../Context/useAuth';
import { Avatar, Button, TextField, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

type Props = {};

const ProfilePage = (props: Props) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfileHandling | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfileHandling>({
    id: '',
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    favouritePet: '',
    avatarUrl: ''
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.userName) {
        const profile = await getUserProfileByUsername(user.userName);
        if (profile) {
          setUserProfile(profile);
          setFormData(profile);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  // Helper method to handle input changes, makes code more readable and DRY
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // Preview image
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.userName) {
      let avatarUrl = formData.avatarUrl;

      if (avatarFile) {
        const uploadedAvatarUrl = await uploadUserProfileAvatar(user.userName, avatarFile);
        avatarUrl = uploadedAvatarUrl || avatarUrl;
      }

      const updatedProfile = await updateUserProfile(user.userName, { ...formData, avatarUrl });
      if (updatedProfile) {
        const refreshedProfile = await getUserProfileByUsername(user.userName);
        if (refreshedProfile) {
          setUserProfile(refreshedProfile);
        }
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="w-full relative flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 ml-64 overflow-y-auto">
        <h1 className="text-2xl mb-4">Profile Page</h1>

        {userProfile && !isEditing && (
          <div className="bg-white shadow rounded p-4">
            <Avatar src={`http://localhost:5167${userProfile.avatarUrl}`} alt={userProfile.userName} sx={{ width: 100, height: 100 }} />
            <h2 className="text-xl font-bold mb-2">{userProfile.userName}</h2>
            <p className="mb-2"><strong>Email:</strong> {userProfile.email}</p>
            <p className="mb-2"><strong>First Name:</strong> {userProfile.firstName}</p>
            <p className="mb-2"><strong>Last Name:</strong> {userProfile.lastName}</p>
            <p className="mb-2"><strong>Favourite Pet:</strong> {userProfile.favouritePet}</p>
            <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        )}

        {isEditing && (
          <form className="bg-white shadow rounded p-4" onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              {avatarPreview && (
                <Avatar src={avatarPreview} alt="Avatar Preview" sx={{ width: 100, height: 100, mt: 2 }} />
              )}
            </div>
            <div className="mb-4">
              <TextField
                label="Username"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                fullWidth
                disabled
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Favourite Pet"
                name="favouritePet"
                value={formData.favouritePet}
                onChange={handleInputChange}
                fullWidth
              />
            </div>
            <div className="flex items-center justify-between">
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;