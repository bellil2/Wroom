let db = require('../configDb');

module.exports.getListePays = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PAYNOM, PAYNUM FROM pays ORDER BY PAYNOM ASC";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}