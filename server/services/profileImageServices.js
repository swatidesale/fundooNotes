const multer = require('multer');
const path = require('path');

const ProfileImage = require('../models/ProfileImage');

/**
 * api to get all images
 * 
 * @param req
 * @param res
*/
exports.displayImage = function(req,res) {
    ProfileImage.find()
        .sort({ image: -1 })
        .then(image => {
            res.json(image)
        });
    // res.sendFile('/uploads/'); 
}

const storage = multer.diskStorage({
    destination: './images/uploads/',
    filename: function(req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profileimage');

/**
 * function to check type of image uploaded
 * 
 * @param file
 * @param cb
*/
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if(mimetype && extname) {
        return cb(null,true);
    } else {
        cb('Error: Images Only!');
    }
}

/**
 * api to add a image
 * 
 * @param req
 * @param res
*/
exports.addProfileImage = function(req,res) {
    console.log("Inside upload....");
    upload(req, res, (err) => {
        if(err) {
            console.log("First err", err);
            res.send({
                msg: err
            });
        }
        else if(req.file === undefined) {
            console.log("No file selected");
            res.send({
                msg: 'No File selected'
            });
        }
        else {
            console.log("File uploaded");
            const newProfileImage = new ProfileImage({
                profileimage: `${req.file.filename}`,
                userId: req.params.key
            });
            
            newProfileImage.save((err) => {
                if(err) {
                    console.log("Failed",err);
                    return res.json({success: false, msg: "Failed"});
                }
                res.send({success: true, msg: "Successful."});
            });
        }
    });
}
