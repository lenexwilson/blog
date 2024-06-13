const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const { signmodel } = require("./models/signup")


const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://lenex:ducati@cluster0.kfyoghs.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async(password) => {
const salt=await bcrypt.genSalt(10)
return bcrypt.hash(password,salt)
}

app.post("/signup", async(req, res) => {
    let input = req.body
    let hashedPassword=await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password=hashedPassword
    let sign=new signmodel(input)
    sign.save()
    res.json({ status: "success" })
})

app.listen(8003, () => {
    console.log("server started")
})