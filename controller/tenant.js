var express = require('express');
var router = express.Router();
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
    fields: function() {
        return this.hasMany(Fields);
    }
});

router.post('/', function(req, res) {
    var name = req.param('name');
    new Tenant({ tenant_name: name })
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
    Tenant.where({ id: id }).fetch({withRelated:'entity'}).then(function(model) {
        console.log(model.toJSON());
        res.json(model.toJSON());
    }).catch(function(err) {
        res.send(err);
    });


    // knex('tenant')
    //     .join('entity', 'tenant.id', '=', 'entity.tenant_id')
    //     .select('tenant.id', 'entity.entity_name').then(function(model) {
    //         console.log(model);
    //         res.json(model);
    //     }).catch(function(err) {
    //         res.send(err);
    //     });

    // knex.select('*').from('entity').join('tenant', function() {
    //     this.on('tenant.id', '=', 'entity.tenant_id')
    // }).then(function(model) {
    //     console.log(model);
    //     res.json(model);
    // }).catch(function(err) {
    //     res.send(err);
    // });

});

router.put('/:id', function(req, res) {
    var id = req.param('id');
    new Tenant({ id: id }).save({
        name: 'updated tenant'
    }).then(function(station) {
        res.json(station.toJSON());
    }).catch(function(err) {
        res.send(err);
    });
});

router.delete('/:id', function(req, res) {
    var id = req.param('id');
    Tenant.where({ id: id }).destroy()
        .then(function(model) {
            res.json("deleted");
        }).catch(function(err) {
            res.send(err);
        });

});
module.exports = router;
