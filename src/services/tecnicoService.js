const bcrypt = require("bcryptjs");
const usuarioModel = require("../models/usuarioModel");
const tecnicoModel = require("../models/tecnicoModel");

class tecnicoService {
    static async listarTecnicos() {
        return tecnicoModel.findAll();
    }

    static async criar({ nome, email, senha }) {
        if (!nome || !email || !senha) {
            const error = new Error("Nome, e-mail e senha são obrigatórios.");
            error.status = 400;
            throw error;
        }

        const existente = await usuarioModel.findByEmail(email);
        if (existente) {
            const error = new Error("E-mail já cadastrado.");
            error.status = 400;
            throw error;
        }

        const senha_hash = await bcrypt.hash(senha, 10);
        const tecnico_id = await tecnicoModel.create({ nome, email });

        await usuarioModel.create({
            nome,
            email,
            senha_hash,
            perfil: "TECNICO",
            solicitante_id: null,
            tecnico_id
        });

        return { id: tecnico_id, nome, email };
    }
}

module.exports = tecnicoService;
