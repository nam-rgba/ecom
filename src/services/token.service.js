

/** 
 * @ service: KeyTokenService
 * @ description: chỉ dành để khởi tạo một row trong bảng keyTokenModel
 * @ param: userId, publicKey
 * @ return: publicKeyString
 *  
 */ 
 
const keyTokenModel = require('../models/token.model');

class KeyTokenService {
    static async createKeyToken({ userId, accessKey, refreshKey }) {
        try {
            // Lưu token vào database
            const token = await keyTokenModel.create({ userId, accessKey, refreshKey });

            // Nếu lưu thành công, trả về publicKeyString, ngược lại trả về null
            return token? {accessKey, refreshKey}: null;
        } catch (error) {
            console.error('Error in createKeyToken:', error);
            throw new Error('Cannot create key token');
        }
    }

    static async updateRefreshToken({ userId, refreshToken }) {
        try {
            // Cập nhật token vào database
            const token = await keyTokenModel
                .findOneAndUpdate({
                    userId: userId
                }, {
                    refreshKey: refreshToken
                }, {
                    new: true
                });
            
        } catch (error) {
            console.error('Error in updateRefreshToken:', error);
            throw new Error('Cannot update refresh token');
            
        }
    }
}

module.exports = KeyTokenService;
