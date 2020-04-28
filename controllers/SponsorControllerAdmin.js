let model = require('../models/sponsor');
let modelEcurie = require('../models/ecurie');

var async = require('async');


module.exports.ListeSponsor = function(request, response){
  response.title = "Gestion des Sponsors";

    model.getListeSponsor(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeSponsor = result;
        response.render('adminListeSponsors', response);
    })
}

module.exports.FormulaireAjoutSponsor = function(request, response){
  response.title = "Ajouter des Sponsors";

    modelEcurie.getAllEcuries(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        response.render('ajouterSponsor', response);
    })
}

module.exports.AjouterSponsor = function(request, response){
  let data = request.body.SPONOM;
  let data1 = request.body.SPOSECTACTIVITE;
  let data2 = request.body.ECUNUM;

    model.ajouterSponsor(data, data1,data2, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.ajouterSponsorPost = result;
        response.render('ajouterSponsorPost', response);
    })
}

module.exports.SupprimerSponsor = function(request, response){
  let data = request.params.sponum;

    model.supprimerSponsor(data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.supprimerSponsor = result;
        response.render('supprimerSponsor', response);
    })
}

module.exports.FormulaireModifSponsor = function (request, response) {
    let sponum = request.params.sponum;
    console.log(sponum);

    async.parallel([
        function (callback) {
            modelEcurie.getAllEcuries(function (err, result) {
                callback(null, result);
            })
        },
        function (callback) {
            model.getDetailsSponsor(sponum, function (err, result) {
                callback(null, result);
            });
        }
    ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.sponum = sponum;
            response.listeEcurie = result[0];
            response.donneesSponsor = result[1][0];
            console.log(result[1][0]);
            response.render('modifierSponsor', response);
        })
}

module.exports.ModifierSponsorPost = function (request, response) {
    response.contenu = "Le Sponsor a bien été modifié";
    let sponum = request.params.sponum;
    let data = request.body;

    model.modifierSponsor(sponum, data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.render('modifierSponsorPost', response);
    })
}
