let modelCircuit = require('../models/circuit');
let modelPays = require('../models/pays');
let async = require('async');

module.exports.ListeCircuitAdmin = function (request, response) {
    response.title = "Gestion des circuits";
    modelCircuit.getListeCircuit(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeCircuits = result;
        response.render('adminListeCircuits', response);
    })
}

module.exports.FormulaireAjoutCircuit = function (request, response) {
    modelPays.getListePays(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.circuit = result;
        response.render('ajouterCircuit', response);
    })
}

module.exports.AjouterCircuitPost = function (request, response) {
    response.contenu = "Le circuit a bien été ajouté !"
    data = request.body;
    let file = request.files.CIRADRESSEIMAGE;

    modelCircuit.ajouterCircuit(data, file.name, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        file.mv("./public/image/circuit/" + file.name, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Upload');
            }
        });
        response.render('ajouterCircuitPost', response);
    })
}


module.exports.SupprimerCircuit = function (request, response) {
    let cirnum = request.params.cirnum;

    modelCircuit.supprimerCircuit(cirnum, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.contenu = "Le circuit à bien été supprimé";
        response.render('supprimerCircuitPost', response);
    })
}
