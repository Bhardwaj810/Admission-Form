import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import admissionRoutes from "./routes/admissionRoutes.js"
import contactRoutes from "./routes/contactRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ["https://admission-form-theta-nine.vercel.app", "http://localhost:5500"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

app.use("/api/admission", admissionRoutes);
app.use("/api/contact", contactRoutes);

const PORT =  process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
