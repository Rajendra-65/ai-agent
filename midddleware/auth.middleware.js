import JWT from 'jsonwebtoken';

export const authUser = async (req, res, next) => {
    try {
        const token =
            req.cookies?.token || req.headers?.authorization?.split(' ')[1];
        
        console.log('Token:', token);
        if (!token) {
            return res.status(401).send({ error: 'Unauthorized User' });
        }

        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded);

        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT Error:', error.message);
        res.status(401).send({ error: 'Unauthorized' });
    }
};
