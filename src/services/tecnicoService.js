const tecnicoModel = require("../models/tecnicoModel");

class tecnicoService {
    static async listarTecnicos() {
        return tecnicoModel.findAll();
    }
}

module.exports = tecnicoService;
