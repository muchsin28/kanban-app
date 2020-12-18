const { User, Department } = require("../models");
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); //1059530370578-842en1m3n0nbq1nomkshggd11ct5oar7.apps.googleusercontent.com
const { checkPassword, generateToken } = require("../helpers");

class UserController {
  static async register(req, res, next) {
    try {
      let DepartmentId;
      let depts = await Department.findAll();
      depts.forEach((dept) => {
        if (dept.name == req.body.department) DepartmentId = dept.id;
      });

      let newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        DepartmentId,
      };
      let user = await User.create(newUser);
      console.log(user)
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      next(err)
    }
  }

  static async login(req, res, next) {
    let input = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      let user = await User.findOne({
        where: {
          email: input.email
        },
        include: Department,
      });
      if (!user) {
        throw {
          status: 400,
          message: "User not found"
        }
      } else if (checkPassword(input.password, user.password)) {
        const access_token = generateToken({
          id: user.id,
          email: user.email,
          name: user.name,
          DepartmentId: user.Department.id,
          Department: user.Department.name,
        });
        res.status(200).json({
          access_token,
          name: user.name,
          Department: user.Department.name,
        });
      } else {
        throw {
          status: 400,
          message: "Invalid Email/Password"
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.google_token,
        audience: process.env.GOOGLE_CLIENT_ID,  // 1059530370578-842en1m3n0nbq1nomkshggd11ct5oar7.apps.googleusercontent.com
      });

      const payload = ticket.getPayload()
      console.log(payload);
      const userlogin = await User.findOne({
        where: {
          email: payload.email
        }
      })
      console.log(payload);
      if (userlogin) {
        const access_token = generateToken({
          id: userlogin.id,
          email: userlogin.email,
          name: userlogin.name,
          DepartmentId: userlogin.DepartmentId
        })
        res.status(200).json({ access_token, id: userlogin.id, email: userlogin.email, name: userlogin.name, DepartmentId: userlogin.DepartmentId })
      } else {
        const createuser = await User.create({
          name: payload.name,
          email: payload.email,
          password: process.env.GOOGLE_PASSWORD,  //"ApaAjaLah"
          DepartmentId: process.env.DEPARTMENT_ID // 5
        })
        const access_token = generateToken({ id: createuser.id, name: createuser.name, email: createuser.email, DepartmentId: createuser.DepartmentId })
        res.status(200).json({ access_token, id: createuser.id, name: createuser.name, email: createuser.email, DepartmentId: createuser.DepartmentId })
      }
    } catch (error) {
      next(err)
    }
  }
}
module.exports = UserController;
