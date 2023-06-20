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
const userRotes = require("./userRouter");
const authController = require("./auth.controller");

app.use(async (req, res, next) => {
  const userIsAuthenticated = await authController.validateToken(
    req,
    res,
    next
  );

  if (!res.body == "valid") {
    res.status(401).send("Unauthorized");
  }
});
app.use("/user", userRotes);
app.use("/todo", todoRoutes);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
