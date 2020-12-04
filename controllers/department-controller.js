const {Department } = require("../models");

class DepartmentController {
  static async getAll(req,res){
    try {
      let departments= await Department.findAll()
      res.status(200).json(departments)
      
    } catch (error) {
      res.status(400).json(error)
    }
    
  }
}

module.exports= DepartmentController