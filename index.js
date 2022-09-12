const express = require("express");
const mongoose = require('mongoose');
const Student = require('./model/student')
const mdPass = "m1RgvEzm3XwK2Fdr"
const mdbConnection =`mongodb+srv://wbs009:${mdPass}@cluster0.2c6favt.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(mdbConnection)
const db = mongoose.connection


db.on('error', console.error.bind(console, 'mongoooooosoeeeFailed'))

const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const port =  8080

app.post('/api/student', async (req, res)=>{
   

    
   const newStudent= await Student.create({
        name : req.body.name,
        first_name: req.body.firstName,
        email: req.body.email
    })
   
        res.send(newStudent)
        console.log({created: req.body})
    
})
app.get('/student', async(req, res)=>{
    const studentArray = await  Student.find({})
    
    res.send(studentArray.map((e)=>

        ({id: e._id,
            name: e.name,
            firstName: e.first_name,
            email: e.email
        })
    ))
})

app.listen(port,()=> console.log('Server listening at ' + port))