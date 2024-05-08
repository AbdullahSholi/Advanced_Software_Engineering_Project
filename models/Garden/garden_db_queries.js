const db = require('../../db-connection');

const Garden = {};

Garden.addGarden = (newGarden, result) => {

    db.query('INSERT INTO garden SET ?', newGarden, (err, res) => {
        
      if (err) {
        console.log(3);
        result(err, null);
        return;
      }
      result(null, { ...newGarden });
    });
  };

Garden.getGardenList = ( result) => {

db.query('SELECT * FROM garden',  (err, res) => {
    
    if (err) {
    console.log(3);
    result(err, null);
    return;
    }
    result(null, res);
});
};

Garden.getGardenListById = ( GardenID ,result) => {

    db.query(`SELECT * FROM garden WHERE GardenID = ${GardenID}`,  (err, res) => {
        
        if (err) {
        console.log(3);
        result(err, null);
        return;
        }
        result(null, res);
    });
    };


Garden.getGardenListByName = ( Name ,result) => {
    db.query(`SELECT * FROM garden WHERE Name = "${Name}"`,  (err, res) => {
        
        if (err) {
        console.log(3);
        result(err, null);
        return;
        }
        result(null, res);
    });
    };

Garden.getGardenListByLocation = ( Location ,result) => {

    db.query(`SELECT * FROM garden WHERE Location = "${Location}"`,  (err, res) => {
        
        if (err) {
        console.log(3);
        result(err, null);
        return;
        }
        result(null, res);
    });
    };

module.exports = Garden;  