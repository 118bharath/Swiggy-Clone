const express=require('express');
const dotenv=require('dotenv');
const cors=require('cors');
const connectDB=require('./config/db');
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes')
const restaurantRoutes=require('./routes/restaurantRoutes.js');
const orderRoutes=require('./routes/orderRoutes');


dotenv.config();
connectDB();

const app=express();

app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('API is running')
})

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/orders',orderRoutes);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server is running on port ${PORT}`));