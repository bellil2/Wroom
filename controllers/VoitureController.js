let model = require('../models/ecurie.js');
var async = require('async');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerVoiture = function(request, response){
  let data = request.params.ecunum;

    model.getListeVoiture(data, function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeVoiture = result;
        //console.log(result);
        response.render('listerVoiture', response);
});
}
