const jwt = require('jsonwebtoken');

const userAuthMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    
    // Check if token is for user (not admin)
    if (decoded.role && decoded.role !== 'user') {
      return res.status(403).json({ message: 'Invalid token type' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = userAuthMiddleware;

