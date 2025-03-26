const { product, clother, food } = require("../models/product.model")
const {BadRequestError} = require('../res/error.response')


/* factory */
class ProductFactory {
    static async createProduct(type, payload) {
        console.log(payload)
        switch(type){
            case 'Food':
                return new Food(payload).createProduct()
            case 'Clother':

                return new Clother(payload)
            default:
                throw new BadRequestError('Invalid type!')
        }
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
    }

    async createProduct(){
        return await product.create(this)
    }
}


class Clother extends Product{
    async createProduct(){
        console.log(this)
        const newClother = await clother.create(this.product_attributes)
        if (!newClother) throw new BadRequestError('Cannot create clother')

        const newProduct = await super.createProduct()
        if(!newProduct) throw new BadRequestError('create new product error')

        return newProduct;
    }
}

class Food extends Product{
    async createProduct(){
        const newFood = await food.create(this.product_attributes)
        if (!newFood) throw new BadRequestError('Cannot create food')

        const newProduct = await super.createProduct()
        console.log(newProduct)
        if(!newProduct) throw new BadRequestError('create new product error')

        return newProduct;
    }
}


module.exports= ProductFactory



