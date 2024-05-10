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

  User.getUserList = ( result) => {

    db.query('SELECT * FROM User',  (err, res) => {
        
        if (err) {
        console.log(3);
        result(err, null);
        return;
        }
        result(null, res);
    });
    };

    User.getUserListById = ( UserID ,result) => {

      db.query(`SELECT * FROM user WHERE UserID = ${UserID}`,  (err, res) => {
          
          if (err) {
          console.log(3);
          result(err, null);
          return;
          }
          result(null, res);
      });
      };

      User.getUserListByName = ( Username ,result) => {
        db.query(`SELECT * FROM user WHERE Username = "${Username}"`,  (err, res) => {
            
            if (err) {
            console.log(3);
            result(err, null);
            return;
            }
            result(null, res);
        });
        };

        User.getUserListByEmail = ( email ,result) => {

          db.query(`SELECT * FROM user WHERE Email = "${email}"`,  (err, res) => {
              
              if (err) {
              console.log(3);
              result(err, null);
              return;
              }
              result(null, res);
          });
          };
    
    

module.exports = User;  