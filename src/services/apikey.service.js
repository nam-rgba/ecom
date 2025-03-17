const Apikey = require('../models/apikey.model');
const crypto = require('crypto');

const findBykey = async (key) => {

    try {
        // const sampleKey = await Apikey.create({
        //     key: crypto.randomBytes(32).toString('hex'),
        //     status: true,
        //     permission: ['0000'],
    
        // })
        // console.log('Sample key:', sampleKey);
        const apikey = await Apikey.findOne({
            key, status: true
        }).lean();
        return apikey;
    } catch (error) {
        console.error('Error in findBykey:', error);
        throw new Error(error);
    }
}

module.exports = {
    findBykey};