const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const DOCUMENT_NAME = 'Customer'
const COLLECTION_NAME = 'customers'
var customerSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    referral:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
    },
    point:{
        type: Number,
        default: 0,
        required: true
    },
    tags:{
        type: Array,
        default:[]
    }
},{
    collection: COLLECTION_NAME,
    timestamps: true
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, customerSchema);