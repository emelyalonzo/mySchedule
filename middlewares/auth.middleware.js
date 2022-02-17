const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json('Usuario no autenticado');
    }
    return next();
};

module.exports = {
    isAuthenticated,
};