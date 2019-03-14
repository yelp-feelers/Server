exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviewers', function(tbl) {
        tbl
            .increments()
            .notNullable();
        tbl
            .string('username', 156)  
            .unique()
            .notNullable();
        tbl
            .string('hash', 255)
            .notNullable();
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('reviewers');
};
