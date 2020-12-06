const { Task, User, Department } = require("../models");

class TaskController {
  static async create(req, res, next) {
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
      next(err)
    }
  }
  static async getAll(req, res, next) {
    try {
      let tasks = await Task.findAll({
        include: {
          model: User,
          include: Department,
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(tasks);
    } catch (err) {
      next(err)
    }
  }
  static async getById(req, res, next) {
    try {
      let id = +req.params.id
      let tasks = await Task.findOne({
        where: { id },
        include: {
          model: User,
          include: Department,
        },
      });
      if (!tasks) {
        throw {
          status: 404,
          message: "Item not found"
        }
      } else {
        res.status(200).json(tasks);
      }
    } catch (err) {
      next(err);
    }
  }
  static async update(req, res, next) {
    try {
      let id = +req.params.id
      let category = req.body.category
      let task = await Task.findByPk(id)
      if (!task) {
        throw {
          status: 404,
          message: "Item not found"
        }
      } else if (!category) {
        throw {
          status: 400,
          message: "Please choose Category"
        }
      } else {
        let update= await Task.update({ category }, {
          where: { id },
          returning: true
        })
        task = update[1][0]
        res.status(200).json({message: "Suceess update", task})
      }

    } catch (error) {
      next(error)
    }
  }
  static async delete(req, res, next) {
    try {
      let id = +req.params.id
      let task = await Task.findByPk(id)
      if (!task) {
        throw {
          status: 404,
          message: "Item not found"
        }
      } else {
        await Task.destroy({
          where: { id },
        })
        res.status(200).json({ message: "Success Deleted", task })
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TaskController;
