module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).json({message: '¡Debes registrarte primero!'})
    }
    next();
}