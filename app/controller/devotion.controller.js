const Devotion = require('../model/devotion.model.js');

// POST a devotion
exports.create = (req, res) => {
  // Create a devotion
  const devotion = new Devotion({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    published: req.body.published
  });

  devotion.save()
  .then(devotion => {
    res.send(devotion.toClient())
  }).catch(err =>{
    res.status(500).send({
      message: err.message
    });
  });
};

// FETCH all
exports.findAll = (req, res) =>{
  Devotion.find()
  .then(devotions => {
    let returnedDevotions = [];

    for(let i = 0; i < devotions.length; i++) {
      returnedDevotions.push(devotions[i].toClient())
    }

    res.send(returnedDevotions);
  }).catch(err => {
    res.status(500).send({
      message: err.message
    });
  });
};

//FIND a devotion
exports.findOne = (req, res) => {
  Devotion.findById(req.params.devotionId)
  .then(devotion => {
    if(!devotion) {
      return res.status(404).send({
        message: "Devotion not found with id " + req.params.devotionId
      });
    }
    res.send(devotion.toClient());
  }).catch(err => {
   if(err.kind === 'ObjectId') {
	   return res.status(404).send({
            message: "Devotion not found with id " + req.params.devotionId
	   });
   }
    return res.status(500).send({
      message: "Error retrieving devotion with id " + req.params.devotionId
    });
  });
};

// UPDATE  a devotion
exports.update = (req,res) => {
  // Find Devotion and update
  Devotion.findOneAndUpdate({_id: req.params.devotionId}, {
    title: req.body.title,
    author:req.body.author,
    body: req.body.body,
    published: req.body.published
  }, {new: true})
  .then(devotion => {
    if(!devotion) {
      return res.status(404).send({
        message: "Devotion not found with id " + req.params.devotionId
      });
    }
    res.send(devotion.toClient());

  }).catch(err=> {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message:"Devotion not found with id " + req.params.devotionId
      });
    }
    return res.status(500).send({
      message: "Error updating devotion with id " + req.params.bookId
    });
  });
};

// DELETE a devotion
exports.delete = (req,res) => {
  Devotion.findByIdAndRemove(req.params.devotionId)
  .then(devotion => {
    if(!devotion) {
    return res.status(404).send({
      message: "Devotion not found with id " + req.params.devotionId
    });
   }
   res.send({ message: "Devotion deleted successfully!"});
 }).catch(err => {
   if(err.kind === 'ObjectId' || err.name === 'NotFound') {
     return res.status(404).ssend({
       message:"Devotion not found with id " + req.params.devotionId
     });
   }
   return res.status(500).send({
     message:"Devotion not found with id " + req.params.devotionId
   });
 });
};
