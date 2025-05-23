import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


connect();
export async function POST(request:NextRequest){
    try {
        const {email,password} = await request.json();
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"user not found"},{status:404});
        }
        const valid_Password = await bcryptjs.compare(password,user.password);
        //create token with data
        if(!valid_Password){
            return NextResponse.json({error:"Invalid credentials"},{status:400});
        }
        const token = await jwt.sign({
            user:user._id,
        },process.env.SECRET_KEY!,{expiresIn:"1d"})
        
        const response = NextResponse.json({
            message:"Login successful",
            success:true,
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}