const Restaurant=require('../models/Restaurant.js');

const updateRestaurant=async(req,res)=>{
    try{
        const {name,address,cuisine} = req.body;
        const restaurant=await Restaurant.findById(req.params.id);

        if (restaurant && restaurant.owner.toString()===req.user._id.toString()){
            restaurant.name=name || restaurant.name;
            restaurant.address=address || restaurant.address;
            restaurant.cuisine=cuisine || restaurant.cuisine;

            const updatedRestaurant=await restaurant.save();
            res.json(updateRestaurant);
        } else{
            res.status(404).json({message: 'Restaurant not found or user not authorized'})
        }
    } catch (error){
        res.status(500).json({message:'Server Error', error:error.message});
    }
};

const deleteRestaurant = async (req,res)=>{
    try{
        const restaurant=await Restaurant.findById(req.params.id);

        if (restaurant && restaurant.owner.toString()===req.user._id.toString()){
            await restaurant.deleteOne();
            res.json({message : 'Restaurant removed'});
        }else{
            res.status(404).json({message:'Restaurant not found or user not authorized'})
        }
    }catch(error){
        res.status(500).json({message:'Server Error', error:error.message})
    }
}

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

module.exports ={createRestaurant,getRestaurants, updateRestaurant, deleteRestaurant};