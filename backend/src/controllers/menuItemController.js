const MenuItem=require('../models/MenuItem.js');
const Restaurant=require('../models/Restaurant.js');

const addMenuItem=async(req,res)=>{
    try{
        const {name,description,price,imageUrl}=req.body;
        const {restaurantId}=req.params;

        const restaurant=await Restaurant.findById(restaurantId);

        if (!restaurant){
            return res.status(404).json({message: 'Restaurant not Found'});
        }

        if (restaurant.owner.toString()!==req.user._id.toString()){
            return res.status(403).json({message:'User not authorized to add items to this restaurant'});
        }

        const menuItem=new MenuItem({
            name,
            description,
            price,
            imageUrl,
            restaurant: restaurantId,
        });

        const createdMenuItem=await menuItem.save();
        res.status(201).json(createdMenuItem);
    }catch(error){
        res.status(500).json({message:'Server Error', error:error.message})
    }
};

const getMenuItemsByRestaurant=async(req,res)=>{
    try{
        const {restaurantId}=req.params;
        const menuItems=await MenuItem.find({restaurant:restaurantId});
        res.json(menuItems);
    }catch(error){
        res.status(500).json({message:'Server Error', error:error.message})
    }
};

module.exports={addMenuItem, getMenuItemsByRestaurant};