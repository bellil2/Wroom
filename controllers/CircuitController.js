model = require('../models/circuit');
async = require('async');
// ////////////////////// L I S T E R     C I R C U I T S

module.exports.ListerCircuit = function(request, response){
    response.title = 'Liste des circuits';
    model.getListeCircuit(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeCircuit = result;

        response.render('listerCircuit', response);
    })
}

module.exports.Details = function (request, response) {
    response.title = 'Détail du circuit';
    let data = request.params.num;

    async.parallel([
        function (callback) {
            model.getListeCircuit(function (err, result) {callback(null, result); // result[0] Liste
            })
        },
        function (callback) {
            model.getDetailCircuit(data, function (err, result) {callback(null, result); // result[1] Circuit
   });
        }
    ],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeCircuit = result[0];
            response.detailsCircuit = result[1][0]; 
            response.render('detailsCircuit', response);
        }
    );

}