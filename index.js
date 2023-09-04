import  express  from "express";
import Connection from './dataBase/db.js'
import Router from "./routes/userRoute.js";
import blogRouter from "./routes/blogRoute.js";
import cors from 'cors'

const app = express()
app.use(cors());
app.use(express.json())
app.use('/user',Router);
app.use('/blog',blogRouter);

const PORT = 5000
app.listen(PORT,()=>console.log(`sever ${PORT} Running Successfully`))
Connection();
