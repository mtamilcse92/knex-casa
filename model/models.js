var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookShelf = require('bookshelf')(knex);

bookShelf.knex.schema.hasTable('tenant').then(function(exists) {
            if (!exists) {
                bookShelf.knex.schema.createTable('tenant', function(table) {
                    table.increments('id');
                    table.string('tenant_name');
                }).createTable('entity', function(table) {
                    table.increments('id');
                    table.string('entity_name');
                    table.integer('tenant_id').unsigned().references('tenant.id').onDelete('CASCADE');
                }).createTable('fields', function(table) {
                    table.increments('id');
                    table.string('fields_name');
                    table.string('type');
                    table.integer('entity_id').unsigned().references('entity.id').onDelete('CASCADE');
                }).catch(function(e) {
                    console.error(e);
                });
            }
        });

 module.exports = bookShelf;
