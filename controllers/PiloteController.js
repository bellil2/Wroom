let model = require('../models/pilote');
   async = require('async');
   ecurieModel = require('../models/ecurie.js');

// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S
module.exports.Repertoire = function (request, response) {
   response.title = 'Répertoire des pilotes';
   model.getLettresNom(function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      response.lettres = result;
      response.render('repertoirePilotes', response);
   });
};

module.exports.Liste = function (request, response) {
   let data = request.params.lettre;
   response.title = 'Répertoire des pilotes';
   async.parallel([
      function (callback) {
         model.getLettresNom(function (err, result) {callback(null, result);
         });
      },
      function (callback) {
         model.getListePilotes(data, function (err, result) {callback(null, result)
         });
      }
   ],
      function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.lettres = result[0];
         response.pilotes = result[1];
         response.render('listerPilotes', response);
      }
   );
}

module.exports.Details = function (request, response) {
   let numPilote = request.params.num;
   response.title = 'Répertoire des pilotes';
   async.parallel([
      function (callback) {
         model.getLettresNom(function (err, result) {
            callback(null, result);
         });
      },
      function (callback) {
         model.getDetailsPilote(numPilote, function (err, result) {
            callback(null, result);
         });
      },
      function (callback) {
         model.getSponsoPilote(numPilote, function (err, result) {
            callback(null, result);
         });
      },
      function (callback) {
         model.getPhotosPilote(numPilote, function (err, result) {
            callback(null, result);
         })
      }
   ],
      function (err, result) {
         if (err) {
            console.log(err);
            return;
         }
         response.lettres = result[0];
         response.detailsPilote = result[1][0];
         response.sponsoPilote = result[2];
         response.photosPilote = result[3];
         response.render('detailsPilote', response);
      }
   );
}
