import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import menuService from '../services/menuService';

const ManageMenuPage=()=>{
    const {restaurantId}=useParams();
    const [menuItems, setMenuItems]=useState([]);
    const [formData,setFormData]=useState({
        name:'',
        description:'',
        price:'',
    });

    const [isLoading, setIsLoading]=useState(true);
    const [error,setError]=useState(null);

    const fetchMenuItems = async () => {
        try {
            const data = await menuService.getMenuItemsByRestaurant(restaurantId);
            setMenuItems(data);
        } catch {
            setError('Failed to fetch menu Items');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMenuItems();
    }, [restaurantId]);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await menuService.addMenuItem(restaurantId,{
                ...formData,
                price: Number(formData.price),
            });
            setFormData({name:'', description:'', price:''});
            fetchMenuItems();
        }catch{
            setError('Failed to add menu Item');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Menu</h1>

            <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add a New Menu Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Item Name"
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
                    >
                        Add Item
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Current Menu</h2>
                {isLoading && <p>Loading menu...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="space-y-4">
                    {menuItems.length > 0 ? (
                        menuItems.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="font-bold">{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="text-gray-800 font-semibold">₹{item.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>This restaurant has no menu items yet.</p>
                    )}
                </div>
            </div>
        </div>
    );

}

export default ManageMenuPage;