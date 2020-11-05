const express= require( 'express')
const cors =require('cors') 
const helmet =require('helmet') 
const http = require('http')
const app = express()
const database = require('./databaseConfig.js')
app.use(express.json())
app.use(cors())
app.use(helmet())
// Response status
app.get('/status', (req, res)=>{
    res.status(200).json(http.STATUS_CODES)
})
// Default route
app.get('/', (req, res)=>{
    res.status(200).send("Welcome to our API")
})
// SEARCHING A DATABASE
app.get('/search/all/yes', async (req, res)=>{
    try{
        const students = await database("students")
        if(students.length ===0){
            throw new Error("Error")
        }
        res.status(200).json(students)
    }catch(error){
        res.status(500).send({message:"There was an error in the server!!"})
    }
})
app.get('/search/all/:id',async (req, res)=>{
    // getting a student with a specific id 
    const {id} = req.params
    try {
        if(id){
            const student = await database("students").where('id', id)
            if(student.length ===0){
                throw new Error("Error")
            }
            res.status(200).json(student)
        }else{
            throw new Error("Error")
        }
    } catch (error) {
        res.status(404).send({message:http.STATUS_CODES[404]})
    }
})
// UPDATING A DATABASE
app.put('/update/one/yes/:id',async (req, res)=>{
    const {id} = req.params
    const data = req.body
    //res.status(200).json({"data": data, "id": id})
    if(!data){
        res.status(400).json({"message":http.STATUS_CODES[400]})
        return;
    }
   try {
        await database("students").update(data).where('id', Number.parseInt(id))
        const student = await database("students").where('id','=', id)
        res.status(201).json(student)
    } catch (error) {
        // 304 NOT MODIFIED
        res.status(304).send({message:http.STATUS_CODES[304]})
    }
})
// DELETING FROM A DATABASE
app.delete('/delete/one/:id',async (req, res)=>{
   const {id} = req.params
   try {
       if(!id){
           throw new Error("Error")
       }
       await database("students").del().where('id', '=', id);
       res.status(410).json({"message": `The student with id ${id} has been deleted sucessfully`, "status code": 410 , "status message": http.STATUS_CODES[410]})
   } catch (error) {
    res.status(304).send({message:http.STATUS_CODES[304]})
   }
})
// INSERTING INTO A DATABASE
app.post('/insert',async (req, res)=>{
    const data = req.body
    if(!data){
        res.status(400).json({"message":http.STATUS_CODES[400]})
        return;
    }
    try {
        await database("students").insert(data)
        res.status(200).json({"message":"Created","data":data})
    } catch (error) {
        res.status(500).send({message:http.STATUS_CODES[500]})
    }
})
module.exports= app