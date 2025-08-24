import React, {createContext, useState, useContext} from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider=({children})=>{
    const [user, setUser]=useState(()=>{
        const storedUser=localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser):null;
    })

    const login =(userData)=>{
        setUser(userData);
    }

    const logout=()=>{
        authService.logout();
        setUser(null);
    };

    const value={
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth=()=>{
    return useContext(AuthContext);
}