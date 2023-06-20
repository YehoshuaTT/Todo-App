require("dotenv").config();
const { mongoose } = require("mongoose");

const url = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    // Proceed with your database operations
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const express = require("express");
const app = express();
app.use(express.json());

const todoRoutes = require("./todoRouter");

app.use("/todo", todoRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
