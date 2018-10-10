const labelServices = require('../services/labelServices');

/** 
 * Function to create a new label
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.createNewLabel = function(req,res) {
    var labelData = req.body;
    labelServices.createLabel(labelData, function(err, label) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json({data: label});
        }
    });
},

/**
 * Function to display all labels
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.displayLabels = function(req,res) {
    labelServices.displayAllLabels(function(err, label) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json(label);
        }
    });
},

/**
 * Function to update a label
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.updateLabel = function(req, res) {
    labelServices.updateLabel(req.params.id, req.body, function(err, label) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json({data: label});
        }
    });
},

/**
 * Function to delete a label
 * 
 * @param {Object} req
 * @param {Object} res
*/
exports.deleteLabel = function(req,res) {
    labelServices.deleteLabel(req.params.id, req.body, function(err, label) {
        if(err) {
            res.json({err: err});
        }
        else {
            res.json({data: label});
        }
    });
}