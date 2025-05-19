const customerModel = require("../models/customer.model");
const { ConflictRequestError, BadRequestError } = require("../res/error.response");



class CustomerService {
    static findCustomerByPhone = async ({ phone, select = {
        name: 1, phone: 1, address: 1, point: 1
    } }) => {
        return await customerModel.findOne({ phone }).select(select).lean();
    }

    static addCustomer = async ({ name, phone, address }) => {

        const isPhoneRegisted = await this.findCustomerByPhone({ phone })
        if (isPhoneRegisted) throw new ConflictRequestError('This user is already registered!')

        const newCustomer = await customerModel.create({ name, phone, address })
        if (!newCustomer) throw new BadRequestError('Cannot add new customer')

        return newCustomer


    }

    static updateCustomer = async (customerId) => {
        // Remove null or undefind

    }
}

module.exports = CustomerService