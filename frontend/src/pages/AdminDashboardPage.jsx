import React, {useState,useEffect} from 'react';
import restaurantService from '../services/restaurantService';

const AdminDashboardPage=()=>{
    const [restaurants,setRestaurants]=useState([]);
    const [formData, setFormData]=useState({
        name:'',
        address:'',
        cuisine:'',
    });
    const [error,setError]=useState(null);
    const [isLoading,setIsLoading]=useState(true);

    const fetchRestaurants=async()=>{
        try{
            const data=await restaurantService.getRestaurants();
            setRestaurants(data);
        }catch {
            setError('Failed to Fetch restaurants');
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        fetchRestaurants()
    },[]);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await restaurantService.createRestaurant(formData);
            setFormData({name:'',address:'',cuisine:''});
            fetchRestaurants();
        }catch{
            setError('Failed to create restaurant');
        }
    };

    const handleDelete=async(id)=>{
      if (window.confirm('Are you sure you want to delete this restaurant ?')){
        try{
          await restaurantService.deleteRestaurant(id);
          fetchRestaurants();
        }catch{
          setError('Failed to delte restaurant.')
        }
      }
    }

    return (
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add a New Restaurant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Restaurant Name"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
            placeholder="Cuisine Type"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
          >
            Add Restaurant
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">My Restaurants</h2>
        {isLoading && <p>Loading restaurants...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          {restaurants.length > 0 ? (
            restaurants.map((resto) => (
              <div key={resto._id} className="bg-white p-4 rounded-lg shadow-md">
                <div>
                <h3 className="font-bold">{resto.name}</h3>
                <p>{resto.address}</p>
                <p className="text-gray-600">{resto.cuisine}</p>
              </div>
              <div className='space-x-2'>
                <button className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600'>
                  Edit
                </button>
                <button onClick={()=> handleDelete(resto._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>
                  Delete
                </button>
              </div>
              </div>
            ))
          ) : (
            <p>You have not added any restaurants yet.</p>
          )}
        </div>
      </div>
    </div>
    )
}

export default AdminDashboardPage;