
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviews', function(tbl) {
        tbl
            .increments()
            .notNullable();
        tbl
            .string('reviewText', 255)
            .notNullable();
        tbl
            .integer('restaurant_id')
            .unsigned()
            .references('id')
            .inTable('restaurants')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        tbl
            .integer('reviewer_id')
            .unsigned()
            .notNullable()
            .references('id').inTable('reviewers')
            .onDelete('CASCADE').onUpdate('CASCADE');
        tbl
            .integer('score')
            .notNullable();
        tbl
            .timestamps()
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviews');
};
