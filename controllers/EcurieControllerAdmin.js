let model = require('../models/ecurie');
let modelPays = require('../models/pays');
let async = require('async');


module.exports.ListeEcuriesAdmin = function (request, response) {
    response.title = "Gestion des écuries";
    model.getListeEcurie(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        response.render('adminListeEcuries', response);
    })
}

module.exports.FormulaireAjoutEcurie = function (request, response) {
    modelPays.getListePays(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pays = result;
        response.render('ajouterEcurie', response);
    })
}

module.exports.SupprimerEcurie = function (request, response) {
  let data = request.params.ecunum;
   model.supprimerEcurie(data, function (err, result) {
      if (err) {
         console.log(err);
         return;
      }
      response.supprimerEcurie = result;
      response.render('supprimerEcurie', response);
   });
};

module.exports.AjouterEcuriePost = function (request, response) {
   let data = request.body;
   console.log(data);
   let file = request.files.ECUADRESSEIMAGE;


   model.ajouterEcurie(data,file.name, function (err, result) {
       if (err) {
           console.log(err);
           return;
       }
       file.mv("./public/image/ecurie/" + file.name, function (err, result) {
         if (err) {
           console.log(err);
         } else {
           console.log('Upload');
         }
       });
       response.render('ajouterEcuriePost', response);
   })
 };
