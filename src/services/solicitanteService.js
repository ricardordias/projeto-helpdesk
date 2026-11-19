const bcrypt = require("bcryptjs");
const usuarioModel = require("../models/usuarioModel");
const solicitanteModel = require("../models/solicitanteModel");

class solicitanteService {
    static async criar({ nome, email, senha, setor }) {
        if (!nome || !email || !senha || !setor) {
            const error = new Error("Nome, e-mail, senha e setor são obrigatórios.");
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
        const solicitante_id = await solicitanteModel.create({ nome, email, setor });

        await usuarioModel.create({
            nome,
            email,
            senha_hash,
            perfil: "SOLICITANTE",
            solicitante_id,
            tecnico_id: null
        });

        return { id: solicitante_id, nome, email, setor };
    }
}

module.exports = solicitanteService;
