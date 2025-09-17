const express=require('express');
const {createOrder,getMyOrders, getAllOrders, updateOrderStatus}=require('../controllers/orderController');
const {protect, admin}=require('../middleware/authMiddleware');

const router=express.Router();

router.route('/').post(protect,createOrder);
router.route('/myorders').get(protect,getMyOrders);

router.route('/').get(protect,admin,getAllOrders);
router.route('/:id/status').put(protect,admin,updateOrderStatus);

module.exports=router;