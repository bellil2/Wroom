/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeEcurie = function (callback) {
   // connection à la base
   db.getConnection(function (err, connexion) {
      if (!err) {
         // s'il n'y a pas d'erreur de connexion
         // execution de la requête SQL
         let sql = "SELECT ECUNUM, PAYADRDRAP, ECUNOM, ECUNOMDIR, ECUPOINTS FROM " +
            "ecurie e INNER JOIN pays p ";
         sql = sql + "ON p.paynum=e.paynum ORDER BY ecunom";
         //console.log (sql);
         connexion.query(sql, callback);

         // la connexion retourne dans le pool
         connexion.release();
      }
   });
};

module.exports.getDetailEcurie = function (ecunum, callback) {
   db.getConnection(function (err, connexion) {
      if (!err) {
         let sql = "SELECT ECUNOM, ECUNOMDIR, ECUADRSIEGE, p.PAYNOM,f.FPNOM, ECUADRESSEIMAGE, ECUPOINTS FROM `ecurie` e join pays p on e.PAYNUM=p.PAYNUM left join fourn_pneu f on f.FPNUM = e.FPNUM WHERE ECUNUM = " + ecunum;
         connexion.query(sql, callback);
         connexion.release();
      }
   });
};

module.exports.getAllEcuries = function (callback) {
   // connection à la base
   db.getConnection(function (err, connexion) {
      if (!err) {
         // s'il n'y a pas d'erreur de connexion
         // execution de la requête SQL
         let sql = "SELECT distinct p.PAYNUM, ECUNUM, ECUNOM, p.PAYNOM FROM `ecurie` e join pays p on e.PAYNUM=p.PAYNUM left join fourn_pneu f on f.FPNUM = e.FPNUM";
         //console.log (sql);
         connexion.query(sql, callback);
         // la connexion retourne dans le pool
         connexion.release();
      }
   });
};

module.exports.ajouterEcurie = function (data, data1, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            connexion.query("INSERT INTO ecurie SET ECUADRESSEIMAGE =\'" + data1 +"\', ?",data, callback);
            connexion.release();
        }
    });
};

module.exports.supprimerEcurie = function (num, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql ="UPDATE PILOTE SET ECUNUM = NULL WHERE ECUNUM =" + num
            let sql1 = "DELETE FROM  voiture WHERE ECUNUM =" + num
            let sql2 = "DELETE FROM finance WHERE ECUNUM =" + num
            let sql3 = "DELETE FROM ecurie WHERE ECUNUM =" + num
            connexion.query(sql);
            connexion.query(sql1);
            connexion.query(sql2);
            connexion.query(sql3, callback);
            connexion.release;
        }
    });
}

module.exports.modifierEcurie = function (ecunum, data, fileName, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            sql = 'UPDATE ecurie SET ECUNOM = \'' + data.ECUNOM + '\', ECUNOMDIR = \'' + data.ECUNOMDIR
            + '\', ECUADRSIEGE = \'' + data.ECUADRSIEGE + '\', ECUPOINTS = ' + data.ECUPOINTS +
            ', PAYNUM = \'' + data.PAYNUM + '\', ECUADRESSEIMAGE = \'' + fileName + '\' WHERE ECUNUM = ' + ecunum;
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
        }
    })
}
