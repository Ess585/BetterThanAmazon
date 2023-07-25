const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

async function registerUser(userData) {
    let { name, email, phoneNumber, password, repeatPassword } = userData;
    let errors = [];
    let checkUser = await User.findOne({ email });
    if (checkUser) errors.push('Esta dirección de correo electrónico ya está en uso');
    if (name.length < 3 || name.length > 50) errors.push('El nombre debe tener al menos 3 caracteres y un máximo de 50 caracteres ')
    if (/^(?:(?:\+502)?(|-| )(?:502)?)?(|-| )\d{8}$/.test(phoneNumber) == false) errors.push('El número de teléfono debe ser válido ' );
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Complete una dirección de correo electrónico válida" );
    if (password !== repeatPassword) errors.push("Las contraseñas deben coincidir " );
    if (password.length < 8) errors.push("La contraseña debe tener al menos 8 caracteres " );
    if (password.length > 20) errors.push("La contraseña debe tener un máximo de 20 caracteres " );
    if (errors.length >= 1) throw {message: [errors]}
    
    let user = new User(userData);
    return await user.save();
}

async function loginUser({ email, password }) {
    let user = await User.findOne({ email });
    if (!user) throw { message: 'Correo electrónico o contraseña no válidos' };

    let hasValidPass = await bcrypt.compare(password, user.password);
    if (!hasValidPass) throw { message: "Correo electrónico o contraseña no válidos" }

    let token = jwt.sign({ _id: user._id, email: user.email, phoneNumber: user.phoneNumber, createdSells: user.createdSells.length, avatar: user.avatar }, SECRET);
    return token;
}

async function getUser(id) {
    return await User.findById(id).lean()
}

module.exports = {
    registerUser,
    loginUser,
    getUser
}