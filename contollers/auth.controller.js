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

      const hash = bcrypt.hashSync(req.body.password, 10);
      res.send(await userSchema.create({ ...req.body, password: hash }));
    } catch (error) {
      res.sendStatus(500);
    }
  }

  static async login(req, res) {
    try {
      const user = await userSchema.findOne({ email: req.body.email });
      if (!user) {
        res.status(401).send("Unauthorized");
        return;
      }

      const validation = await bcrypt.compare(req.body.password, user.password);
      if (validation) {
        res.cookie("user", {
          token: await authService.createToken(req.body.email),
        });
        res.send("Logged in successfully!");
      } else res.status(401).send("Unauthorized");
    } catch (err) {
      res.sendStatus(500);
    }
  }
}
module.exports = UserClass;
