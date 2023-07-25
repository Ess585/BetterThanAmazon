const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../config/config')

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {
        type: String,
        trim: true,
        required: 'Por favor ingrese un nombre.'
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Se requiere Dirección de correo electrónico',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, complete una dirección de correo electrónico válida.']
    },
    password: {
        type: String,
        trim: true,
        required: ['se requiere contraseña'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: ['Se requiere el número de teléfono'],
        match: [/^(?:(?:\+502)?(|-| )(?:502)?)?(|-| )\d{8}$/, 'Por favor complete un número de teléfono válido']
    },
    gender: {
        type: String,
        trim: true,
        default: 'No especificado'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/silenceiv/image/upload/q_auto:eco/v1617358367/defaultAvatar_wnoogh.png'
    },
    createdSells: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    wishedProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    chatRooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatRoom'
        }
    ]
});

userSchema.pre('save', async function (next) {
    let salt = await bcrypt.genSalt(SALT);
    let hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})



module.exports = mongoose.model('User', userSchema);