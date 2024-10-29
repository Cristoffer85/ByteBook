import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileHandling } from "../Models/User";

const api = "http://localhost:5167/api/profile/"; // ONLY string/URL used from backend in order be able connect with it regarding User Profile C R U D

export const getAllUserProfiles = async () => {
  try {
    const response = await axios.get<UserProfileHandling[]>(api, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserProfileByUsername = async (username: string) => {
  try {
    const response = await axios.get<UserProfileHandling>(`${api}${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserProfile = async (username: string, userProfile: UserProfileHandling) => {
  try {
    const response = await axios.put<UserProfileHandling>(`${api}${username}`, userProfile, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUserProfile = async (username: string) => {
  try {
    const response = await axios.delete(`${api}${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.status === 204;
  } catch (error) {
    handleError(error);
  }
};