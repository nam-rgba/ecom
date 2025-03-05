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
                // create a pair of public and private keys
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                })

                /* 
                *create a row in the keyTokenModel table
                *cause the public key to be stored in the database in the form of a string
                */
                const publicKeyString = KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })
                // if create fail
                if (!publicKeyString) {
                    return {
                        code: 'xxxx',
                        message: 'There was a problem creating the public key',
                    }
                }
                // const publicKeyObject = crypto.createPublicKey(publicKeyString);


                //if create successfully, then create a token pair (access token and refresh token)
                const tokens = createTokenPair({
                    userId: newShop._id,
                    email
                            }, publicKey, privateKey);
                console.log('Vrated token pair:', tokens);



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