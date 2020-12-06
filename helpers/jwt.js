require('dotenv').config()
const jwt = require('jsonwebtoken')

function generateToken(payload){
  return jwt.sign(payload, "CocaColaFanta") // process.env.SECRET
}

function verifyToken(token){
  return jwt.verify(token, "CocaColaFanta") // process.env.SECRET
  
}

module.exports={
  generateToken,
  verifyToken
}


