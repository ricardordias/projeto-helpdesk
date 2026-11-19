const categoriaService = require("../services/categoriaService");

class categoriaController {
    static async listarCategorias(req, res, next) {
        try {
            const categorias = await categoriaService.listarCategorias();
            return res.status(200).json(categorias);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = categoriaController;
