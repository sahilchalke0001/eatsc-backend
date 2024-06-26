import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute"

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(()=> console.log("Connect to database!"));

const corsOptions = {
  origin: ['https://eatsc-frontend01.onrender.com', 'https://eatsc-frontendrs.onrender.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  // If you need to allow credentials (cookies, authorization headers)
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


