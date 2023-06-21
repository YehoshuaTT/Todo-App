const bcrypt = require("bcrypt");
const authService = require("./auth.controller");
const userSchema = require("../models/user.model");

class UserClass {
  static async register(req, res) {
    try {
      const exist = await userSchema.findOne(
        { email: req.body.email },
        { email: 1, _id: 0 }
      );

      if (exist) {
        return res.status(400).send("email already exists in the system");
      }

      const hash = bcrypt.hashSync(req.body.password, 10);
      res.send(await userSchema.create({ ...req.body, password: hash }));
    } catch (error) {
      res.sendStatus(500);
    }
  }

  static async login(req, res) {
    //TODO: wrap everything with try catch
    const user = await userSchema.findOne({ email: req.body.email });
    //TODO: change to unauthorized
    //TODO: You're sending 200 here, change the response to a valid http code
    if (!user) res.send("wrong email or password");

    const validation = await bcrypt.compare(req.body.password, user.password);
    if (validation)
      res.send({
        token: await authService.createToken(req.body.email),
      });
    //TODO: you're sending 200 here, its wrong
    else res.send("wrong email or password");
  }
}

module.exports = UserClass;
