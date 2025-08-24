import mongoose from 'mongoose';
import Restaurant from './Restaurant';

const menuItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    imageUrl:{
        type:String,
        default:' ',
    },


    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Restaurant',
    }
});

const MenuItem=mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;