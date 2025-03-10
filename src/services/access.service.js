/**
 * @service AccessService
 * @description: Dùng để xử lý logic liên quan đến việc đăng ký tài khoản
 */



// import model
const shop = require('../models/shop.model');
const bcrypt = require('bcryptjs');
const KeyTokenService = require('./token.service');
const { createTokenPair } = require('../auth/auth');
const crypto = require('crypto');
const {getInfoData} = require('../utils/index');

const Roles = {
    SHOP: '000S1',//SHOP
    WRITER: '000S2',//WRITER
    EDITOR: '000S3',//EDITOR
    ADMIN: '000S4',//ADMIN
}

class AccessService {
    static signup = async ({ name, email, password }) => {
        try {
            // find email
            const emailholder = await shop.findOne({ email: email }).lean();
            if (emailholder) {
                return {
                    code: 'xxxx',
                    message: 'Email already exists',
                    status: 'error'
                }

            }
            // create new shop
            const hashPassword = bcrypt.hashSync(password, 10);
            const newShop = await shop.create({
                name, email, password: hashPassword, role: Roles.SHOP
            });


            /* ------------------------------------------------------------------------------------------- */
            // if create shop success
            if (newShop) {
                // create a pair keys of access token and refresh token
                const accessKey = crypto.randomBytes(32).toString('hex');
                const refreshKey = crypto.randomBytes(32).toString('hex');

                /* 
                *create a row in the keyTokenModel table
                * with the userId, accessKey and refreshKey
                */
                const DBKEY = KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    accessKey,
                    refreshKey
                })
                // if create fail
                if (!DBKEY) {
                    return {
                        code: 'xxxx',
                        message: 'There was a problem creating the public key',
                    }
                }


                //if create successfully, then create a token pair (access token and refresh token)
                const tokens = createTokenPair({
                    userId: newShop._id,
                    email
                            }, accessKey, refreshKey);
                console.log('Crated token pair:', tokens);

                if (!tokens) {
                    return {
                        code: 'xxxx',
                        message: 'There was a problem creating the token pair',
                    }
                }

                // add refresh token to the database
                
                await KeyTokenService.updateRefreshToken({
                    userId: newShop._id,
                    refreshToken: tokens.refreshToken
                })


                return {
                    code: 201,
                    message: 'Signup successfully',
                    status: 'success',
                    metadata: {
                        shop: getInfoData(newShop, ['name', 'email','_id']),
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken,

                    }
                }
            }
            return {
                code: 200,
                metadata: null
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

module.exports = AccessService;