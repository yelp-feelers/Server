
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', function(tbl) {
        tbl
            .increments()
            .notNullable();
        tbl
            .string('reviewText')
            .notNullable();
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviews');
};
