require("dotenv").config();
const { mongoose } = require("mongoose");
const todoRoutes = require("./routes/todoRouter");
const authRouts = require("./routes/authRouter");
const listRoutes = require("./routes/listRouter");
const categoriesRoutes = require("./routes/categoriesRouter.js");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

app.use("/auth", authRouts);
app.use("/todos", todoRoutes);
app.use("/lists", listRoutes);
app.use("/categories", categoriesRoutes);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
