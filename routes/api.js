const express = require('express')
// Importing the Sequelize models
const database = require('../models/index') //will require the index.js file from this directory
const Student = database.Student //the student model

//Setting Up Router
const router = express.Router()

router.get('/students', function(req, res, next) {
    //handles a request to get a list of all students
    //query database, get all rows from db
    //convert to json form
    //availbale in the then function
    Student.findAll( {order: ['name'] } ).then(students => {
        return res.json(students)//After retrieving the student data, it sends a JSON response back to the client
    })
})

//is used to create a new student in the database
router.post('/students', function(req, res, next){
    const newStudent = req.body
   Student.create(newStudent).then( result => {
    //inserts a new student record into the database using the data passed from req.body
        return res.status(201).send('New student created!')
   }).catch( err => {
    // 400 = bad request - client is sending a request the server cant fulfill
        return res.status(400).send('Invalid data')
        if (err instanceof database.Sequelize.ValidationError) {
            const message = err.errors.map( e => e.message)
            return res.status(400).json(messages) 
        } else{
            //some other error?
            next(err)// Pass any other errors
        }
    })
})

//to upadate an existing student info 
router.patch('/students/:id', function(req, res, next) {
    //updates the student record that matches the given ID with the new data passed in the body (updatedStudent)
    const studentID = req.params.id
    const updatedStudent = req.body //update data about this student
    console.log(updatedStudent)
    Student.update( updatedStudent, { where: {id: studentID} }).then( (result) => {

        const rowsModified = result[0] 
        // if 1 row was changed, we found student and they were updated
        if (rowsModified === 1) {
            return res.send('OK')
        }
        //student id that doesnt exist
        else {
            //if 0 rows were updated, student was not found
            return res.status(404).send('Student not found')
        }

    
    }).catch( err => { //database problems - app cant connect tothe database, or database reports errors
           
        //invalid data in the update - eg, no name
         // 400 = bad request - client is sending a request the server cant fulfill
         return res.status(400).send('Invalid data')
         if (err instanceof database.Sequelize.ValidationError) {
             const messages = err.errors.map( e => e.message)
             return res.status(400).json(messages)
         } else {
             //some other error?
             next(err)
         }
    })

    //what kinds of erros could we see?

    //student id that doesnt exist
    
})

router.delete('/students/:id', function(req, res, next) {
    //delete request to /api/students/4 will delete student with id 4
    const studentID = req.params.id
    Student.destroy( { where: { id: studentID } } ).then( (rowsDeleted) => {
        if (rowsDeleted === 1) {
        return res.send('Student deleted')
        } else { //0 rows deleted- the student with this id is not inthe databas
            return res.status(404).send('Student not found')
        }
        
    }).catch( err => {
        return next(err)
    })
})

module.exports = router