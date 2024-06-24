import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import invoiceRoutes from "./routes/invoices.js";

dotenv.config();
const app = express();  

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", userRoutes);
app.use("/invoices", invoiceRoutes);

app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING Be Conformatable");
});

// const DB_URL = process.env.DB_URL;
const PORT = 5000;
const  DB_URL="mongodb+srv://mahesh63choudhary:r0K6bRkEgzoI6rEg@cluster0.pvov6l2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const 

mongoose
  .connect(DB_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });


//Software Developer[80005303]