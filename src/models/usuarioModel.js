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
}

module.exports = usuarioModel;
