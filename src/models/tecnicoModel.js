const db = require("../config/database");

class tecnicoModel {
    static async findAll() {
        const [rows] = await db.query("SELECT id, nome, email FROM tb_tecnicos");
        return rows;
    }
}

module.exports = tecnicoModel;
