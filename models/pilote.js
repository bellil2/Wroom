let db = require('../configDb');

module.exports.getLettresNom = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT substring(PILNOM,1,1) as lettre FROM pilote ORDER BY lettre";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getListePilotes = function (lettre, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT p.PILNUM, PILNOM, PILPRENOM, PHOADRESSE FROM pilote p join photo ph ON p.PILNUM=ph.PILNUM WHERE PILNOM LIKE '" + lettre  + "%' AND PHONUM = 1 ";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.ajouterPilote = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            connexion.query('INSERT INTO pilote SET ?',data, callback);
            connexion.release();
        }
    });
};

module.exports.ajouterPhotoPilote = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = 'INSERT INTO photo (PHONUM, PILNUM, PHOADRESSE) SELECT 1,MAX(PILNUM),\''+ data +'\' FROM pilote';
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getListePilotesEcurie = function (ecunum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT DISTINCT p.PILNUM, PILNOM, PILPRENOM, substring(PILTEXTE,1,100) as PILTEXTE, PHOADRESSE FROM pilote p join ecurie e  ON p.ECUNUM = e.ECUNUM join photo ph on p.PILNUM = ph.PILNUM WHERE PHONUM = 1 and e.ecunum =" + ecunum;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getDetailsPilote = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PILPOINTS, ECUNOM, PHOADRESSE, PILTEXTE, PILPOIDS, PILTAILLE, PILNOM, PILPRENOM, PILDATENAIS,"
            + " pa.PAYNAT FROM pilote p LEFT JOIN ecurie e ON p.ECUNUM = e.ECUNUM"
            + " JOIN pays pa ON p.PAYNUM = pa.PAYNUM JOIN photo ph ON p.PILNUM = ph.PILNUM WHERE p.PILNUM = " + num
            + " AND PHONUM = 1";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getSponsoPilote = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT sp.SPONOM, sp.SPOSECTACTIVITE FROM pilote p JOIN sponsorise s"
            + " ON p.PILNUM = s.PILNUM JOIN sponsor sp ON s.SPONUM = sp.SPONUM WHERE p.PILNUM = " + num;
            connexion.query(sql, callback);
            connexion.release;
        }
    });
};

module.exports.getAllPilotes = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PILNUM, PILNOM, PILPRENOM, PILDATENAIS FROM pilote ORDER BY PILNOM asc";
            connexion.query(sql, callback);
            connexion.release;
        }
    });
};

module.exports.getListePiloteNotInGP = function (gpnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "select DISTINCT PILNOM, p.PILNUM from pilote p join course c on c.pilnum = p.pilnum join grandprix g on c.gpnum=g.gpnum where p.pilnum not in ( select pilnum from course where gpnum ="+ gpnum +") order by pilnom asc";
            connexion.query(sql, callback);
            connexion.release;
        }
    });
};

module.exports.getPhotosPilote = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT ph.PHONUM, ph.PHOADRESSE, PHOSUJET, PHOCOMMENTAIRE, p.PILNUM FROM pilote p JOIN photo ph"
            + " ON p.PILNUM = ph.PILNUM WHERE p.PILNUM = " + num
            + " AND ph.PHONUM != 1";
            connexion.query(sql, callback);
            connexion.release;
        }
    });
};

module.exports.supprimerPilote = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "DELETE FROM photo WHERE PILNUM =" + num
            let sql1 = "DELETE FROM sponsorise WHERE PILNUM =" + num
            let sql2 = "DELETE FROM ecurie WHERE PILNUM =" + num
            let sql3 = "DELETE FROM course WHERE PILNUM =" + num
            let sql4 = "DELETE FROM pilote WHERE PILNUM =" + num
            connexion.query(sql);
            connexion.query(sql1);
            connexion.query(sql2);
            connexion.query(sql3);
            connexion.query(sql4, callback);
            connexion.release();
        }
    });
}

module.exports.modifierPilote = function (pilnum, data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = 'UPDATE pilote SET PILPRENOM = "' + data.PILPRENOM + '", PILNOM = "' + data.PILNOM
            + '", PILDATENAIS = "' + data.PILDATENAIS + '", PAYNUM = ' + data.PAYNUM + ', PILPOINTS = ' + data.PILPOINTS
            + ', PILTEXTE = "' + data.PILTEXTE + '", PILPOIDS = ' + data.PILPOIDS + ', ECUNUM = ' + data.ECUNUM
            + ' WHERE PILNUM = ' + pilnum;
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    });
}


module.exports.modifierPhotoPilote = function (pilnum, file, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = 'UPDATE photo set PHOADRESSE = \'' + file.name + '\' WHERE PHONUM = 1 AND PILNUM = ' + pilnum;
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
