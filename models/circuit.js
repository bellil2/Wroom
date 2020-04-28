let db = require("../configDb");
let modelgrandPrix = require('../models/grandprix');

module.exports.getListeCircuit = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT CIRNUM, CIRNOM, PAYADRDRAP, CIRLONGUEUR, CIRNBSPECTATEURS FROM circuit c JOIN pays p ON c.PAYNUM=p.PAYNUM ORDER BY CIRNOM" ;
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}

module.exports.getDetailCircuit = function (cirnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT CIRNOM, CIRLONGUEUR, CIRNBSPECTATEURS, CIRADRESSEIMAGE, CIRTEXT, PAYNOM "
            +"FROM circuit c JOIN pays p ON c.PAYNUM=p.PAYNUM WHERE CIRNUM="+cirnum;
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}

module.exports.ajouterCircuit = function (data, fileName, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            connexion.query('INSERT INTO circuit SET CIRADRESSEIMAGE = \'' + fileName + '\' ,?', data, callback);
            connexion.release();
        }
    })
}

module.exports.supprimerCircuit = function (cirnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            connexion.query('DELETE FROM course WHERE GPNUM = (SELECT GPNUM FROM grandprix WHERE CIRNUM = '+ cirnum+')');
            connexion.query('DELETE FROM grandprix WHERE CIRNUM = ' + cirnum);
            connexion.query('DELETE FROM circuit WHERE CIRNUM = ' + cirnum, callback);
            connexion.release();
        }
    })
}
