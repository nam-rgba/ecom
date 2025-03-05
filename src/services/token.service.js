

/** 
 * @ service: KeyTokenService
 * @ description: chỉ dành để khởi tạo một row trong bảng keyTokenModel
 * @ param: userId, publicKey
 * @ return: publicKeyString
 *  
 */ 
 
const keyTokenModel = require('../models/token.model');

class KeyTokenService {
    static async createKeyToken({ userId, publicKey }) {
        try {
            const publicKeyString = publicKey.toString();
            console.log('publicKeyString:', publicKeyString);

            // Lưu token vào database
            const token = await keyTokenModel.create({ userId, publicKey: publicKeyString });

            // Nếu lưu thành công, trả về publicKeyString, ngược lại trả về null
            return token ? token.publicKey : null;
        } catch (error) {
            console.error('Error in createKeyToken:', error);
            throw new Error('Cannot create key token');
        }
    }
}

module.exports = KeyTokenService;
