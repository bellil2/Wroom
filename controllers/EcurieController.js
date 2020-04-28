let model = require('../models/ecurie.js');
let modelVoiture = require('../models/voiture.js');
let modelPilote = require('../models/pilote.js');
var async = require('async');


   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        //console.log(result);
response.render('listerEcurie', response);
});
}

module.exports.DetailEcurie = function(request, response){
  let data = request.params.ecunum;

  async.parallel([
     function (callback) {
        model.getListeEcurie(function (err, result) {
           callback(null, result);
        })
     },
     function (callback) {
        model.getDetailEcurie(data, function (err, result) {
           callback(null, result)
        })
     },
     function (callback) {
        modelVoiture.getListeVoiture(data, function (err, result) {
           callback(null, result);
        })
     },
     function (callback) {
        modelPilote.getListePilotesEcurie(data, function (err, result) {
           callback(null, result);
        })
     }
  ],
     function (err, result) {
        if (err) {
           console.log(err);
           return;
        }
        response.listeEcurie = result[0];
        response.detailEcurie = result[1][0];
        response.listeVoiture = result[2];
        response.listePilotesEcurie = result[3];
        response.render('detailEcurie', response);
});
}
