import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { useCart } from '../context/CartContext';


const Header=()=>{
    const {user, logout} = useAuth();
    const {cartItems} = useCart();
    const navigate=useNavigate();

    const totalCartItems=cartItems.reduce((acc, item)=> acc+item.quantity, 0);

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
            <Link to='/cart' className='relative p-2'>
              <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalCartItems}
                </span>
              )}
          </Link>
          
          {user ? (
            <>
              <Link to="/my-orders" className='font-semibold hover:text-orange-400'>
                My Orders
              </Link>
              {user.role==='admin' && (
                <>
                  <Link to="/admin/dashboard" className='font-semibold hover:text-orange-400'>
                    My Restaurants
                  </Link>
                  <Link to="/admin/orders" className='font-semibold hover:text-orange-400'>
                    Manage Orders
                  </Link>
                  <Link to = '/admin/dashboard' className='font-semibold hover:text-orange-400'>
                    Admin Dashboard
                  </Link>
                </>
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