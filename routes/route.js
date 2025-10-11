import { createStudent, getAllStudents, getStudentById, updateStudentById, deleteStudentById } from "../controllers/controller.js"
    
import express from "express"

const router = express.Router()

router.post("/students", createStudent) //create student route
router.get("/students", getAllStudents) //get all students route
router.get("/students/:id", getStudentById) //get student by id route)
router.put("/students/:id", updateStudentById) //update student by id route
router.delete("/students/:id", deleteStudentById) //delete student by id route  

export default router //exporting router