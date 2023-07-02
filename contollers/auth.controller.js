const { findUserByToken } = require("../middleware/auth");
const UserService = require("../services/user.service");

class UserClass {
  static async register(req, res) {
    try {
      await UserService.register(req.body);
      res.sendStatus(200);
    } catch (err) {
      if (err.message === "duplication error")
        res.status(400).send("email already exists in the system");
      res.sendStatus(500);
    }
  }

  static async login(req, res) {
    try {
      const logged = await UserService.login(req.body);
      res.cookie("userId", logged.token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        domain: "localhost",
      });
      res.send({ user: logged.user.toObject() });
    } catch (err) {
      if (err.message === "Not excist error")
        res.status(401).send("Unauthorized");
      res.sendStatus(500);
    }
  }
  static async loggedCheck(req, res) {
    try {
      const cookie = req.params.cookie;
      if (!cookie) return res.sendStatus(401);

      const user = await findUserByToken(cookie);
      if (!user) return res.sendStatus(401);

      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(401).send("Unauthorized");
    }
  }
}
module.exports = UserClass;
