const { SuccessResponse } = require("../res/success.response")
const ProductFactory = require("../services/product.service")


class ProductController {
    // POST
    createProduct = async (req, res, next)=>{
        new SuccessResponse({
            message: 'create product successfully',
            metadata: await ProductFactory.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.keyStore.userId
            } )
        }).send(res)
    }


    // GET
    /**
     * @description Get all product of a shop
     * @param {number} limit 
     * @param {number} start
     * @returns {json} 
     */
    getDataAllProduct = async (req, res, next) =>{
        new SuccessResponse({
            message: "OK, u got it",
            metadata: await ProductFactory.findAllProductIfDraft({
                product_shop: req.keyStore.userId
            })
        }).send(res)
    }

    // SEARCH

    searchProduct = async (req, res, next) =>{
        new SuccessResponse({
            message: "Here what u find",
            metadata: await ProductFactory.searchProduct(req.params)
        }).send(res)
    }
}

module.exports = new ProductController()