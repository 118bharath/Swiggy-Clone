const getUserProfile=(req,res)=>{
    if(req.user){
        res.json({
            _id:req.user._id,
            name:req.user.name,
            email:req.user.email,
            role:req.user.role,
        });
    }else{
        res.status(404).json({msg:'User not found'})
    }
}

module.exports={getUserProfile}