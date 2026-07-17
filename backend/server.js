require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { checkCloudinary } = require("./config/cloudinary");
const connectDB=require("./config/db");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/customers", require("./routes/customer_routes"));
app.use("/api",require("./routes/auth_route"));
app.use("/api/admin",require("./routes/admin_route"));



const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    await checkCloudinary();


    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();