// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');


  router.use('/doc', function(req, res, next) {
    res.end(`Documentation http://expressjs.com/`);
  });

  router.get('/file', function(req, res, next) {
    const File = mongoose.model('File');
    
    File.find({deleted: {$ne: true}}, function(err, files) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  
      res.json(files);
    });
  });

  router.get('/file/:fileId', function(req, res, next) {
    const {fileId} = req.params;
    // same as 'const fileId = req.params.fileId'
  
    const file = FILES.find(entry => entry.id === fileId);
    if (!file) {
      return res.status(404).end(`Could not find file '${fileId}'`);
    }
  
    res.json(file);
  });
  
  router.post('/file', function(req, res, next) {
    const File = mongoose.model('File');
    const fileData = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      rating: req.body.rating
    };
  
    File.create(fileData, function(err, newFile) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }
  
      res.json(newFile);
    });
  });

  router.put('/file/:fileId', function(req, res, next) {
    const File = mongoose.model('File');
    const fileId = req.params.fileId;
    
    File.findById(fileId, function(err, file) {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      if (!file) {
        return res.status(404).json({message: "File not found"});
      }
    
      file.image = req.body.image;
      file.title = req.body.title;
      file.description = req.body.description;
      file.rating = req.body.rating;
    
      file.save(function(err, savedFile) {
        if (err) {
          console.error(err);
          return res.status(500).json(err);
        }
        res.json(savedFile);
      })
    
    })
    });
  
    router.delete('/file/:fileId', function(req, res, next) {
      const File = mongoose.model('File');
      const fileId = req.params.fileId;
    
      File.findById(fileId, function(err, file) {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        }
        if (!file) {
          return res.status(404).json({message: "File not found"});
        }
    
        file.deleted = true;
    
        file.save(function(err, doomedFile) {
          res.json(doomedFile);
        })
    
      })
    });
  
  module.exports = router;