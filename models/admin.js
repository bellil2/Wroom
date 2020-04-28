let db = require('../configDb');

module.exports.connexion = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT LOGIN, PASSWD FROM login";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}