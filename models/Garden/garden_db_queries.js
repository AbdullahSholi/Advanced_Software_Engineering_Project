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


module.exports = Garden;  