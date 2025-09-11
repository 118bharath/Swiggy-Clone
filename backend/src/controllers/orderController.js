const Order=require('../models/Order');

const createOrder=async(req,res)=>{
    try{
        const {orderItems, shippingAddress, totalPrice}=req.body;

        if (orderItems && orderItems.length===0){
            res.status(400);
            throw new Error('No order items');
        }

        const order=new Order({
            orderItems:orderItems.map(item=>({
                ...item,
                menuItem:item._id
            })),
            user:req.user._id,
            shippingAddress,
            totalPrice,
        });

        const createdOrder=await order.save();
        res.status(201).json(createdOrder);
    }catch(error){
        res.status(500).json({message:'Server Error', error:error.message})
    }
};

const getMyOrders=async(req,res)=>{
    try{
        const orders=await Order.find({user:req.user._id});
        res.json(orders);
    }catch(error){
        res.status(500).json({message:'Server Error', error:error.message});
    }
};

module.exports={createOrder,getMyOrders};