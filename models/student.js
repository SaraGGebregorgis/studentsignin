module.exports = (Sequelize, DataTypes) => {
    //define the model
    const Student = Sequelize.define('Student', {
        //define the columns in the database - give them a namr and a type
    name: {
        type: DataTypes.STRING, //datatype 
        allowNull: false, //ca n not be null
        validate: {
            notEmpty: false //to make sure name is not empty
        }
    },
    starID: {
        type: DataTypes.STRING,
        allowNull: false, //cant be null
        unique: true, //must be uniqque
        //todo future = check for aa1234aa
        validate: {
            notEmpty: false // Ensure that the starID is not empty
        }
    },

    //whether the student is present or not
    present: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false //default value is false
    }
})

        //  create or update tbale in the database
        Student.sync( { force: false} ).then( () => {
            console.log('Synced student table')
        })

        return Student
} 