const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/usuarioModel");

class usuarioService {
    static async login({ email, senha }) {
        if (!email || !senha) {
            const error = new Error("E-mail e senha são obrigatórios.");
            error.status = 400;
            throw error;
        }

        const usuario = await usuarioModel.findByEmail(email);

        if (!usuario) {
            const error = new Error("E-mail ou senha inválidos.");
            error.status = 401;
            throw error;
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

        if (!senhaValida) {
            const error = new Error("E-mail ou senha inválidos.");
            error.status = 401;
            throw error;
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

        return {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                perfil: usuario.perfil,
                solicitante_id: usuario.solicitante_id,
                tecnico_id: usuario.tecnico_id
            }
        };
    }
}

module.exports = usuarioService;
