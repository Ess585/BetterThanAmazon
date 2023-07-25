const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const User = require('../models/User');
const productService = require('../services/productService');
const userService = require('../services/userService');

router.patch('/edit-profile/:id', async (req, res) => {
    let { name, phoneNumber, email } = req.body;
    try {
        let errors = [];
        let checkUser = await User.findOne({ email });

        if (checkUser && checkUser._id.toString() !== req.user._id.toString()) errors.push('Esta dirección de correo electrónico ya está en uso.');
        if (name.length < 3 || name.length > 50) errors.push('El nombre debe tener al menos 3 caracteres y un máximo de 50 caracteres ')
        if (/^(?:(?:\+502)?(|-| )(?:502)?)?(|-| )\d{8}$/.test(phoneNumber) == false) errors.push('El número de teléfono debe ser válido ');
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) == false) errors.push("Complete una dirección de correo electrónico válida");

        if (req.body.avatar) {
            if (!req.body.avatar.includes('image')) errors.push('El archivo cargado debe ser una imagen; ');
        }

        if (errors.length >= 1) throw { message: [errors] };

        if (req.body.avatar) {
            let compressedImg = await productService.uploadImage(req.body.avatar);
            await userService.edit(req.params.id, { name, phoneNumber, email, avatar: compressedImg });
            res.status(201).json({ message: '¡Actualizado!', avatar: compressedImg });
        } else {
            await userService.edit(req.params.id, { name, phoneNumber, email });
            res.status(201).json({ message: '¡Actualizado!' });
        }
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

router.get('/getUserById/:id', async (req, res) => {
    try {
        let user = await userService.getUserById(req.params.id);
        let jsonRes = {
            _id: user._id, name: user.name, email: user.email, phoneNumber: user.phoneNumber,
            totalSells: user.createdSells.length, avatar: user.avatar,
            isMe: req.user._id == req.params.id
        }
        res.status(200).json({user: jsonRes});
    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router;