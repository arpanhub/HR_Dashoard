"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function ProfilePage(){
    const router = useRouter();
    const [loading, setloading] = React.useState(false);
    const handleClick = async()=>{
        try {
            setloading(true);
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            router.push('/login');
        } catch (error:any) {
            console.log("Failed to logout",error.message);
            toast.error(error.message);
        }finally{
            setloading(false);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h3 className="text-2xl ">Profile</h3>
            <hr/>
            <p>Profile page</p>
            <button 
            onClick={handleClick}
            className="bg-blue-500 text-white p-2 rounded-md m-2">
                logout
            </button>
        </div>
    )
}