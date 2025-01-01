const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // For now, allow requests without authentication
        // TODO: Implement proper authentication later
        next();
        
        /* Uncomment this when implementing authentication
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        */
    } catch (error) {
        res.status(401).json({ error: 'Please authenticate' });
    }
};

module.exports = auth;