const db = require("../config/database");

class usuarioModel {
    static async findByEmail(email) {
        const [rows] = await db.query(
            `SELECT id, nome, email, senha_hash, perfil, solicitante_id, tecnico_id
             FROM tb_usuarios WHERE email = ?`,
            [email]
        );
        return rows[0];
    }

    static async create({ nome, email, senha_hash, perfil, solicitante_id = null, tecnico_id = null }) {
        const [result] = await db.query(
            `INSERT INTO tb_usuarios (nome, email, senha_hash, perfil, solicitante_id, tecnico_id)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, email, senha_hash, perfil, solicitante_id, tecnico_id]
        );
        return result.insertId;
    }
}

module.exports = usuarioModel;
