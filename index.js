import  express  from "express";
import Connection from './dataBase/db.js'
import Router from "./routes/route.js";
import blogRouter from "./routes/blogRoute.js";

const app = express()
app.use(express.json())
app.use('/user',Router);
app.use('/blog',blogRouter);

const PORT = 5000
app.listen(PORT,()=>console.log(`sever ${PORT} Running Successfully`))
Connection();
