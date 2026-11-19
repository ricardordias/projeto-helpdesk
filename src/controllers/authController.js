const usuarioService = require("../services/usuarioService");

class authController {
    static async login(req, res, next) {
        try {
            const result = await usuarioService.login(req.body);
            return res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = authController;
