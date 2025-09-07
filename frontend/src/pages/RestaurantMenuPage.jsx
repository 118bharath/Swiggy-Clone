import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import restaurantService from '../services/restaurantService';
import {useCart} from '../context/CartContext';

const RestaurantMenuPage=()=>{
    const {id: restaurantId}=useParams();
    const [restaurant,setRestaurant]=useState(null);
    const [menu,setMenu]=useState([]);
    const[isLoading,setIsLoading]=useState(true);
    const [error,setError]=useState(null);
    const {addToCart} = useCart();

    useEffect(()=>{
        const fetchRestaurantDetails=async()=>{
            try{
                const data=await restaurantService.getRestaurantById(restaurantId);
                setRestaurant(data.restaurant);
                setMenu(data.menu);
            }catch{
                setError('Could not fetch restaurant details');
            }finally{
                setIsLoading(false)
            }
        };

        fetchRestaurantDetails()
    },[restaurantId]);

    if(isLoading) return <p className='text-center mt-8'>Loading menu..</p>;
    if (error) return <p className='text-center mt-8 text-red-500'>{error}</p>;
    if (!restaurant) return <p className='text-center mt-8'>Restaurant not found.</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">{restaurant.name}</h1>
                <p className="text-lg text-gray-600 mt-1">{restaurant.cuisine}</p>
                <p className="text-md text-gray-500 mt-2">{restaurant.address}</p>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">Menu</h2>
                <div className="space-y-4">
                    {menu.length > 0 ? (
                        menu.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <p className="text-gray-800 font-semibold mt-1">₹{item.price}</p>
                                </div>
                                <button onClick={()=> addToCart(item)} className='bg-orange-500 text-white font-bold px-4 py-2 rounded-lg hover:bg-orange-600'>Add</button>
                            </div>
                        ))
                    ) : (
                        <p>No menu items available at the moment.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default RestaurantMenuPage;