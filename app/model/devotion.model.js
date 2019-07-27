const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var devotionSchema = new Schema({
  title: String,
  author: String,
  body: String,
  published: String
});

// change _id to id

devotionSchema.method('toClient', function(){
   var obj = this.toObject();

   // Rename fields
    obj.id = obj._id;
    delete obj._id;

     return obj;
});


module.exports = mongoose.model('Devotion', devotionSchema);
