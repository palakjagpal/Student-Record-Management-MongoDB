import StudentModel from "../models/model.js" //importing model

//create student data controller function 
export const createStudent = async(req,res) =>{
    try{
        console.log(req.body)
        const {name, age, email, course} = req.body
        //validation
        if(!name || !age || !email || !course){
            return res.status(400).json({message : "All fields are required"})
        }
        if(age < 18 || age > 65 || isNaN(age)){
            return res.status(400).json({message : "Age must be between 18 and 65 and a number"})
        }
        if(!email.includes("@gmail.com")){
            return res.status(400).json({message : "Email must be valid"})
        }   
        if(course.length < 0){
            return res.status(400).json({message : "Course must be valid"})
        }  
        if(name.length < 0 || name.length > 30){
            return res.status(400).json({message : "Name must be valid"})
        }    

        const Studentdata = new StudentModel({name, age, email, course})
        await Studentdata.save()
        res.status(201).json({message : "Student created successfully", student : Studentdata}) 
        console.log(Studentdata) 
    }
    catch(error){
        res.status(500).json({message : error.message}) 
        console.log("Error creating student data :",error)  
    }
}


//get all students controller function 
export const getAllStudents = async(req,res) => {
    try{
        console.log("Fetching all student data")

        const Studentdata =  await StudentModel.find() //fetching all student data from database
        res.status(200).json({students : Studentdata}) //sending response
        console.log("Data fetched : ",Studentdata)
    }
    catch(error){
        res.status(500).json({message : error.message})
        console.log("Error fetching student data :",error)  
    }
}


//get student by id controller function
export const getStudentById = async(req,res) => {
    try{
        console.log("Fetching student data by ID")
        const {id} = req.params //getting id from params
        const Studentdata = await StudentModel.findById(id)//finding student by id

        if(!Studentdata){ //if student not found
            return res.status(404).json({message : "Student not found"})
        }
        res.status(200).json({student : Studentdata}) //sending response
        console.log("Data fetched by ID : ",Studentdata)  

    }catch(error){
        res.status(500).json({message : error.message}) 
        console.log("Error fetching student data by ID :",error)  
    }
}


//update student by id controller functions
export const updateStudentById = async(req,res) =>{
    try{
        console.log("Updating student data by ID")
        const {id} = req.params //getting id from params
        const updates = req.body //getting data from body

        const Studentdata = await StudentModel.findByIdAndUpdate(id, updates, {new : true}) //updating student by id

        if(!Studentdata){ //if student not found
            return res.status(404).json({message : "Student not found"})
        }
        res.status(200).json({message : "Student updated successfully", student : Studentdata}) //sending response
        console.log("Data updated by ID : ",Studentdata)
    }
    catch(error){
        res.status(500).json({message : error.message}) 
        console.log("Error updating student data by ID :",error)    
    }
}


export const deleteStudentById = async (req,res) => {
    try{
        console.log("Deleting student data by ID")
        const {id} = req.params //getting id from params
        const Studentdata = await StudentModel.findByIdAndDelete(id) //deleting student by id
        if(!Studentdata){ //if student not found
            return res.status(404).json({message : "Student not found"})
        }
        res.status(200).json({message : "Student deleted successfully", student : Studentdata}) //sending response
        console.log("Data deleted by ID : ",Studentdata)    
    }
    catch(error){
        res.status(500).json({message : error.message}) 
        console.log("Error deleting student data by ID :",error)        
    }
}