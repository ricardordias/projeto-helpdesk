const db = require("../config/database");

class solicitanteModel {
    static async create({ nome, email, setor }) {
        const [result] = await db.query(
            "INSERT INTO tb_solicitantes (nome, email, setor) VALUES (?, ?, ?)",
            [nome, email, setor]
        );
        return result.insertId;
    }
}

module.exports = solicitanteModel;
