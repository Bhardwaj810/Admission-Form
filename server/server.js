import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import admissionRoutes from "./routes/admissionRoutes.js"
dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "*", // your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/admission", admissionRoutes);

const PORT =  process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})