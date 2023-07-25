const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {
        type: String,
        required: ['Se requiere título'],
        trim: true,
        minlength: [3, 'El título debe tener al menos 3 caracteres'],
        maxLenght: [50, "El título no puede tener más de 50 caracteres"]
    },
    category: {
        type: String,
        required: ['la categoria es requerida'],
        validate: {
            validator: function (v) {
                return (v != 'Choose...');
            },
            message: 'Por favor elija una categoría'
        }
    },
    description: {
        type: String,
        trim: true,
        required: ['Se requiere descripción'],
        minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
        maxlength: [1000, 'La descripción debe tener un máximo de 500 caracteres']
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: ['Ciudad es requerida'],
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    addedAt: {
        type: Date,
        required: true,
    },
    seller: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    active: {
        type: Boolean,
        default: true
    }
});

productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);