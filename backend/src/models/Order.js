const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    orderItems:[
        {
            name:{type:String,required:true},
            quantity:{type:Number, required:true},
            price:{type:Number, required:true},
            menuItem:{
                type:mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'MenuItem',
            },
        },
    ],
    shippingAddress:{
        street:{type:String, required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0,
    },
    orderStatus:{
        type:String,
        required:true,
        enum:['Pending', 'Processing', "Out for Delivery", 'Delivered', 'Cancelled'],
        default:'Pending',
    },
},
{
    timestamps:true,
}
)

const Order=mongoose.model('Order', orderSchema);

module.exports=Order;