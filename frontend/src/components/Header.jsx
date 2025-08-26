import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const Header=()=>{
    const {user, logout} = useAuth();
    const navigate=useNavigate();

    const handleLogout=()=>{
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-gray-800 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          SwiggyClone
        </Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
            {user.role==='admin' && (
              <Link to = '/admin/dashboard' className='font-semibold hover:text-orange-400'>
                Admin Dashboard
              </Link>
            )}
              <span className="font-semibold">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-400">
                Login
              </Link>
              <Link to="/register" className="hover:text-orange-400">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;