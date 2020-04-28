let db = require('../configDb');

module.exports.getListeVoiture = function (ecunum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT VOINOM, VOIADRESSEIMAGE, t.TYPELIBELLE from voiture v join type_voiture t on v.TYPNUM=t.TYPNUM where ECUNUM =" + ecunum;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
