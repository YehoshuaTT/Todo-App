require("dotenv").config();
const { mongoose } = require("mongoose");
const todoRoutes = require("./routes/todoRouter");
const authRouts = require("./routes/authRouter");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

app.use("/todo", todoRoutes);
app.use("/", authRouts);

//TODO: move this port to env file
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
