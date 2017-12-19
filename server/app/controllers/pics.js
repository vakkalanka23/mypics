var express = require('express'),
router = express.Router(),
logger = require('../../config/logger'),


passportService = require('../../config/passport'),
passport = require('passport'),


multer = require('multer'),
mkdirp = require('mkdirp'),

mongoose = require('mongoose');
var pic = mongoose.model('MypicModel');
  
var requireLogin = passport.authenticate('local', { session: false });
var requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function (app, config) {
app.use('/api', router);

router.route('/pics').get(function(req, res, next){
    logger.log('Get all the pics', 'verbose');
});


var storage = multer.diskStorage({
destination: function (req, file, cb) {      
      var path = config.uploads+ "/" + req.params.galleryId + "/";
    mkdirp(path, function(err) {
        if(err){
            res.status(500).json(err);
        } else {
            cb(null, path);
        }
    });
},


filename: function (req, file, cb) {
    let fileName = file.originalname.split('.');   
    cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
}
});




router.post('/pics', function (req, res, next) {
    console.log('Create pic', 'verbose');
    var newpic = new pic(req.body);
    newpic.save()
    .then(result => {
        res.status(201).json(result);
    })
    .catch(err => {
       return next(err);
    });
  })


router.get('/getpics', function (req, res, next) {
    console.log('Get a pic', 'verbose');
    var query = pic.find()
      .sort(req.query.order)
      .exec()
      .then(result => {
           if(result && result.length) {
          res.status(200).json(result);
      } else {
          res.status(404).json({message: "No pics available"});
      }
      })
      .catch(err => {
        return next(err);
      });
  });


  router.get('/pics/gallery/:galleryId', function (req, res, next) {
    console.log('Get pics by galleryId - New GET METHOD', 'verbose');
    //console.log("-----------HERE------------"+req.params.galleryId);
    pic.find({galleryId: req.params.galleryId})
                     .then(pic => {
                         if(pic){
                             res.status(200).json(pic);
                         } else {
                             res.status(404).json({message: "No pic found"});
                         }
                     })
                     .catch(error => {
                         return next(error);
                     });
    
  })

  
router.put('/pics/:picId', requireAuth, function(req, res, next){
         console.log('Update pic', + req.params.picId,  'verbose');
             pic.findOneAndUpdate({_id: req.params.picId}, req.body, {new:true, multi:false})
                 .then(pic => {
                     res.status(200).json(pic);
                 })
                 .catch(error => {
                     return next(error);
                 });
         }); 

    
router.delete('/pics/:picId', function(req, res, next){
console.log('Delete pic by picId ' + req.params.picId, 'verbose');
pic.remove({ _id: req.params.picId })
    .then(pic => {
        res.status(200).json({msg: 'pics for given user Deleted'});
    })
    .catch(error => {
        return next(error);
    });
});


var upload = multer({ storage: storage });
router.post('/pics/upload/:galleryId/:picId', upload.any(), function(req, res, next){
logger.log('Upload file for ' + req.params.galleryId + ' and ' + req.params.picId, 'verbose');

pic.findById(req.params.picId, function(err, pic){
    if(err){ 
        return next(err);
    } else {     
        if(req.files){
pic.file = {
                fileName : req.files[0].filename,
                originalName : req.files[0].originalname,
                dateUploaded : new Date()
            };
        }           
pic.save()
            .then(pic => {
                res.status(200).json(pic);
            })
            .catch(error => {
                return next(error);
            });
    }
});
}
);



};