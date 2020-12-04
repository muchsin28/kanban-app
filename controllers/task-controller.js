const { Task, User, Department } = require("../models");

class TaskController {
  static async create(req, res) {
    console.log(req.loggedIn);
    let newTask = {
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      category: req.body.category,
      UserId: req.loggedIn.id,
      DepartmentId: req.loggedIn.DepartmentId,
    };
    try {
      let task = await Task.create(newTask);
      res.status(201).json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async getAll(req, res) {
    try {
      let tasks = await Task.findAll({
        include: {
          model: User,
          include: Department,
        },
        order: [["createdAt", "DESC"]],
      });
      console.log(tasks);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  static async getById(req, res) {
    try {
      let id= +req.params.id
      let tasks = await Task.findOne({
        where:{id},
        include: {
          model: User,
          include: Department,
        },
      });
      console.log(tasks);
      res.status(200).json(tasks);
    } catch (err) {
      res.status(400).json(err);
    }
  }
}

module.exports = TaskController;
