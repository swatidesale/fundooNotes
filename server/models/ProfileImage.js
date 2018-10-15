const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileImageSchema = new Schema({
    profileimage: {
        type:String
    },
    userId: {
        type: String
    }
});

module.exports = ProfileImage = mongoose.model('ProfileImage',ProfileImageSchema)