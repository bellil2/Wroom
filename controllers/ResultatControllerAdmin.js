let model = require('../models/grandprix');
let modelPilote = require('../models/pilote');
let modelGp = require('../models/grandprix')

var async = require('async');


module.exports.SelectionGrandPrix = function(request, response){
  response.title = "Resultats";

    model.getListeGrandPrix(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.selectionGrandPrix = result;
        response.render('selectionnerResultat', response);
    })
}


module.exports.SaisieResultats = function(request, response){
  let data = request.params.gpnum;
  response.title = "Saisie des résultats";

    async.parallel([
       function (callback) {
          model.getDetailsGrandprix(data, function (err, result)  {
             callback(null, result);
          })
       },
       function (callback) {
          modelPilote.getListePiloteNotInGP(data, function (err, result) {
             callback(null, result);
          })
       },
       function (callback) {
          modelGp.getInfoGrandPrix(data, function (err, result) {
             callback(null, result);
          })
       }
    ],
       function (err, result) {
          if (err) {
             console.log(err);
             return;
          }
          response.DetailGrandPrix= result[0];
          response.listePilote = result[1];
          response.infosGp = result[2];
          response.render('saisieResultats', response);
       })
 };

module.exports.SupprimerLigneResultat = function(request, response){
  let data = request.params.gpnum;
  let data1 = request.params.pilnum;

    model.supprimerLigneResultat(data, data1, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.supprimerLigneResultat = result;
        response.render('supprimerLigneResultat', response);
    })
}

module.exports.AjouterLigneResultat = function(request, response){
  let data = request.body;
    model.ajouterLigneResultat(data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.ajouterLigneResultat = result;
        response.render('ajouterLigneResultat', response);
    })
}
