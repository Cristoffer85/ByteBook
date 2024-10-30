import { Link } from 'react-router-dom';
import logo from './logo.png';
import { useAuth } from '../../Context/useAuth';
import { Avatar } from '@mui/material';

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/home"><img src={logo} alt="Logo" /></Link>
        </div>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-2 text-back">
            <div>Welcome {user?.userName}!</div>
            <Link to="/profile" title="Click me to get to your Profile page!" className="hover:text-darkBlue flex items-center">
              {user?.avatarUrl ? (
                <Avatar src={`http://localhost:5167${user.avatarUrl}`} alt="User Avatar" sx={{ width: 32, height: 32 }} />
              ) : (
                <span>No avatar</span> // Fallback in case avatar is missing
              )}
            </Link>
            <button onClick={logout} className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">Logout</button>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-darkBlue">Login</Link>
            <Link to="/register" className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
