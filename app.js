if(process.env.NODE_ENV == "development"){
  require('dotenv').config()
}
const express = require('express')
const app = express()
const PORT= process.env.PORT || 3000
const router= require('./routes')
const {ErrorHandler}=require('./middlewares')
const cors= require('cors')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)
app.use(ErrorHandler)

app.listen(PORT, ()=>{console.log( `Listen on http://localhost:${PORT}`)})