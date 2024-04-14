const express=require("express");
const app=express();

const cors=require("cors");
const cookieparser=require("cookie-parser");
app.use(cookieparser());

const dotenv=require("dotenv");
dotenv.config();

const connectDB=require("./db/config");
connectDB();

app.use(
    cors({
      origin: ["http://127.0.0.1:5173","http://127.0.0.1:5174","http://127.0.0.1:5175"],
      methods: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-with, Content-Type, Accept",
       
//     );
    
//     res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
   
//     next();
// });


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/v1/user',require("./route/userRoutes"));
app.use('/api/v1/appoint',require("./route/appointRoutes"));
app.listen(process.env.PORT,(req,res)=>{
    console.log("server is listening");
})