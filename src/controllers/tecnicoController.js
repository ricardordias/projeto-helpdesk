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

    static async criar(req, res, next) {
        try {
            const tecnico = await tecnicoService.criar(req.body);
            return res.status(201).json(tecnico);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = tecnicoController;
