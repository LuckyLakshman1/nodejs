const dbConfig = require('../configuration/config.js');

const mongoose = require("mongoose");
mongoose.promise = global.promise;
 const db = {}
 db.mongoose= mongoose;
 db.url= dbConfig.url;
 db.products = require("./product.model.js")(mongoose);



 module.exports =db;
  