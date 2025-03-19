

/** 
 * @ service: KeyTokenService
 * @ description: chỉ dành để khởi tạo một row trong bảng keyTokenModel
 * @ param: userId, publicKey
 * @ return: publicKeyString
 *  
 */

const keyTokenModel = require('../models/token.model');

class KeyTokenService {
    static async createKeyToken({ userId, accessKey, refreshKey, refreshTokensUsed, refreshToken }) {

        try {
            const filter = { userId: userId },
                update = { accessKey, refreshKey, refreshTokensUsed: refreshTokensUsed, refreshToken },
                options = {new: true, upsert: true }

            const keysUpdated = await keyTokenModel.findOneAndUpdate(filter, update, options)
            return keysUpdated? keysUpdated : null
        } catch (error) {
            console.error('Error in createKeyToken:', error);
            throw new Error('Cannot create key token');
        }
    }


}

module.exports = KeyTokenService;
