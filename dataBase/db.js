import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const URL = process.env.MONGO_URL
 const Connection = async () => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log("Database Connect Successfully")
    } catch (error) {
        console.log("Error Database Connection", error)

    }
}
export default Connection