const userModel = require('./user')
const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize('test-sequelize', 'postgres', "Annalanh99@", {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 100,
        min: 0,
        idle: 10000
    }
})

let User = userModel(sequelize, Sequelize)

sequelize.sync({force: true}).then(() => {
    console.log('db connected')
})

module.exports = {
    User
}






