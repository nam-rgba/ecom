const { product, rice } = require("../models/product.model")
const { BadRequestError } = require('../res/error.response')
const {findAllProductIf, searchByText} = require('../models/repository/product.repo')


/* factory */
class ProductFactory { 
    static productClassType = {} //Object to store

    // add a new class type to factory
    static addClassType  (type, classRef) {
        ProductFactory.productClassType[type]=classRef
    }

    // handle when create
    static async createProduct (type, payload){
        const productClass = ProductFactory.productClassType[type]
        if(!productClass) throw new BadRequestError('Invalid type class')
        return new productClass(payload).createProduct()
    } 

    // query
    static async findAllProductIfDraft ({product_shop, limit=20, skip=0}){
        const query = {product_shop, isDraft: true}
        return await findAllProductIf({query, skip, limit})
    }

    static async searchProduct (key){
        return await searchByText({key})
    }
}
/* base class */
class Product {

    constructor({
        product_name, product_thumb, product_description, product_shop,
        product_price, product_quantity, product_type, product_attributes,
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_description = product_description
        this.product_shop = product_shop
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_type = product_type
        this.product_attributes = product_attributes
        this.product_code = product_code
    }

    async createProduct(_id) {
        return await product.create({
            ...this,
            _id:_id
        })
    }
}



class Rice extends Product {
    async createProduct() {
        
        const newRice = await rice.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })

        if (!newRice) throw new BadRequestError('Cannot create rice')

        const newProduct = await super.createProduct(newRice._id)
        if (!newProduct) throw new BadRequestError('create new product error')

        return newProduct;
    }
}



ProductFactory.addClassType('rice', Rice)



module.exports = ProductFactory



