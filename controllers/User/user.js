const User = require('../../models/User/user_db_queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users1 = [
  { UserId: 1, Username: 'User', Email: 'user@example.com', Password: bcrypt.hashSync('password', 10), Role: 'user' },
  { UserId: 2, USername: 'Admin', Email: 'admin@example.com', Password: bcrypt.hashSync('password', 10), Role: 'admin' }
];

const creatNewUser = (req, res) => {
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
  User.getUserList((err, data) => {
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
  User.getUserListById(req.params.id, (err, data) => {
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
  User.getUserListByName(req.params.name, (err, data) => {
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

const getUserListByEmail = (req, res) => {
  console.log(req.params.email);
  User.getUserListByEmail(req.params.email, (err, data) => {
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
  User.updateUser(req.params.id, req.body, (err, data) => {
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
  User.deleteUser(req.params.id, (err, data) => {
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

const getPublicData = (req, res) => {
  res.json({ message: 'This is public data' });
};

const getUserData = (req, res) => {
  res.json({ message: `Hello ${req.user.name}, this is user data` });
};

const getAdminData = (req, res) => {
  res.json({ message: `Hello ${req.user.Username}, this is admin data` });
};


const register = async (req, res) => {
  const { UserID ,Username, Email, Password, Role } = req.body;

  console.log(req.body);
  User.addUser(req.body, res, (err, data) => {
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

const login = async (req, res) => {
  const { Email, Password } = req.body;

  console.log(req.body);
  User.login(req.body, res, (err, data) => {
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
  getPublicData,
  getUserData,
  getAdminData,
  register,
  login
};