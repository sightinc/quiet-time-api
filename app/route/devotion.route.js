module.exports = function(app){
  const devotion = require('../controller/devotion.controller.js');

  // create a new devotion
  app.post('/api/devotion',devotion.create);

  // Retrieve all devotions
  app.get('/api/devotion',devotion.findAll);

  // Rerieve a single Devotion
  app.get('/api/devotion/:devotionId',devotion.findOne);

  // Update a devotion with Id
  app.put('/api/devotion/:devotionId', devotion.update);

  // Delete a devotion eith Id
  app.delete('/api/devotion/:devotionId', devotion.delete);
}
