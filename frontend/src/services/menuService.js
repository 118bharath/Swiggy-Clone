import axios from '../api/axios.js';

const getToken=()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    return user ? user.token : null;
};

const getAuthHeaders=()=>{
    const token = getToken();
    return {
        headers:{
            Authorization:`Bearer ${token}`,
        },
    }
}

const addMenuItem=async (restaurantId, menuItemData)=>{
    const response=await axios.post(`/api/restaurants/${restaurantId}/menu`,
        menuItemData,
        getAuthHeaders()
    );
    return response.data;
};

const getMenuItemsByRestaurant=async (restaurantId)=>{
    const response=await axios.get(
        `/api/restaurants/${restaurantId}/menu`,
        getAuthHeaders()
    );
    return response.data;
}

const menuService={
    addMenuItem,
    getMenuItemsByRestaurant,
};

export default menuService;