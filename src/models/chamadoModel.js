const db = require("../config/database");

const SELECT_CHAMADO = `
    SELECT
        c.id, c.titulo, c.descricao, c.prioridade, c.status, c.solucao, c.criado_em,
        c.solicitante_id, s.nome AS solicitante_nome, s.setor AS solicitante_setor,
        c.categoria_id, cat.nome AS categoria_nome,
        c.tecnico_id, t.nome AS tecnico_nome
    FROM tb_chamados c
    JOIN tb_solicitantes s   ON s.id   = c.solicitante_id
    JOIN tb_categorias  cat  ON cat.id = c.categoria_id
    LEFT JOIN tb_tecnicos t  ON t.id   = c.tecnico_id
`;

class chamadoModel {
    static async create({ titulo, descricao, prioridade, solicitante_id, categoria_id }) {
        const [result] = await db.query(
            `INSERT INTO tb_chamados
                (titulo, descricao, prioridade, status, solicitante_id, categoria_id, tecnico_id, criado_em)
             VALUES (?, ?, ?, 'ABERTO', ?, ?, NULL, NOW())`,
            [titulo, descricao, prioridade, solicitante_id, categoria_id]
        );
        return result.insertId;
    }

    static async findAll() {
        const [rows] = await db.query(`${SELECT_CHAMADO} ORDER BY c.criado_em DESC`);
        return rows;
    }

    static async findAllBySolicitante(solicitante_id) {
        const [rows] = await db.query(
            `${SELECT_CHAMADO} WHERE c.solicitante_id = ? ORDER BY c.criado_em DESC`,
            [solicitante_id]
        );
        return rows;
    }

    static async findAllByTecnico(tecnico_id) {
        const [rows] = await db.query(
            `${SELECT_CHAMADO} WHERE c.tecnico_id = ? ORDER BY c.criado_em DESC`,
            [tecnico_id]
        );
        return rows;
    }

    static async findById(id) {
        const [rows] = await db.query(`${SELECT_CHAMADO} WHERE c.id = ?`, [id]);
        return rows[0];
    }

    static async findByIdAndSolicitante(id, solicitante_id) {
        const [rows] = await db.query(
            `${SELECT_CHAMADO} WHERE c.id = ? AND c.solicitante_id = ?`,
            [id, solicitante_id]
        );
        return rows[0];
    }

    static async findByIdAndTecnico(id, tecnico_id) {
        const [rows] = await db.query(
            `${SELECT_CHAMADO} WHERE c.id = ? AND c.tecnico_id = ?`,
            [id, tecnico_id]
        );
        return rows[0];
    }
}

module.exports = chamadoModel;
