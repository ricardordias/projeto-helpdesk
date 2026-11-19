const db = require("../config/database");

class tecnicoModel {
    static async findAll() {
        const [rows] = await db.query("SELECT id, nome, email FROM tb_tecnicos");
        return rows;
    }

    static async create({ nome, email }) {
        const [result] = await db.query(
            "INSERT INTO tb_tecnicos (nome, email) VALUES (?, ?)",
            [nome, email]
        );
        return result.insertId;
    }
}

module.exports = tecnicoModel;
