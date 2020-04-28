modelAdmin = require('../models/admin');
let Cryptr = require('cryptr');

//////////////////////////////////////////////// A C C U E I L
module.exports.Index = function(request, response){
    if (request.session.isConnected != true) {
        request.session.isConnected = false;
        response.title = "Partie administration"
        response.render('home', response);
    }
    else{
        response.title = "Bienvenue sur la partie administration du site WROOM";
        response.render('accueil', response);
    }
};

module.exports.Accueil = function (request, response) {
    response.title = "Bienvenue sur la partie administration du site WROOM";
    response.render('accueil', response);
};

module.exports.Connexion = function (request, response) {
    response.title = "Bienvenue sur la partie administration du site WROOM";

    //traitement connexion
    let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');

    modelAdmin.connexion(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }

        let decryptMdp = cryptr.decrypt(result[0].PASSWD);

        if (request.body.mdp == decryptMdp && request.body.login == result[0].LOGIN) {
            request.session.isConnected = true;
            response.render('accueil', response);
        }
        else{
            response.render('home', response);
        }
    })
};

module.exports.NotFound = function(request, response){
    response.title = "Bienvenue sur le site de SIXVOIX (IUT du Limousin).";
    response.render('notFound', response);
};