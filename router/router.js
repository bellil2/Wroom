
let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function(app){

// Main Routes
    app.get('/', ResultatController.ListerGrandPrixDate);
    app.get('/accueil', ResultatController.ListerGrandPrixDate);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/listePilote/:lettre', PiloteController.Liste);
    app.get('/detailsPilote/:num', PiloteController.Details);

 // circuits
   app.get('/circuits', CircuitController.ListerCircuit);
   app.get('/detailsCircuit/:num', CircuitController.Details);

// Ecuries
   app.get('/ecuries', EcurieController.ListerEcurie);
   app.get('/detailEcurie/:ecunum', EcurieController.DetailEcurie);

 //Résultats
   app.get('/resultats', ResultatController.ListerGrandPrix);
   app.get('/detailGrandPrix/:gpnum', ResultatController.DetailGrandPrix);

// tout le reste
app.get('*', HomeController.NotFound);
app.post('*', HomeController.NotFound);

};
