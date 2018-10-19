const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Profile image model schema
const ProfileImageSchema = new Schema({
    profileimage: {
        type:String
    },
    userId: {
        type: String
    }
});

module.exports = ProfileImage = mongoose.model('ProfileImage',ProfileImageSchema)