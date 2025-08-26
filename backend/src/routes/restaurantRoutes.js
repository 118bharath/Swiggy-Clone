const express=require('express');
const {
    createRestaurant,
    getRestaurants,
}=require('../controllers/restaurantController.js')
const {protect, admin}=require('../middleware/authMiddleware.js');

const router=express.Router();

router.route('/').post(protect,admin,createRestaurant);
router.route('/myrestaurants').get(protect, admin, getRestaurants);

module.exports=router;