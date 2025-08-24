import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import authService from '../services/authService';
import {useAuth} from '../context/AuthContext';

const LoginPage=()=>{
    const [formData,setFormData]=useState({
        email:'',
        password:'',
    });

    const navigate=useNavigate();
    const {login}=useAuth();

    const {email,password}=formData;

    const handleChange=(e)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value,
        }));
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const userData=await authService.login(formData);
            login(userData);
            navigate('/');
        }catch(error){
            const message=(error.response && error.response.data && error.response.data.msg) || error.message || error.toString();
            alert(`Login failed : ${message}`)
        }
    }

    return (
    <div className="container mx-auto max-w-md mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage