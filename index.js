const express = require("express");
const TodoController = require("./controller");
const app = express();
app.use(express.json());

app.get("/", TodoController.index);
app.get("/:id", TodoController.show);
app.post("/", TodoController.create);
app.put("/:id", TodoController.update);
app.delete("/:id", TodoController.delete);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
