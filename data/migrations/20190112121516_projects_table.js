
exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", table => {
      table.increments();
      table.string("name", 280).notNullable();
      table.string("description", 550).notNullable();
      table.boolean("completed").defaultTo(false);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("projects");
};
