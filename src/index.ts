import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(()=> console.log("Connect to database!"));

const corsOptions = {
    origin: 'https://eatsc-frontend01.onrender.com',
    optionsSuccessStatus: 200
  };


const app = express();
app.use(express.json())
app.use(cors(corsOptions))

app.get("/health",async (req: Request, res: Response)=>{
  res.send({ message: "health OK!"});
});

app.use("/api/my/user", myUserRoute);

app.listen(1007,()=>{
  console.log("server running on localhost:1007");
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://eatsc-frontendrs.onrender.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    res.sendStatus(200);
  } else {
    
    next();
  }
});
