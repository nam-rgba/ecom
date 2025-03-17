const AccessService = require('../services/access.service');
const {OK, Created} = require('../res/success.response');

// controller take the request and response
// and call the service to do the actual work
// then return the response to the client
class AcessController {
    signUp = async (req, res, next) => {
        new Created({
            message: 'User created successfully',
            metadata: await AccessService.signup(req.body)
        }).send(res);
    }
}

module.exports = new AcessController();

