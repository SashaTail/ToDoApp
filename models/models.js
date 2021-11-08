const sequelize = require('../db')
const {DataTypes}=require('sequelize')

const User =sequelize.define('user',{
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    username:{type: DataTypes.STRING,unique:true},
    password:{type: DataTypes.STRING}
})

const Todo =sequelize.define('todo',{
    id:{type:DataTypes.INTEGER, primaryKey: true, autoIncrement:true},
    title:{type: DataTypes.STRING},
    describe:{type: DataTypes.STRING},
    date:{type: DataTypes.DATE},
    completed:{type: DataTypes.BOOLEAN, defaultValue:false},
    userId:{type: DataTypes.INTEGER},
})





module.exports = {
    User , Todo
}