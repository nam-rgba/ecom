const AccessService = require('../services/access.service');

// controller take the request and response
// and call the service to do the actual work
// then return the response to the client
class AcessController {
    signUp = async (req, res, next) => {
        // code here
            return res.status(201).json(
                await AccessService.signup(req.body)
            );
    }
}

module.exports = new AcessController();

