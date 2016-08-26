var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookShelf = require('bookshelf')(knex);

var Tenant = bookShelf.Model.extend({
    tableName: 'tenant',
    entity: function() {
        return this.hasMany(Entity);
    }
});

var Entity = bookShelf.Model.extend({
    tableName: 'entity',
    tenant: function() {
        return this.belongsTo(Tenant);
    },
    fields: function(){
    	return this.hasMany(Fields);
    }
});

var Fields = bookShelf.Model.extend({
    tableName: 'fields',
    entity: function() {
        return this.belongsTo(Entity);
    }
});
module.exports = Tenant;
module.exports = Entity;
module.exports = Fields;