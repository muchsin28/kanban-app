//Error Handler

function ErrorHandler(err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({
      message: err.message
    })
  } else if (err.name == "SequelizeValidationError") { 
    let messages=[]
    err.errors.forEach(error => {
      messages.push(error.message)
    });
    res.status(400).json({messages})
  } else if (err.name == "SequelizeUniqueConstraintError") {
    let messages = []
    err.errors.forEach(error => {
      messages.push(error.message)
    });
    res.status(400).json({messages})
  }else {
    res.status(500).json("Internal Server Error")
  }

}

module.exports = ErrorHandler