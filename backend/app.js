const express = require("express")
const userRouter = require("./routes/userRoute")
const cors = require("cors")
const error = require('./middleware/error')

const app = express()

app.use(express.json())
app.use(cors())

app.use(express.static('backend/public'))

//error handler

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/api/v1",userRouter)
app.use(error)


module.exports = app