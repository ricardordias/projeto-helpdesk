const categoriaModel = require("../models/categoriaModel");

class categoriaService {
    static async listarCategorias() {
        return categoriaModel.findAll();
    }
}

module.exports = categoriaService;
