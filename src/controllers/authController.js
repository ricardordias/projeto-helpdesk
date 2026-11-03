const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

class authController {
    static async login(req, res, next) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
            }

            const [rows] = await pool.query(
                `SELECT id, nome, email, senha_hash, perfil, solicitante_id, tecnico_id
                 FROM tb_usuarios WHERE email = ?`,
                [email]
            );

            // Mensagem genérica — não revela se o e-mail existe (boa prática)
            if (rows.length === 0) {
                return res.status(401).json({ erro: "E-mail ou senha inválidos." });
            }

            const usuario = rows[0];
            const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

            if (!senhaValida) {
                return res.status(401).json({ erro: "E-mail ou senha inválidos." });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    perfil: usuario.perfil,
                    solicitante_id: usuario.solicitante_id,
                    tecnico_id: usuario.tecnico_id
                },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
            );

            return res.status(200).json({
                token,
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    perfil: usuario.perfil,
                    solicitante_id: usuario.solicitante_id,
                    tecnico_id: usuario.tecnico_id
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = authController;