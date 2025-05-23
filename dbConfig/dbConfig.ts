import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB connected Successfully");
        })
        connection.on('error',(err)=>{
            console.log("MongoDB connection error");
            console.error("Error: ",err)
            process.exit();
        })
    }catch(error){
        console.error("Error: ",error);
    }
}