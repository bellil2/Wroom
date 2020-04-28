let db = require("../configDb");

module.exports.getListeSponsor = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT SPONUM, SPONOM, SPOSECTACTIVITE from sponsor";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.getDetailsSponsor = function (sponum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT SPONUM, SPONOM, SPOSECTACTIVITE from sponsor where SPONUM =" + sponum;
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}

module.exports.ajouterSponsor = function (data, data1, data2, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
          if (data2 !=0) {
            connexion.query('INSERT INTO sponsor SET SPONOM =\'' + data + '\', SPOSECTACTIVITE=\'' + data1 + '\'');
            connexion.query('INSERT INTO finance SET ECUNUM =\'' + data2 + '\', SPONUM= (select max(sponum) from sponsor)', callback);
          }
          else {
            connexion.query('INSERT INTO sponsor SET SPONOM =\'' + data + '\', SPOSECTACTIVITE=\'' + data1 + '\'', callback);
          }
          connexion.release();
        }
    });
};

module.exports.supprimerSponsor = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
          connexion.query('DELETE from finance where sponum =' + data);
          connexion.query('DELETE from sponsorise where sponum =' + data);
          connexion.query('DELETE from sponsor where sponum =' + data, callback);
          connexion.release();
        }
    });
};

module.exports.modifierSponsor = function (sponum, data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            sql = 'UPDATE sponsor SET SPONOM = \'' + data.SPONOM + '\', SPOSECTACTIVITE = \'' + data.SPOSECTACTIVITE+ '\' WHERE SPONUM = ' + sponum;
            connexion.query(sql);

            if (data.ECUNUM != 0) {
              connexion.query('DELETE from finance WHERE SPONUM = ' + sponum);
              connexion.query('INSERT INTO FINANCE VALUES('+ data.ECUNUM +','+ sponum +')', callback);
            }
            else {
              connexion.query('DELETE from finance WHERE SPONUM = ' + sponum, callback);
            }
            connexion.release();
        }
    })
}
