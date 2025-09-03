import {React, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import restaurantService from '../services/restaurantService';

const HomePage=()=>{
    const [restaurants, setRestaurants]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [error, setError]=useState(null);

    useEffect(()=>{
        const fetchRestaurants=async()=>{
            try{
                const data=await restaurantService.getAllRestaurants();
                setRestaurants(data);
            } catch{
                setError('Could not able to fetch restaurants');
            }finally{
                setIsLoading(false);
            }
        };

        fetchRestaurants();
    },[]);

    if (isLoading) return <p className='text-center mt-8'>Loading Restaurants..</p>
    if (error) return <p className='text-center mt-8 text-red-500'>{error}</p>

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Restaurants Near You</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map((resto) => (
                    <Link
                        key={resto._id}
                        to={`/restaurant/${resto._id}`}
                        className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                    >
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-gray-900">{resto.name}</h2>
                            <p className="text-gray-600 mt-1">{resto.cuisine}</p>
                            <p className="text-sm text-gray-500 mt-2">{resto.address}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
};

export default HomePage;