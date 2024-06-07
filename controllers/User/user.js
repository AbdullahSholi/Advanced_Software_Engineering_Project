const User = require('../../models/User/user_db_queries');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users1 = [
  { id: 1, name: 'User', email: 'user@example.com', password: bcrypt.hashSync('password', 10), role: 'user' },
  { id: 2, name: 'Admin', email: 'admin@example.com', password: bcrypt.hashSync('password', 10), role: 'admin' }
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
  res.json({ message: `Hello ${req.user.name}, this is admin data` });
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Basic validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide name, email, password, and role' });
  }

  // Check if the user already exists
  const userExists = users1.find(u => u.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = {
    id: users1.length + 1,
    name,
    email,
    password: hashedPassword,
    role
  };

  // Add user to mock database
  users1.push(newUser);

  // Generate JWT token
  const payload = { id: newUser.id, name: newUser.name, role: newUser.role };
  const token = jwt.sign(payload, 'Group@971', { expiresIn: '1h' });

  res.status(201).json({ message: 'User registered successfully', token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = users1.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const payload = { id: user.id, name: user.name, role: user.role };
  const token = jwt.sign(payload, 'Group@971', { expiresIn: '1h' });
  res.json({ token });
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