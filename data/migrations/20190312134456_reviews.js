
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', function(tbl) {
        tbl
            .increments()
            .notNullable();
        tbl
            .string('reviewText')
            .notNullable();
        tbl
            .integer('restaurant_id')
            .unsigned()
            .references('id')
            .inTable('restaurants')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviews');
};
