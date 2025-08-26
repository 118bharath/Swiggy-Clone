const Restaurant=require('../models/Restaurant.js');

const createRestaurant=async(req,res)=>{
    try{
        const {name,address,cuisine}=req.body;

        const restaurant=new Restaurant({
            name,
            address,
            cuisine,
            owner:req.user._id,
        });

        const createdRestaurant=await restaurant.save();
        res.status(201).json(createdRestaurant);
    }catch(error){
        res.status(500).json({message:'Server Error', error:error.message})
    }
}

const getRestaurants= async (req,res)=>{
    try{
        const restaurants=await Restaurant.find({owner:req.user._id})
        res.json(restaurants);
    }catch(error){
        res.status(500).json({message:'Server Error',error:error.message})
    }
}

module.exports ={createRestaurant,getRestaurants};