import axios from '../api/axios.js';

// const API_URL = '/restaurants/';

const register=async (userData)=>{
    const response=await axios.post('/auth/register', userData);
    return response.data
};

const login = async (userData)=>{
    const response=await axios.post('/auth/login',userData);
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data));
    }
    return response.data;
}

const logout=()=>{
    localStorage.removeItem('user');
}

const authService={
    register,
    login,
    logout,
}

export default authService;