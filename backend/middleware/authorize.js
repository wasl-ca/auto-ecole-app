const authorize = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      console.log(req.user);
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: "Access forbidden: insufficient role" });
      }
  
      next();
    };
  };
  
  module.exports = authorize;
  