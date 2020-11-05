const  knex =require('knex') 
const  config =require('../knexfile.js') 
// database configuration
const database = knex(config.development)

module.exports=  database
/*
    MAKING MIGRATIONS FOR THE DATABASE
    * $npx knex migrate:make migration_name

*/