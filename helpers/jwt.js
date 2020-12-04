const jwt = require('jsonwebtoken')

function generateToken(payload){
  return jwt.sign(payload, "HaloHaloBandung")
}

function verifyToken(token){
  return jwt.verify(token,"HaloHaloBandung")
  
}

module.exports={
  generateToken,
  verifyToken
}


