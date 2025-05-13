const { SuccessResponse } = require('../res/success.response')
const CustomerService = require('../services/customer.service')

class CustomerController {
    addCustomer = async (req, res, next) =>{
        new SuccessResponse({
            message: 'Add new customer successgully',
            metadata: await CustomerService.addCustomer(req.body) 
        }).send(res)
    }
}

module.exports = new CustomerController