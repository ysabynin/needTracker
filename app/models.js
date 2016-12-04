var mongoose = require('mongoose');

module.exports = function (wagner) {
    var Charge = mongoose.model('Charge', require('./models/Charge'), 'charges');
    var Need = mongoose.model('Need', require('./models/Need'), 'needs');
    var Profile = mongoose.model('Profile', require('./models/Profile'), 'profiles');

    var models = {
        Charge: Charge,
        Need: Need,
        Profile: Profile
    };

    wagner.factory('Charge', function () {
        return Charge;
    });

    wagner.factory('Need', function () {
        return Need;
    });

    wagner.factory('Profile', function () {
        return Profile;
    });

};
