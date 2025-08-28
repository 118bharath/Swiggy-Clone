const express=require('express');
const {
    createRestaurant,
    getRestaurants,
    updateRestaurant,
    deleteRestaurant,
}=require('../controllers/restaurantController.js')
const {protect, admin}=require('../middleware/authMiddleware.js');

const router=express.Router();

router.route('/').post(protect,admin,createRestaurant);
router.route('/myrestaurants').get(protect, admin, getRestaurants);

router.route('/:id').put(protect,admin,updateRestaurant).delete(protect,admin,deleteRestaurant);

module.exports=router;