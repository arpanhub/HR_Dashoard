import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:function(){
            return !this.provider;
        }
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    provider:{
        type:String,
        enum:["credentials","github","google"],
        default:"credentials",
    },
    providerId:{
        type:String,
        default:null,
    },
    image:String,
    emailVerified:Date,
    isAdmin:{
        type:Boolean,
        default:false,
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date,
},{
    timestamps:true,
})
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;