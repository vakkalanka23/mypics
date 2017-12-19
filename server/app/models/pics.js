var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var picModel = new Schema({
    galleryId: { type: Schema.Types.ObjectId},
    file: {fileName: String,
           originalName: String,
           dateUploaded : Date
          }
    
});

module.exports = Mongoose.model('MypicModel', picModel);