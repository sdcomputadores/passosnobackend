
//modules 
const express = require('express')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')



//routes
const authRouter = require('./routes/authRouter.js')
const userRouter = require('./routes/userRouter.js')
const partyRouter = require('./routes/partyRouter.js')

//middlewre


// config
const dbName = 'partytimebp'
const port = 3000
const app =  express()


app.use(cors())
app.use(express.json())
app.use(express.static('public'))



 // atrelar as Rotas

 app.get('/api/auth', authRouter)
 app.get('/api/user', userRouter)
 app.get('/api/party', partyRouter)
 
 //conectar ao mongodb
  
mongoose.connect(`mongodb://127.0.0.1/${dbName}`, {
  useNewUrlParser: true, 
 // useFindAndModify: false,
  useUnifiedTopology: true}
  )

 app.get("/", (req, res) =>{
  res.json({message: "Rota test"})
})




app.listen(port, ()=> {
  console.log(`O backend esta rodadno na porta : ${port}`)
})



