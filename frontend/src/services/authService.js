import axios from '../api/axios.js';

const API_URL = '/restaurants/';

const register=async (userData)=>{
    const response=await axios.post(API_URL + 'register', userData);
    return response.data
};

const login = async (userData)=>{
    const response=await axios.post(API_URL+'login',userData);
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