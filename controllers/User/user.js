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


module.exports = {
    creatNewUser
};