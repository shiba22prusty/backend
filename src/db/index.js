import mongoose, { mongo } from "mongoose";
import { DB_NAME } from "../constants.js";




const connectDB = async ()=>{
    try {
    const connectionINstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    console.log(`\n MongoDB connected !! DB Host 
        ${connectionINstance.connection.host} `);
    
    } catch (error) {
        console.log("MONGODB connection FAILED", error);
        process.exit(1)
    }
}
export default connectDB