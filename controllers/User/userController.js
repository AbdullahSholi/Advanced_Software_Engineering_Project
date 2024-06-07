// controllers/userController.js
const getPublicData = (req, res) => {
    res.json({ message: 'This is public data' });
  };
  
  const getUserData = (req, res) => {
    res.json({ message: `Hello ${req.user.name}, this is user data` });
  };
  
  const getAdminData = (req, res) => {
    res.json({ message: `Hello ${req.user.name}, this is admin data` });
  };
  
  module.exports = {
    getPublicData,
    getUserData,
    getAdminData
  };
  