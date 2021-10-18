const mongoose= require ('mongoose')
require('dotenv').config()
require ('express-async-errors')
//async errors 
const express = require ('express')
const app = express()

const connectDB = require ('./db/connect')
const productRouter= require ('./routes/products')
const notFoundMiddleware = require('./middleware/not-found')
const errorMidlleware = require('./middleware/error-handler')
 
//midlleware 
 app.use(express.json())

// routes
app.get('/' , (req,res)=>{
   res.send('<h1>Store API </h1><a href="/api/v1/products">Products Route</a>')
})

app.use('/api/v1/products',productRouter)

//product route
app.use(notFoundMiddleware)
app.use(errorMidlleware)

const port= process.env.PORT || 3000

const start = async () =>{
  try {
     //connect DB
     await connectDB(process.env.MONGO_URI)
     app.listen(port , console.log (`Server is listning to port ${port}...` ))
  }catch(error){
    console.log(error)
  }
}

start()