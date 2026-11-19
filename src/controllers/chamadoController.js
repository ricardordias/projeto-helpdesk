const chamadoService = require("../services/chamadoService");

class chamadoController {
    static async criar(req, res, next) {
        try {
            const chamado = await chamadoService.criar(req.body, req.user);
            return res.status(201).json(chamado);
        } catch (error) {
            next(error);
        }
    }

    static async listar(req, res, next) {
        try {
            const chamados = await chamadoService.listar(req.user);
            return res.status(200).json(chamados);
        } catch (error) {
            next(error);
        }
    }

    static async buscarPorId(req, res, next) {
        try {
            const chamado = await chamadoService.buscarPorId(req.params.id, req.user);
            return res.status(200).json(chamado);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = chamadoController;
