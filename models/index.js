const { Sequelize, DataTypes } = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student.js')

//look for an enviroment variable will be called NODE_ENV  and read its value
//envi roment variables are set for your whole computer (or for a server)
//any application running in this computer (or server) can read these enviroment variable
//at azzure, we'll create an eniroment varibale for your server called NODE_ENV and set it to "production"
//if there is no NODE_ENV set, like in your cpmputer, we'll use the value 'development'
const env = process.env.NODE_ENV || 'development'

const dbPassword = process.env.DB_PASSWORD

const config = configJson[env]
//read the db configuration object for 'developement' or 'production'
config.password = dbPassword

const sequelize = new Sequelize(config)

const database = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name //'student'
database[studentModelName] = studentModel

module.exports = database