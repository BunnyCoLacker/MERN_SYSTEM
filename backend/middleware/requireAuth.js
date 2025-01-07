const jwt = require('jsonwebtoken');
const User = require('../models/users');

const requireAuth = async (req, res, next) => {
    // Verify auth
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authorization.split(' ')[1];

    try {
        // Verify the token and extract the user ID
        const { _id } = jwt.verify(token, process.env.SECRET);

        // Find the user and attach it to the request object
        req.user = await User.findOne({ _id }).select('_id');

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};

module.exports = requireAuth;
