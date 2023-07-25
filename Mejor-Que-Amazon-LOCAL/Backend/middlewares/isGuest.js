module.exports = (req, res, next) => {
    if (req.user) {
        return res.json({message: 'Ya se ha autentificado'})
    }

    next();
}