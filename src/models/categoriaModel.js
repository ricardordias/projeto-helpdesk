const db = require("../config/database");

class categoriaModel {
    static async findAll() {
        const [rows] = await db.query("SELECT id, nome, descricao FROM tb_categorias");
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query("SELECT id FROM tb_categorias WHERE id = ?", [id]);
        return rows[0];
    }
}

module.exports = categoriaModel;
