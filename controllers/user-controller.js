const { User, Department } = require("../models");
// const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { checkPassword, generateToken } = require("../helpers");

class UserController {
  static async register(req, res) {
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
      res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
      let msg = err.errors[0].message;
      res.status(500).json(msg);
    }
  }

  static async login(req, res) {
    try {
      let input = {
        email: req.body.email,
        password: req.body.password,
      };
      let user = await User.findOne({
        where: { email: input.email },
        include: Department,
      });
      console.log(user.DepartmentId);
      if (!user) {
        res.status(404).json("User not found");
      } else if (checkPassword(input.password, user.password)) {
        const access_token = generateToken({
          id: user.id,
          email: user.email,
          name: user.name,
          DepartmentId: user.DepartmentId,
        });
        res.status(200).json({ access_token, name: user.name });
      } else {
        res.status(400).json("Invalid Email/Password");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // static async googleLogin(req, res) {
  //   try {
  //     const ticket = await client.verifyIdToken({
  //       idToken: req.body.google_token,
  //       audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  //       // Or, if multiple clients access the backend:
  //       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  //     });

  //     const payload = ticket.getPayload()
  //     console.log(payload);
  //     const userlogin = await User.findOne({
  //       where: {
  //         email: payload.email
  //       }
  //     })
  //     console.log(payload);
  //     if (userlogin) {
  //       const access_token = generateToken({
  //         id: userlogin.id,
  //         email: userlogin.email,
  //         name: userlogin.name
  //       })
  //       res.status(200).json({ access_token, email: userlogin.email, name: userlogin.name })
  //     } else {
  //       const createuser = await User.create({
  //         name: payload.name,
  //         email: payload.email,
  //         password: process.env.GOOGLE_PASSWORD
  //       })
  //       const access_token = generateToken({ id: createuser.id, email: createuser.email })
  //       res.status(200).json({ access_token })
  //     }
  //   } catch (error) {
  //     res.status(500).json(error)
  //   }
  // }
}
module.exports = UserController;
