
exports.up = function(knex, Promise) {
    return knex.schema.createTable('restaurants', function(tbl){
        tbl
            .increments()
            .notNullable();
        tbl
            .string('name', 255)
            .notNullable();
        tbl
            .string('description')
            .notNullable();
        tbl
            .integer('true_score')
            .notNullable();
        tbl
            .integer('adju_score')
            .notNullable();
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('restaurants');
};
