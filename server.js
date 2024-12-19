//importing required modules
const express = require('express') //to build web servers and handle HTTP requests
const apiRoutes = require('./routes/api') //handle API requests


//create web application server
const app = express()

//to parse JSON requests makes the json data avaiable and essential for hanling post requests
app.use(express.json())

//use api routes for /api
app.use('/api', apiRoutes)

//404 error handler for undefined routes
app.use(function(req, res, next){
    res.status(400).send('Sorry, not found') //esponds with a 400 Bad Request
    //todo -- can not find a matching route
})

//for error handler 
app.use(function(err, req, res, next){
    console.log(err) 
    res.status(500).send('Server error')
})// its like important for catching unexpected issues and ensuring the server doesn't crash.


//start server running to 3000
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port', server.address().port)
})
