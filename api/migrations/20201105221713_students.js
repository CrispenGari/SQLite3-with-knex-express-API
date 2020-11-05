
exports.up = async (knex)=> {
    await knex.schema.createTable("students", table=>{
      table.increments();
      table.text("student_name",256).notNullable();
      table.text("student_surname",256).notNullable();
      table.integer("student_age").notNullable();
  })
};

exports.down =async(knex)=> {
    await knex.schema.dropTableIfExist("students")
};
