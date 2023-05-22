import express  from "express";
import * as dotenv from 'dotenv';
import cors from 'cors'
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/post.js";
import dalleRoutes from "./routes/dalle.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use('/api/v1/post',postRoutes)
app.use('/api/v1/dalle',dalleRoutes)


app.get('/',async(req,res)=>{
    res.send('Hello World')
})



const startServer=async()=>{
    try{
        connectDB(process.env.MONGO_URL);
        app.listen(8080,()=>console.log("Backend server is running"))
    }
    catch(err){
            console.log(console.error)
    }

}

startServer();
