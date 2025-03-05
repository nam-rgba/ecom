const JWT = require('jsonwebtoken');

const createTokenPair = (payload, public, private) => {
    // public key as a string
    try {
        //create access token
        const accessToken = JWT.sign(payload, private, { algorithm: 'RS256', expiresIn: '3 days' });

        //create refresh token
        const refreshToken = JWT.sign(payload, private, { algorithm: 'RS256', expiresIn: '7 days' });

        JWT.verify(accessToken, public, (err, decoded) => {
            if (err) {
                console.error('Error in verify access token:', err);
            }else{
                console.log('Decoded access token:', decoded);
            }
        }
        );
        return { accessToken, refreshToken }
    } catch (error) {
        console.error('Error in createTokenPair:', error);
        throw new Error('Cannot create token pair');
    }
}

module.exports = {
    createTokenPair
}