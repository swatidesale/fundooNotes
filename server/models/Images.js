const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Image model schema
const ImageSchema = new Schema({
    image: {
        type:String
    },
    noteId: {
        type: String
    }
});

module.exports = Image = mongoose.model('Image',ImageSchema)