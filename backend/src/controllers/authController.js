const User=require('../models/User');
const jwt=require('jsonwebtoken');
const {validationResult}=require('express-validator');

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d',
    })
}

const registerUser=async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password,role}=req.body;

    try{
        let user=await User.findOne({email});

        if (user){
            return res.status(400).json({msg:'User already exists'});
        }

        user=new User({
            name,
            email,
            password,
            role,
        });

        await user.save();

        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
        });
    }catch (error){
        console.error(error.message);
        res.status(500).send('Server error')
    }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { registerUser, loginUser };