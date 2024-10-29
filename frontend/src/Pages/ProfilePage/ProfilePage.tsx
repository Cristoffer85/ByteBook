import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { getUserProfileByUsername, updateUserProfile } from '../../Services/UserProfileService';
import { UserProfileHandling } from '../../Models/User';
import { useAuth } from '../../Context/useAuth';

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
    favouritePet: ''
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.userName) {
      const updatedProfile = await updateUserProfile(user.userName, formData);
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        setIsEditing(false);
      }
    }
  };

  return (
    <div className="w-full relative flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 p-4 ml-64 overflow-y-auto">
        <h1 className="text-2xl mb-4">Profilepage</h1>

        {/*User Information*/}
        {userProfile && !isEditing && (
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-xl font-bold mb-2">{userProfile.userName}</h2>
            <p className="mb-2"><strong>Email:</strong> {userProfile.email}</p>
            <p className="mb-2"><strong>First Name:</strong> {userProfile.firstName}</p>
            <p className="mb-2"><strong>Last Name:</strong> {userProfile.lastName}</p>
            <p className="mb-2"><strong>Favourite Pet:</strong> {userProfile.favouritePet}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </div>
        )}

        {/*Editing mode of Profile*/}
        {isEditing && (
          <form className="bg-white shadow rounded p-4" onSubmit={handleUpdateProfile}>
            {/*Username*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                Username
              </label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={formData.userName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200"
                disabled
              />
            </div>
            {/*Email*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/*First Name*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/*Last Name*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/*Favourite Pet*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                Favourite Pet
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="flex items-center justify-between">
              {/*Save Button*/}
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
              {/*Cancel Button*/}
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;