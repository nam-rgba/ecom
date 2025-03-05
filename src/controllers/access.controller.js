const AccessService = require('../services/access.service');

class AcessController {
    signUp = async (req, res, next) => {
        // code here
        try{
            console.log(`[P]::singUp::`,req.body);
            return res.status(201).json(
                await AccessService.signup(req.body)
            );
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new AcessController();

// class Accesscontroller{
//     signUp = async (req, res, next)=>{
//         try {
//             console.log(`[P]::singUp::`,req.body);
//             return res.status(201).json({
//                 code: '20001',
//                 metadata:{userId:1}
//             })
//         } catch (error) {
//             next(error);
//         }
//     }
// }

// module.export= new Accesscontroller();