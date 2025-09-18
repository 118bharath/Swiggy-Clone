import React,{useState,useEffect} from 'react';
import orderService from '../services/orderService';

const AdminOrdersPage=()=>{
    const [orders,setOrders]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState('');

    useEffect(()=>{
        const fetchAllOrders=async()=>{
            try {
                const data=await orderService.getAllOrders();
                setOrders(data);
            } catch (error) {
                setError('Failed to fetch orders.')
            }finally{
                setIsLoading(false);
            }
        };
        fetchAllOrders();
    },[]);

    const handleStatusChange=async(orderId,newStatus)=>{
        try {
            await orderService.updateOrderStatus(orderId,newStatus);
            setOrders(prevOrders=> prevOrders.map(order=>order._id===orderId ? {...order,orderStatus:newStatus}:order))
        } catch (error) {
            setError('failed to update order Status')
        }
    };

    if(isLoading) return <p>Loading all orders...</p>;
    if(error) return <p className='text-red-500'>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Manage All Orders</h1>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Order ID</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order._id}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.user ? order.user.name : 'N/A'}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">₹{order.totalPrice.toFixed(2)}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <select
                                        value={order.orderStatus}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Out for Delivery">Out for Delivery</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default AdminOrdersPage;

