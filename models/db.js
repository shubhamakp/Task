const Sequelize = require('sequelize')

const sequelize = new Sequelize('practice' , 'root','mypass',{

    host : 'localhost',
    dialect: 'mysql'
})

const items = sequelize.define('items',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    category :{
        type:Sequelize.STRING,
        allowNull:false
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    price:{
        type : Sequelize.INTEGER,
        allowNull:false
    },
    time : {
        type: Sequelize.DATE,
        allowNull : false
    },
})

module.exports = items