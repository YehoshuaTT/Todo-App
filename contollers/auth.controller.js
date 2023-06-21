const bcrypt = require("bcrypt");
const authService = require("../middleware/auth");
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
      await userSchema.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }

  static async login(req, res) {
    try {
      const user = await userSchema.findOne({ email: req.body.email });
      if (!user) {
        return res.status(401).send("Unauthorized");
      }

      if (await bcrypt.compare(req.body.password, user.password)) {
        res.cookie("userId", await authService.createToken(user.id));
        res.send({ user: user.toObject() });
      } else res.status(401).send("Unauthorized");
    } catch (err) {
      res.sendStatus(500);
    }
  }
}
module.exports = UserClass;
