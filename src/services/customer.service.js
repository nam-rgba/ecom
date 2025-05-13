const customerModel = require("../models/customer.model");
const { ConflictRequestError, BadRequestError } = require("../res/error.response");



class CustomerService {
    static findCustomerByPhone = async ({ phone, select = {
        name: 1, phone: 1, address: 1, point: 1
    } }) => {
        return await customerModel.findOne({ phone }).select(select).lean();
    }

    static addCustomer = async ({ name, phone, address }) => {
        try {
            const isPhoneRegisted = await this.findCustomerByPhone({ phone })
            if (isPhoneRegisted) throw new ConflictRequestError('This user is already registered!')

            const newCustomer = await customerModel.create({ name, phone, address })
            if (!newCustomer) {
                return {
                    code: 200,
                    message: 'There is an error when add customer',
                    metadata: null
                }
            }

            return {
                code: 201,
                message: 'Add customer successfully',
                status: 'OK',
                metadata: newCustomer
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = CustomerService