var express = require('express');
var app = express();
var model = require('./model/models');
var tenant = require('./controller/tenant');
var entity = require('./controller/entity');
var fields = require('./controller/fields');

app.use('/tenant',tenant);
app.use('/entity',entity);
app.use('/fields',fields);
app.listen(5000);

console.log('http://localhost:5000');