import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [address, setAddress] = useState({
        street: '',
        city: '',
        postalCode: '',
    });

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const orderData = {
            orderItems: cartItems.map(({ _id, name, quantity, price }) => ({
                _id, name, quantity, price
            })),
            shippingAddress: address,
            totalPrice: calculateTotal(),
        };

        try {
            await orderService.createOrder(orderData);
            alert('Order placed successfully!');
            clearCart();
            navigate('/my-orders');
        } catch {
            alert('Failed to place order.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Address Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
                    <form onSubmit={handlePlaceOrder} className="space-y-4">
                        <input type="text" name="street" placeholder="Street Address" onChange={handleChange} required className="w-full p-2 border rounded"/>
                        <input type="text" name="city" placeholder="City" onChange={handleChange} required className="w-full p-2 border rounded"/>
                        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} required className="w-full p-2 border rounded"/>
                        <button type="submit" className="w-full py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
                            Place Order
                        </button>
                    </form>
                </div>
                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2">
                        {cartItems.map(item => (
                            <div key={item._id} className="flex justify-between">
                                <span>{item.name} x {item.quantity}</span>
                                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <hr className="my-4"/>
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{calculateTotal()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage; 