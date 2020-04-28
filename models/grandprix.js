let db = require("../configDb");

module.exports.getListeGrandPrix = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            // s'il n'y a pas d'erreur de connexion
            // execution de la requête SQL
            let sql = "SELECT GPNUM, GPNOM, PAYADRDRAP FROM `grandprix` g join circuit c on g.CIRNUM=c.CIRNUM join pays p on p.PAYNUM=c.PAYNUM";
            //console.log (sql);
            connexion.query(sql, callback);
            

            // la connexion retourne dans le pool
            connexion.release();
        }
    })
};

module.exports.getDetailsGrandprix = function (gpnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "select row_number, PILNOM, PILPRENOM, TEMPSCOURSE, PTNBPOINTSPLACE, PILNUM, GPNUM from (SELECT @row_number:=@row_number+1 AS row_number ,pilnom, pilprenom, tempscourse, p.pilnum, g.gpnum from course c join grandprix g on c.gpnum = g.gpnum join pilote p on c.pilnum = p.pilnum JOIN (SELECT @row_number := 0 FROM DUAL) as sub where c.gpnum =" + gpnum +" order by tempscourse asc limit 10) t join points p on p.PTPLACE=t.row_number ";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};
module.exports.getInfoGrandPrix = function (gpnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT GPCOMMENTAIRE, GPNUM, GPNOM from grandprix WHERE GPNUM =" + gpnum ;
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.getListeGrandPrixDate = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT GPNUM, GPNOM, GPDATE, GPDATEMAJ FROM grandprix WHERE 1 order by GPDATE DESC";
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.supprimerLigneResultat = function (gpnum, pilnum, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "DELETE from course where GPNUM=" + gpnum +" and PILNUM=" + pilnum;
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    })
};

module.exports.ajouterLigneResultat = function (data, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            connexion.query('INSERT INTO course SET ?',data, callback);
            connexion.release();
        }
    });
};
