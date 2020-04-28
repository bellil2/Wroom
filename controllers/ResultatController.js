let model = require('../models/grandprix');
var async = require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerGrandPrix = function(request, response){
    model.getListeGrandPrix(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeGrandPrix = result;
        response.render('listerResultat', response);
    })
}

module.exports.ListerGrandPrixDate = function(request, response){
    model.getListeGrandPrixDate(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeGrandPrixDate = result[0];
        response.render('home', response);
    })
}


module.exports.DetailGrandPrix= function (request, response) {
    let data = request.params.gpnum;

    async.parallel([
        function (callback) {
            model.getListeGrandPrix(function (err, result) {
                callback(null, result);
            })
        },
        function (callback) {
            model.getDetailsGrandprix(data, function (err, result) {
                callback(null, result);
            });
        },
        function (callback) {
            model.getInfoGrandPrix(data, function (err, result) {
                callback(null, result);
            });
        }
    ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeGrandPrix = result[0];
            response.DetailGrandPrix = result[1];
            response.infoGrandPrix = result[2][0];
            response.render('DetailGrandPrix', response);
        }
    );
}
