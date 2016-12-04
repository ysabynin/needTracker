var status = require('http-status');
var express = require('express');
var ObjectId = (require('mongoose').Types.ObjectId);

module.exports = function(wagner) {
    var api = express.Router();

    /**
     * Send user profile by login
     * */
    api.get('/users/:id', wagner.invoke(function(Profile){
        return function(req, res){
            var profile = Profile.findOne({login: req.params.id},
                handleOne.bind(null,'profile',res));
        }
    }));

    /**
     * Send all user needs
     * */
    api.get('/users/:login/needs', wagner.invoke(function(Need, Profile){
        return function(req, res){
            Profile.findOne({login: req.params.login}).populate('needs').exec(function(err, element){
                if(err){
                    return next(err);
                }
                else if(element){
                    return res.send(element.needs);
                }
                else{
                    return res.status(404).send({message: "No element found"});
                }});
        }
    }));


    api.get('/users/:login/tree/needs', wagner.invoke(function (Profile, Need) {
        return function (req, res) {
            Profile.find({login: req.params.login})
                .deepPopulate('needs.charges')
                .exec(function (err, element) {
                    console.log(element);
                    if (err) {
                        return next(err);
                    }
                    else if (element) {
                        return res.send(element.needs);
                    }
                    else {
                        return res.status(404).send({message: "No element found"});
                    }
                });
        }
    }));
    /**
     * Send all charges for concrete need
     * */
    api.get('/users/:login/needs/:needId/charges', wagner.invoke(function(Need){
        return function(req, res){
            Need.findOne({"_id": new ObjectId(req.params.needId)}).populate('charges').exec(function(err, element){
                if(err){
                    return next(err);
                }
                else if(element){
                    console.log('Result of /users/:login/needs/:id/charges :' + element);
                    return res.send(element['charges']);
                }
                else{
                    return res.status(404).send({message: "No element found"});
                }});
        }
    }));

    function handleOne(property, res, error, result) {
        if (error) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                .json({error: error.toString()});
        }
        if(!result){
            return res.status(status.NOT_FOUND)
                .json({error: 'Not found'});
        }

        var json = {};
        json[property] = result;
        res.json(json);
    }


    return api;
};