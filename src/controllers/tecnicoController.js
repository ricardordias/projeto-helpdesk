const tecnicoService = require("../services/tecnicoService");

class tecnicoController {
    static async listarTecnicos(req, res, next) {
        try {
            const tecnicos = await tecnicoService.listarTecnicos();
            return res.status(200).json(tecnicos);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = tecnicoController;
