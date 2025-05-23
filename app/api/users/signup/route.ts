import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";



connect();


export async function POST(request:NextRequest){
    try {
        console.log("Request body");
        const reqBody = await request.json();
        const {username,email,password} = reqBody;
        console.log(reqBody);
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error:"User already exists"},{status:400});
        }
        //hashpassword
        const salt  = await bcryptjs.genSalt(10);
        const hashpassword = await bcryptjs.hash(password,salt);
        const newUser = await User.create({
            username,
            email,
            password:hashpassword
        });
       
        console.log(newUser);
        return NextResponse.json({
            message:"User created Successfully",
            success:true,
            user:{
                _id:newUser._id,
                username:newUser.username,
                email:newUser.email
            }
       },{status:201})
    } catch (error:any) {
        return NextResponse.json({error:error},{status:500})
    }
}