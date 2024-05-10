const db = require('../../db-connection');

const Guide = {};

Guide.addGuide = (newGuide, result) => {

    db.query('INSERT INTO guide SET ?', newGuide, (err, res) => {
        
      if (err) {
        console.log(3);
        result(err, null);
        return;
      }
      result(null, { ...newGuide });
    });
  };

module.exports = Guide;  