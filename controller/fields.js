var express = require('express');
var router = express.Router();
var connection = require('../database/connections');
var knex = require('knex')(connection.connection);
var bookShelf = require('bookshelf')(knex);
var Fields = bookShelf.Model.extend({
    tableName: 'fields',
    entity: function() {
        return this.belongsTo(Entity);
    }
});

router.post('/', function(req, res) {
    var name = req.param('name');
    var types = req.param('types');
    var id = req.param('id');
    new Fields({ fields_name: name, type:types,entity_id:id })
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
    Fields.where({ id: id }).fetch().then(function(model) {
        console.log(model.toJSON());
        res.json(model.toJSON());
    }).catch(function(err) {
        res.send(err);
    });
});

router.put('/:id', function(req, res) {
    var id = req.param('id');
    new Fields({ id: id }).save({
        name: 'updated Fields'
    }).then(function(station) {
        res.json(station.toJSON());
    }).catch(function(err) {
        res.send(err);
    });
});

router.delete('/:id', function(req, res) {
	var id = req.param('id');
    Fields.where({ id: id }).destroy()
        .then(function(model) {
            res.json("deleted");
        }).catch(function(err) {
            res.send(err);
        });

});
module.exports = router
