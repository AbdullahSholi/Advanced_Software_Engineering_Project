const roleMiddleware = (roles) => {
  return (req, res, next) => {
    console.log("req.user:", req.user); // Debug log
    console.log("roles:", roles);       // Debug log

    if (!req.user || !roles.includes(req.user.Role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};

module.exports = roleMiddleware;
