import React from 'react';
import {Link} from 'react-router-dom';

const Header=()=>{
    return (
        <header className='bg-gray-800 text-white shadow-lg'>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">
                    SwiggyClone
                </Link>
                <div className="space-x-4">
                    <Link to="/login" className="hover:text-orange-400">
                        Login
                    </Link>
                    <Link to="/register" className="hover:text-orange-400">
                        Register
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;