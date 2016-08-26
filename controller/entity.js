var express = require('express');
var router = express.Router();
var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookShelf = require('bookshelf')(knex);
var Entity = bookShelf.Model.extend({
    tableName: 'entity',
    Entity: function() {
        return this.belongsTo(Tenant);
    },
    fields: function() {
        return this.hasMany(Fields);
    }
});

var Fields = bookShelf.Model.extend({
    tableName: 'fields',
    entity: function() {
        return this.belongsTo(Entity);
    }
});

router.post('/', function(req, res) {
    var name = req.param('name');
    var tenantId = req.param("tenantId");
    new Entity({ entity_name: name, tenant_id: tenantId })
        .save().then(function(model) {
            console.log("inserted");
            res.json(model.toJSON());
        }).catch(function(err) {
            res.send(err);
        });
});


router.get('/:id', function(req, res) {
     var id = req.param('id');
    console.log(id);
    Entity.where({ id: id }).fetch({withRelated:'fields'}).then(function(model) {
        console.log(model.toJSON());
        res.json(model.toJSON());
    }).catch(function(err) {
        res.send(err);
    });
});

router.put('/:id', function(req, res) {
	console.log("update");
    var id = req.param('id');
    var name = req.param('name');
    var tenantId = req.param("tenantId");
    new Entity({ id: id }).save({
       name: name, tenant_id: tenantId
    }).then(function(station) {
        res.json(station.toJSON());
    }).catch(function(err) {
        res.send(err);
    });
});

router.delete('/:id', function(req, res) {
	var id = req.param('id');
    Entity.where({ id: id }).destroy()
        .then(function(model) {
            res.json("deleted");
        }).catch(function(err) {
            res.send(err);
        });

});
module.exports = router
