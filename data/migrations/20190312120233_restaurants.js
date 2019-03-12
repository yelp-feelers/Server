
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
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('restaurants');
};
