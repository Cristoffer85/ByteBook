import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { getUserProfileByUsername } from "../Services/UserProfileService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserProfileWithAvatar = UserProfile & { avatarUrl?: string }; 
/* Create a merged UserProfile state, 
in order to include the avatar URL without modifying the UserProfile model so unneccessary data arent sent through the API*/ 

type UserContextType = {
  user: UserProfileWithAvatar | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfileWithAvatar | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      axios.defaults.headers.common["Authorization"] = "Bearer " + storedToken;
      fetchUserProfile(JSON.parse(storedUser).userName); // Fetch avatar on reload
    }
    setIsReady(true);
  }, []);

  const fetchUserProfile = async (username: string) => {
    try {
      const profile = await getUserProfileByUsername(username);
      if (profile) {
        setUser((prevUser) => ({
          ...prevUser,                        // Keep existing user data
          userName: prevUser?.userName || "", // Ensure userName is always defined
          email: prevUser?.email || "",       // Ensure email is always defined
          avatarUrl: profile.avatarUrl,       // Update with new avatar URL
        }));
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  

  const registerUser = async (email: string, username: string, password: string) => {
    try {
      const res = await registerAPI(email, username, password);
      if (res) {
        localStorage.setItem("token", res.data.token);
        const userObj = { userName: res.data.userName, email: res.data.email };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res.data.token);
        setUser(userObj);
        toast.success("Registration Successful!");
        navigate("/home");
        fetchUserProfile(userObj.userName);   // Fetch extra profile info here
      }
    } catch (error) {
      toast.warning("Server error occurred during registration");
    }
  };

  const loginUser = async (username: string, password: string) => {
    try {
      const res = await loginAPI(username, password);
      if (res) {
        localStorage.setItem("token", res.data.token);
        const userObj = { userName: res.data.userName, email: res.data.email };
        localStorage.setItem("user", JSON.stringify(userObj));
        setToken(res.data.token);
        setUser(userObj);
        toast.success("Login Successful!");
        navigate("/home");
        fetchUserProfile(userObj.userName); // Fetch extra profile info here
      }
    } catch (error) {
      toast.warning("Server error occurred during login");
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, token, loginUser, logout, isLoggedIn, registerUser }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
