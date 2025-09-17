import React, {useState,useEffect} from 'react';
import orderService from '../services/orderService';

const MyOrdersPage=()=>{
    const [orders,setOrders]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(()=>{
        const fetchOrders=async()=>{
            try{
                const data=await orderService.getMyOrders();
                setOrders(data);
            }catch(error){
                console.error("failed to fetch orders",error);
            }finally{
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if(isLoading) return <p>Loading your Orders...</p>;

    return (
        <div className='container mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-6'>My Orders</h1>
            <div className='space-y-4'>
                {orders.length>0 ? (
                    orders.map(order=>(
                    <div key={order._id} className='bg-white p-4 rounded-lg shadow-md'>
                        <p><strong>Order ID:</strong> {order._id}</p>
                        <p><strong>Date:</strong>{new Date(order.createdAt).toLocaleDateString()}</p>
                        <p><strong>Total: </strong> {order.totalPrice.toFixed(2)}</p>
                        <p><strong>Status:</strong>{order.orderStatus}</p>
                    </div>
                ))
                ):(<p>You have no orders yet.</p>
                )}
            </div>
        </div>
    )
};

export default MyOrdersPage;