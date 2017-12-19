var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
priorities = ['Low', 'Medium', 'High', 'Critical'];




var GalleryModel = new Schema({
      userId: { type: Schema.Types.ObjectId, required: true },
      gallery: { type: String, required: true },
      description: { type: String },
      file: {fileName: String,originalName: String,dateUploaded : Date}
 });



module.exports = Mongoose.model('galleryModel', GalleryModel);