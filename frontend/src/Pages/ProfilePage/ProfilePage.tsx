import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { getUserProfileByUsername, updateUserProfile, uploadUserProfileAvatar } from '../../Services/UserProfileService';
import { UserProfileHandling } from '../../Models/User';
import { useAuth } from '../../Context/useAuth';
import { Avatar, Button, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {};

type UserProfileFormInputs = {
  email: string;
  firstName?: string;
  lastName?: string;
  favouritePet: string;
  avatarUrl?: string;
  id?: string;
  userName?: string;
};

const ProfilePage = (props: Props) => {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfileHandling | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  // Things for yup, validation
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    firstName: Yup.string(),
    lastName: Yup.string(),
    favouritePet: Yup.string().required('Favourite Pet is required'),
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserProfileFormInputs>({
    resolver: yupResolver(validationSchema)
  });

  // Get user
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.userName) {
        const profile = await getUserProfileByUsername(user.userName);
        if (profile) {
          setUserProfile(profile);
          setValue('email', profile.email);
          setValue('firstName', profile.firstName);
          setValue('lastName', profile.lastName);
          setValue('favouritePet', profile.favouritePet);
        }
      }
    };

    fetchUserProfile();
  }, [user, setValue]);

  // Avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // Update user
  const handleUpdateProfile = async (data: UserProfileFormInputs) => {
    if (user?.userName && userProfile) {
      let avatarUrl = userProfile.avatarUrl || '';
  
      if (avatarFile) {
        const uploadedAvatarUrl = await uploadUserProfileAvatar(user.userName, avatarFile);
        avatarUrl = uploadedAvatarUrl || avatarUrl;
      }
  
      const updatedProfile = await updateUserProfile(user.userName, {
        ...data,
        avatarUrl,
        id: userProfile.id,
        userName: userProfile.userName,
        firstName: data.firstName || '',
        lastName: data.lastName || ''
      });
  
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

        {/* Present forms when not editing */}
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

        {/* Forms when editing */}
        {isEditing && (
          <form className="mt-4 ml-4" onSubmit={handleSubmit(handleUpdateProfile)}>
            {/* Avatar */}
            <div className="mb-4">
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="icon-button-file"
                type="file"
                onChange={handleAvatarChange}
              />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" title="Upload Avatar" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
              {avatarPreview && (
                <Avatar src={avatarPreview} alt="Avatar Preview" sx={{ width: 100, height: 100, mt: 2 }} />
              )}
            </div>
            {/* Username, not editable */}
            <div className="mb-4">
              <input
                type="text"
                id="userName"
                className="mb-3 bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Username"
                value={userProfile?.userName}
                disabled   // Disable editing of form = Really smart and easy way to do in yup, huh? :) Theres also readonly, hidden, etc.
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <input
                type="text"
                id="email"
                className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Email"
                {...register('email')}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
            {/* First Name */}
            <div className="mb-4">
              <input
                type="text"
                id="firstName"
                className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="First Name"
                {...register('firstName')}
              />
              {errors.firstName && <p>{errors.firstName.message}</p>}
            </div>
            {/* Last Name */}
            <div className="mb-4">
              <input
                type="text"
                id="lastName"
                className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Last Name"
                {...register('lastName')}
              />
              {errors.lastName && <p>{errors.lastName.message}</p>}
            </div>
            {/* Favourite Pet */}
            <div className="mb-4">
              <input
                type="text"
                id="favouritePet"
                className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Favourite Pet"
                {...register('favouritePet')}
              />
              {errors.favouritePet && <p>{errors.favouritePet.message}</p>}
            </div>
            {/* Save and Cancel Buttons */}
            <div className="flex items-center justify-between">
              <Button type="submit" variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>
                Save
              </Button>
              <Button variant="contained" style={{ backgroundColor: 'grey', color: 'white' }} onClick={() => setIsEditing(false)}>
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