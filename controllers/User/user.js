const User = require('../../models/User/user_db_queries');

const creatNewUser= (req, res) => {
    const newUser = req.body;
    console.log(req.body);
    User.addUser(newUser, (err, data) => {
        console.log(1);
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the task.'
        });
      } else {
        console.log(1);
        res.send(data);
      }
    });
  };


  const getUserList = (req, res) => {
    console.log(req.body);
    User.getUserList( (err, data) => {
        console.log(1);
      if (err) {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the task.'
        });
      } else {
        console.log(1);
        res.send(data);
      }
    });
  };

  const getUserListById = (req, res) => {
    console.log(req.params.id);
    User.getUserListById( req.params.id ,(err, data) => {
        console.log(1);
        if (err) {
        res.status(500).send({
            message:
            err.message || 'Some error occurred while creating the task.'
        });
        } else {
        console.log(1);
        res.send(data);
        }
    });
    };

    const getUserListByName = (req, res) => {
      console.log(req.params.name);
      User.getUserListByName( req.params.name ,(err, data) => {
          console.log(1);
          if (err) {
          res.status(500).send({
              message:
              err.message || 'Some error occurred while creating the task.'
          });
          } else {
          console.log(1);
          res.send(data);
          }
      });
      };
  
      const getUserListByEmail= (req, res) => {
        console.log(req.params.email);
        User.getUserListByEmail( req.params.email ,(err, data) => {
            console.log(1);
            if (err) {
            res.status(500).send({
                message:
                err.message || 'Some error occurred while creating the task.'
            });
            } else {
            console.log(1);
            res.send(data);
            }
        });
        };
        const updateUser = (req, res) => {
          console.log(req.params.id);
          User.updateUser( req.params.id, req.body ,(err, data) => {
              console.log(1);
              if (err) {
              res.status(500).send({
                  message:
                  err.message || 'Some error occurred while creating the task.'
              });
              } else {
              console.log(1);
              res.send(data);
              }
          });
          };
          
          
        const deleteUser = (req, res) => {
          console.log(req.params.id);
          User.deleteUser( req.params.id,(err, data) => {
              console.log(1);
              if (err) {
              res.status(500).send({
                  message:
                  err.message || 'Some error occurred while creating the task.'
              });
              } else {
              console.log(1);
              res.send(data);
              }
          });
          };

module.exports = {
    creatNewUser,
    getUserList,
    getUserListById,
    getUserListByName,
    getUserListByEmail,
    updateUser,
    deleteUser,
};