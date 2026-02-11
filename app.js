import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import myRoute from "./routes/route.js"

dotenv.config() //to access .env file

const app = express() //creating express app

const PORT = process.env.PORT || 5000//defining port

const MONGO_URI = process.env.MONGO_URL //defining mongo uri    

app.use(express.json()) //to parse json data


mongoose.connect(MONGO_URI).then(()=> {
    console.log("Mongoose connected via MongoDB")
}).catch((err) => {
    console.log("MonoDB connection error : ",err)
})

app.use("/api/student", myRoute)

app.get("/", (req, res) => {
    res.send("Student Record Management API with CRUD operations is running....")
})

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})


/**
 * {
    "name":"Palak Jagpal",
    "age":21,
    "email":"palak@gmail.com",
    "course":"MCA"
}
 */
