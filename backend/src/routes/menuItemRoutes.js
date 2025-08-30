const express=require('express');
const {addMenuItem,getMenuItemsByRestaurant}=require('../controllers/menuItemController');
const {protect,admin}=require('../middleware/authMiddleware');

const router=express.Router({mergeParams:true});

router.route('/').post(protect,admin,addMenuItem).get(protect,admin,getMenuItemsByRestaurant);

module.exports=router