const db = require('../../db-connection');

const User = {};

User.addUser = (newUser, result) => {

    db.query('INSERT INTO user SET ?', newUser, (err, res) => {
        
      if (err) {
        console.log(3);
        result(err, null);
        return;
      }
      result(null, { ...newUser });
    });
  };

  User.getUserList = ( result) => {

    db.query('SELECT * FROM user',  (err, res) => {
        
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
    
    
          User.updateUser = (UserID, Data, result) => {

            const userData = db.query(`SELECT * FROM user Where UserID = ${UserID}`, (err, res) => {
        
                if (err) {
                    console.log(3);
                    result(err, null);
                    return;
                }
                console.log(res);
                let updateQuery = 'UPDATE user SET ';
                Object.keys(Data).forEach((key, index) => { // Object.keys(Data) is used for iterate key-values 
                    if (Data[key] !== '') {
                        updateQuery += `${key} = '${Data[key]}'`;
                        if (index < Object.keys(Data).length - 1) {
                            updateQuery += ', ';
                        }
                    }
                });
                updateQuery += ` WHERE UserID = ${UserID}`;
                console.log(updateQuery);
                // Execute the update query
                db.query(updateQuery, (err, result) => {
                    if (err) {
                        console.error('Error updating record:', err);
                        return;
                    }
                    console.log('Record updated successfully');
                });
        
                result(null, res);
        
            });
        
        }
        
        
        User.deleteUser = (UserID, result) => {
          db.query(`DELETE FROM user WHERE UserID = "${UserID}"`, (err, res) => {
        
              if (err) {
                  console.log(3);
                  result(err, null);
                  return;
              }
              result(null, res);
          });
        }
module.exports = User;  