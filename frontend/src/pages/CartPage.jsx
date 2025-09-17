import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <p className="text-xl text-gray-600">Your cart is empty.</p>
                    <Link to="/" className="text-orange-500 hover:text-orange-600 font-semibold mt-4 inline-block">
                        &larr; Go back to shopping
                    </Link>
                </div>
            ) : (
                <div>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <h2 className="font-bold">{item.name}</h2>
                                        <p className="text-gray-800 font-semibold">₹{item.price}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                        min="1"
                                        className="w-16 text-center border rounded"
                                    />
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 font-semibold"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Cart Summary</h2>
                        <div className="flex justify-between text-lg font-semibold">
                            <span>Total Amount</span>
                            <span>₹{calculateTotal()}</span>
                        </div>
                        <Link to="/checkout" className="text-center mt-6 w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 block">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;