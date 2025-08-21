const express=require('express');
const {getUserProfile}=require('../controllers/userController');
const {protect,admin}=require('../middleware/authMiddleware');

const router=express.Router();

router.get('/profile',protect,getUserProfile);
router.get('/admin-check',protect,admin,(req,res)=>{
    res.send('Welcome, Admin!')
})

module.exports=router;