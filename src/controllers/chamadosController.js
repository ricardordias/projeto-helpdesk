const pool = require("../config/database");

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

class chamadosController {
    // RF05 — POST /chamados (só SOLICITANTE)
    static async create(req, res, next) {
        try {
            const { titulo, descricao, prioridade, categoria_id } = req.body;

            // RN04 — campos obrigatórios
            if (!titulo || !descricao || !prioridade || !categoria_id) {
                return res.status(400).json({
                    erro: "Título, descrição, prioridade e categoria são obrigatórios."
                });
            }

            // RN02 — prioridade válida
            if (!["BAIXA", "MEDIA", "ALTA"].includes(prioridade)) {
                return res.status(400).json({
                    erro: "Prioridade inválida. Use BAIXA, MEDIA ou ALTA."
                });
            }

            // RN06 — rejeitar campos que o cliente não define
            const proibidos = ["solicitante_id", "tecnico_id", "status", "solucao", "criado_em"];
            if (Object.keys(req.body).some(c => proibidos.includes(c))) {
                return res.status(400).json({
                    erro: "Campos não permitidos na abertura de chamado."
                });
            }

            // RN05 — categoria deve existir
            const [cat] = await pool.query(
                "SELECT id FROM tb_categorias WHERE id = ?",
                [categoria_id]
            );
            if (cat.length === 0) {
                return res.status(400).json({ erro: "Categoria não encontrada." });
            }

            // RN01 — status ABERTO + tecnico_id NULL + solicitante do token
            const [result] = await pool.query(
                `INSERT INTO tb_chamados
                    (titulo, descricao, prioridade, status, solicitante_id, categoria_id, tecnico_id, criado_em)
                 VALUES (?, ?, ?, 'ABERTO', ?, ?, NULL, NOW())`,
                [titulo, descricao, prioridade, req.user.solicitante_id, categoria_id]
            );

            const [rows] = await pool.query(
                `${SELECT_CHAMADO} WHERE c.id = ?`,
                [result.insertId]
            );

            return res.status(201).json(rows[0]);
        } catch (error) {
            next(error);
        }
    }

    // RF06 — GET /chamados (filtra por perfil)
    static async list(req, res, next) {
        try {
            let where = "";
            const params = [];

            if (req.user.perfil === "SOLICITANTE") {
                where = "WHERE c.solicitante_id = ?";
                params.push(req.user.solicitante_id);
            } else if (req.user.perfil === "TECNICO") {
                where = "WHERE c.tecnico_id = ?";
                params.push(req.user.tecnico_id);
            }
            // ADMIN: sem WHERE

            const [rows] = await pool.query(
                `${SELECT_CHAMADO} ${where} ORDER BY c.criado_em DESC`,
                params
            );

            return res.status(200).json(rows);
        } catch (error) {
            next(error);
        }
    }

    // RF06 — GET /chamados/:id (404 se não pertence ao usuário — não vaza existência)
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            let where = "WHERE c.id = ?";
            const params = [id];

            if (req.user.perfil === "SOLICITANTE") {
                where += " AND c.solicitante_id = ?";
                params.push(req.user.solicitante_id);
            } else if (req.user.perfil === "TECNICO") {
                where += " AND c.tecnico_id = ?";
                params.push(req.user.tecnico_id);
            }

            const [rows] = await pool.query(`${SELECT_CHAMADO} ${where}`, params);

            if (rows.length === 0) {
                return res.status(404).json({ erro: "Chamado não encontrado." });
            }

            return res.status(200).json(rows[0]);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = chamadosController;