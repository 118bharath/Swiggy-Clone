import axios from 'axios';

const API_URL='/api/orders/';

const getToken=()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    return user ? user.token:null;
}

const getAuthHeaders=()=>{
    const token=getToken();
    return {
        headers:{
            Authorization:`Bearer ${token}`,
        }
    }
}

const createOrder=async(orderData)=>{
    const response=await axios.post(API_URL, orderData, getAuthHeaders());
    return response.data;
}

const getMyOrders=async()=>{
    const response=await axios.get(API_URL + 'myorders', getAuthHeaders());
    return response.data;
}

const orderService={
    createOrder,
    getMyOrders,
}

export default orderService;