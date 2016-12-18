var status = require('http-status');
var express = require('express');
var ObjectId = (require('mongoose').Types.ObjectId);

module.exports = function (wagner) {
    var api = express.Router();

    /**
     * Send user profile by login
     * */
    api.get('/users/:id', wagner.invoke(function (Profile) {
        return function (req, res) {
            Profile.findOne({login: req.params.id},
                handleOne.bind(null, 'profile', res)).populate('needs');
        }
    }));

    /**
     * Send all user needs
     * */
    api.get('/users/:login/needs', wagner.invoke(function (Need, Profile) {
        return function (req, res) {
            Profile.findOne({login: req.params.login}).populate('needs').exec(function (err, element) {
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

    api.post('/users/:login/needs', wagner.invoke(function (Profile, Need) {
        return function (req, res) {
            Need.create(
                req.body,
                function (err, createdNeed) {
                    if (err) return;

                    Profile.update(
                        {"login": req.params.login},
                        {$push: {"needs": createdNeed._id}},
                        {safe: true, upsert: true, new: true},
                        function (error, doc, result) {
                            console.log(result);
                            //return res.status(200).send("succesfully saved");
                        }
                    );

                    return res.status(200).send(createdNeed);
                }
            );
        }
    }));

    api.put('/users/:login/needs/:needId', wagner.invoke(function (Need) {
        return function (req, res) {
            Need.findOneAndUpdate(
                {"_id": new ObjectId(req.params.needId)},
                req.body,
                {upsert: true}
            ).exec(function (err, element) {
                if (err) return res.send(500, {error: err});
                return res.status(200).send(element);
            });
        }
    }));


    api.delete('/users/:login/needs/:needId', wagner.invoke(function (Profile, Need) {
        return function (req, res) {
            Need.remove(
                {"_id": req.params.needId},
                function (error, doc, deletedElement) {
                    if (error) return res.send(500, {error: error});

                    Profile.update(
                        {"login": req.params.login},
                        {$pop: {"needs": req.params.needId}},
                        {safe: true, upsert: true, new: true},
                        function (error, doc, model) {
                            return res.status(200).send("succesfully saved");
                        }
                    );

                });
        }
    }));


    api.get('/users/:login/tree/needs', wagner.invoke(function (Profile) {
        return function (req, res) {
            Profile.findOne(
                {login: req.params.login},
                'needs',
                handleOne.bind(null, 'children', res))
                .populate('needs');
        }
    }));
    /**
     * Send all charges for concrete need
     * */
    api.get('/users/:login/needs/:needId/charges', wagner.invoke(function (Need) {
        return function (req, res) {
            Need.findOne({"_id": new ObjectId(req.params.needId)})
                .populate('charges').exec(function (err, element) {
                if (err) {
                    return next(err);
                }
                else if (element) {
                    console.log('Result of /users/:login/needs/:id/charges :' + element);
                    return res.send(element);
                }
                else {
                    return res.status(404).send({message: "No element found"});
                }
            });
        }
    }));

    api.get('/users/:login/charges/export', wagner.invoke(function (Charge) {
        return function (req, res) {
            res.writeHead(200, {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename=charges.csv'
            });
            // pipe file using mongoose-csv
            Charge.find({},{'_id': 0, 'username':0}).csv(res);
        }
    }));

    api.put('/users/:login/needs/:needId/charges/:chargeId', wagner.invoke(function (Charge) {
        return function (req, res) {
            Charge.findOneAndUpdate(
                {"_id": new ObjectId(req.params.chargeId)},
                req.body,
                {upsert: true}
            ).exec(function (err, element) {
                if (err) return res.send(500, {error: err});
                return res.status(200).send(element);
            });
        }
    }));

    api.delete('/users/:login/needs/:needId/charges/:chargeId', wagner.invoke(function (Charge, Need) {
        return function (req, res) {
            Charge.remove(
                {"_id": req.params.chargeId},
                function (error, doc, deletedElement) {
                    if (error) return res.send(500, {error: error});

                    Need.findByIdAndUpdate(
                        {"_id": new ObjectId(req.params.needId)},
                        {$pop: {"charges": req.params.chargeId}},
                        {safe: true, upsert: true, new: true},
                        function (error, doc, model) {
                            return res.status(200).send("succesfully saved");
                        }
                    );

                });
        }
    }));

    api.post('/users/:login/needs/:needId/charges', wagner.invoke(function (Charge, Need) {
        return function (req, res) {
            Charge.create(
                req.body,
                function (err, createCharge) {
                    if (err) return;

                    Need.findByIdAndUpdate(
                        {"_id": new ObjectId(req.params.needId)},
                        {$push: {"charges": createCharge._id}},
                        {safe: true, upsert: true, new: true},
                        function (error, doc, result) {
                            //return res.status(200).send("succesfully saved");
                        }
                    );

                    return res.status(200).send(createCharge);
                }
            );
        }
    }));

    api.get('/users/:login/statistics/piechart', wagner.invoke(function (Charge) {
        return function (req, res) {
            Charge
                .aggregate([{$match: {username: "ysabynin"}}, {"$group": {_id: "$needName", sum: {$sum: "$sum"}}}])
                .exec(function (err, element) {
                    if (err) {
                        return next(err);
                    }
                    else if (element) {
                        console.log('Result of /users/:login/statistics/piechart :' + element);
                        return res.send(element);
                    }
                    else {
                        return res.status(404).send({message: "No element found"});
                    }
                });
        }
    }));

    api.get('/users/:login/statistics/columnchart', wagner.invoke(function (Charge) {
        return function (req, res) {
            Charge.aggregate([
                {$match: {username: "ysabynin"}},
                {
                    $project: {
                        date: 1,
                        year: {$year: "$date"},
                        month: {$month: "$date"},
                        sum: 1,
                        needName: 1
                    }
                },
                {
                    $group: {
                        _id: {year: "$year", month: "$month", needName: "$needName"},
                        'total': {$sum: "$sum"}
                    }
                },
                {
                    $group: {
                        _id: {year: "$_id.year", month: "$_id.month"},
                        "children": {$push: {"needName": "$_id.needName", "sum": {$sum: "$total"}}}
                    }
                }

            ]).exec(function (err, element) {
                if (err) {
                    return next(err);
                }
                else if (element) {
                    console.log('Result of /users/:login/statistics/linechart :' + element);
                    return res.send(element);
                }
                else {
                    return res.status(404).send({message: "No element found"});
                }
            });
        }
    }));

    function handleOne(property, res, error, result) {
        if (error) {
            return res.status(status.INTERNAL_SERVER_ERROR)
                .json({error: error.toString()});
        }
        if (!result) {
            return res.status(status.NOT_FOUND)
                .json({error: 'Not found'});
        }

        var json = {};
        json[property] = result;
        res.json(json);
    }


    return api;
};