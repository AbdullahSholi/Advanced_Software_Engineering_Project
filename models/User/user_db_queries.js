const db = require('../../db-connection');

const User = {};

User.addUser = (newUser, result) => {

    db.query('INSERT INTO User SET ?', newUser, (err, res) => {
        
      if (err) {
        console.log(3);
        result(err, null);
        return;
      }
      result(null, { ...newUser });
    });
  };



module.exports = User;  