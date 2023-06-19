const todos = [
  {
    id: 1,
    title: "My Todo",
    description: "This is description;",
  },
  {
    id: 2,
    title: "My Todo 2",
    description: "This is description;",
  },
  {
    id: 31,
    title: "My Todo 3",
    description: "This is description;",
  },
];

class TodoController {
  static async index(req, res) {
    try {
      res.send(todos);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  static async show(req, res) {
    try {
      let result = todos.find((todo) => todo.id == req.params.id);
      res.send(result);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  static async update(req, res) {
    try {
      let test = todos.find((todo) => todo.id == req.params.id);

      if (test) {
        test.title = req.body.title;
        test.description = req.body.description;
      }
      res.send(test);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  static async create(req, res) {
    try {
      let todo = {
        id: new Date(),
        title: req.body.title,
        description: req.body.description,
      };
      todos.push(todo);
      res.send(todo);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
  static async delete(req, res) {
    try {
      let index = todos.findIndex((todo) => todo.id == req.params.id);
      if (index != -1) todos.splice(index, 1);
      res.send(todos);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  }
}

module.exports = TodoController;
