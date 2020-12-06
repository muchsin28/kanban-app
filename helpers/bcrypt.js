const bcrypt= require('bcryptjs')

function hashPassword(plain){
  const salt = bcrypt.genSaltSync(10) // process.env.SALT
  const hash= bcrypt.hashSync(plain,salt)
  return hash
}

function checkPassword(pass,hash){
  return bcrypt.compareSync(pass,hash)
 
}

module.exports={
  hashPassword,
  checkPassword
}

