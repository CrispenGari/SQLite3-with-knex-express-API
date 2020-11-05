
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {student_name: 'Jonh',student_age: 17, student_surname: "Doe"},
        {student_name: 'Peter',student_age: 16, student_surname: "Mark"},
        {student_name: 'Sarah',student_age: 19, student_surname: "Julian"}
      ]);
    });
};
/*
  RUN
  $ npx knex seed:run

*/