const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const authService = require("./auth");
const userSchema = require("./user.model");

class UserClass {
  static async register(req, res) {
    const exist = await userSchema.findOne({ email: req.body.email });
    if (exist) res.send("email or password alredy exist");

    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;
    res.send(await userSchema.create(req.body));
  }

  static async login(req, res) {
    const user = await userSchema.findOne({ email: req.body.email });
    if (!user) res.send("wrong email or password");

    const validation = await bcrypt.compare(req.body.password, user.password);
    if (validation)
      res.send({
        token: await authService.createToken(req.body.email),
        // id: user._id,
      });
    else res.send("wrong email or password");
  }

  // static async findByToken(token) {
  //   const tokenData = await authService.findByToken(token);
  //   const user = await this.findOne({ email: tokenData.email });
  //   return user;
  // }
}

module.exports = UserClass;
