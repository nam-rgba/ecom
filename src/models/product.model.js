const { Schema, model } = require("mongoose")


const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name: { type: String, require: true },
    product_thumb: { type: String, require: true },
    product_description: String,
    product_shop: {type: Schema.Types.ObjectId, reference: 'Shop'},
    product_price: { type: Number, require: true },
    product_quantity: { type: Number, require: true },
    product_type: { type: String, require: true, enum: ['Electronic', 'Clother', 'Food'] },
    product_attributes: { type: Schema.Types.Mixed, require: true }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
})

const foodSchema =  new Schema({
    brand: {type: String, require: true},
    date: Number,
    vegan: Boolean
},{
    collection: 'Foods',
    timestamps: true
})

const clotherSchema =  new Schema({
    brand: {type: String, require: true},
    size: String,
    meterial: String
},{
    collection: 'Clothers',
    timestamps: true
})

module.exports = {
    product : model(DOCUMENT_NAME, productSchema),
    food : model('Food', foodSchema),
    clothing : model('Clother', clotherSchema),

}