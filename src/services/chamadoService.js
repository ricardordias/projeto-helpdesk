const chamadoModel = require("../models/chamadoModel");
const categoriaModel = require("../models/categoriaModel");

const PRIORIDADES_VALIDAS = ["BAIXA", "MEDIA", "ALTA"];
const CAMPOS_PROIBIDOS = ["solicitante_id", "tecnico_id", "status", "solucao", "criado_em"];

class chamadoService {
    static async criar(body, usuario) {
        const { titulo, descricao, prioridade, categoria_id } = body;

        if (!titulo || !descricao || !prioridade || !categoria_id) {
            const error = new Error("Título, descrição, prioridade e categoria são obrigatórios.");
            error.status = 400;
            throw error;
        }

        if (!PRIORIDADES_VALIDAS.includes(prioridade)) {
            const error = new Error("Prioridade inválida. Use BAIXA, MEDIA ou ALTA.");
            error.status = 400;
            throw error;
        }

        if (Object.keys(body).some(campo => CAMPOS_PROIBIDOS.includes(campo))) {
            const error = new Error("Campos não permitidos na abertura de chamado.");
            error.status = 400;
            throw error;
        }

        const categoria = await categoriaModel.findById(categoria_id);
        if (!categoria) {
            const error = new Error("Categoria não encontrada.");
            error.status = 400;
            throw error;
        }

        const id = await chamadoModel.create({
            titulo,
            descricao,
            prioridade,
            solicitante_id: usuario.solicitante_id,
            categoria_id
        });

        return chamadoModel.findById(id);
    }

    static async listar(usuario) {
        if (usuario.perfil === "SOLICITANTE") {
            return chamadoModel.findAllBySolicitante(usuario.solicitante_id);
        }

        if (usuario.perfil === "TECNICO") {
            return chamadoModel.findAllByTecnico(usuario.tecnico_id);
        }

        return chamadoModel.findAll();
    }

    static async buscarPorId(id, usuario) {
        let chamado;

        if (usuario.perfil === "SOLICITANTE") {
            chamado = await chamadoModel.findByIdAndSolicitante(id, usuario.solicitante_id);
        } else if (usuario.perfil === "TECNICO") {
            chamado = await chamadoModel.findByIdAndTecnico(id, usuario.tecnico_id);
        } else {
            chamado = await chamadoModel.findById(id);
        }

        if (!chamado) {
            const error = new Error("Chamado não encontrado.");
            error.status = 404;
            throw error;
        }

        return chamado;
    }
}

module.exports = chamadoService;
