const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt-nodejs');
const settings = require('../config/settings');

//Create User Schema
const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});


/**
 * Function to encrypt password
 * 
*/
UserSchema.pre('save', function(next) {
    var user = this;
      // Check if document is new or a new password has been set
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err,salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function(err,hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    }
    else {
        return next();
    }
});

var User = mongoose.model('User',UserSchema);

function registration() {

}


/**
 * api to find user by email-id
 * 
 * @param username
 * @param callback
*/
registration.prototype.findByEmail = function(username,callback) {
    User.findOne({username: username},function(err,newuser) {
        if(newuser) {
            callback(null,newuser);
        }
        else {
            callback(err,null);
        }
    });
},

/**
 * api to create a new user
 * 
 * @param userData
 * @param callback
*/
registration.prototype.createUser = function(userData,callback) {
    if(userData.password === userData.confirmPassword) {
        var newUser = new User({
            'firstname': userData.firstname,
            'lastname': userData.lastname,
            'username': userData.username,
            'password': userData.password
        });

        newUser.save(function(err, result) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    } else {
        callback('Password does not match.', null);
    }
},

/**
 * api to login a user
 * 
 * @param loginDetails
 * @param userData
 * @param callback
*/
registration.prototype.login = function(loginDetails,userData, callback) {
    //check if password matches
    bcrypt.compare(loginDetails.password, userData.password, function(err, isMatch) {
        if(isMatch && !err) {
            //if user is found and password is right create a token
            var token = jwt.sign(userData.toJSON(), settings.secret);
            //return the information including token as JSON
            // callback(({success: true, user: userData, token: 'JWT ' + token}));
            callback(null,userData);
        }
        else {
            callback('Authentication failed, Wrong password.',null);
        }
    });
},

/**
 * api to send email
 * 
 * @param username
 * @param subject
 * @param text
 * @param callback
*/
registration.prototype.sendMail = function(username, subject, text, callback) {
    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sadesale94@gmail.com',
            pass: 'Sdesale25#' 
        }
    });
    var mailOptions = {
        to: username,
        from: 'sadesale94@gmail.com',
        subject: subject,
        text: text
    };
    smtpTransport.sendMail(mailOptions, function(err,result) {
        if(err) {
            callback(err,null);
        }
        else {
            result = true;
            callback(null,result);
        }
    });
},

/**
 * api to reset a password
 * 
 * @param userData
 * @param token
 * @param callback
*/
registration.prototype.resetPassword = function(userData, token, callback) {
    User.findOne({resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now()}}, function(err,result) {
        if(err) {
            callback(err,null);
        }
        else if(!result) {
            result = false;
            callback(null,result);
        }
        else {
            result.password = userData.password;
            result.resetPasswordToken = undefined;
            result.resetPasswordExpires = undefined; 

            result.save(function(err, user) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, user);
                }
            });
        }
    });
},

/**
 * api to display all registered users
 * 
 * @param callback
*/
registration.prototype.displayAllUsers = function(callback) {
    User.find(function(err,user) {
        if(err) {
            callback(err,null);
        }
        else {
            callback(null,user);
        }
    });
}

module.exports = new registration;

