const solicitanteService = require("../services/solicitanteService");

class solicitanteController {
    static async criar(req, res, next) {
        try {
            const solicitante = await solicitanteService.criar(req.body);
            return res.status(201).json(solicitante);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = solicitanteController;
