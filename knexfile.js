
/*
    This file is initialised by the command
    $npx knex init
*/

// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './api/database.db3'
    }, 
    useNullAsDefault: true,
    seeds:{
      directory: './api/seeds'
    },
    migrations:{
      directory: './api/migrations'
    }
  },
 
};