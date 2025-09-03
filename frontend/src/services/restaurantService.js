import axios from 'axios';

const API_URL='/api/restaurants/';

const getToken=()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    return user?user.token:null;
};

const getAuthHeaders=()=>{
    const token = getToken();
    return {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
}

const createRestaurant=async(restaurantData)=>{
    const response=await axios.post(API_URL, restaurantData, getAuthHeaders());
    return response.data;
}

const getRestaurants=async()=>{
    const response=await axios.get(API_URL+'myrestaurants', getAuthHeaders());
    return response.data;
}

const deleteRestaurant=async (id)=>{
    const response=await axios.delete(API_URL + id, getAuthHeaders());
    return response.data;
}

const getAllRestaurants=async()=>{
    const response=await axios.get(API_URL);
    return response.data;
}

const getRestaurantById=async(id)=>{
    const response=await axios.get(API_URL+id);
    return response.data;
}

const restaurantService={
    createRestaurant,
    getRestaurants,
    deleteRestaurant,
    getAllRestaurants,
    getRestaurantById
}

export default restaurantService;