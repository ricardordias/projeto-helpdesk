const pool = require("../src/config/database");
const bcrypt = require("bcryptjs");

async function seed() {
    let conn;
    try {
        console.log("Iniciando seed do banco de dados...");
        conn = await pool.getConnection();
        await conn.beginTransaction();

        await conn.query("SET FOREIGN_KEY_CHECKS = 0");

        await conn.query("TRUNCATE TABLE tb_chamados");
        await conn.query("TRUNCATE TABLE tb_usuarios");
        await conn.query("TRUNCATE TABLE tb_tecnicos");
        await conn.query("TRUNCATE TABLE tb_categorias");
        await conn.query("TRUNCATE TABLE tb_solicitantes");

        await conn.query(`
            INSERT INTO tb_solicitantes (id, nome, email, setor) VALUES
            (1, 'Ana Souza',  'ana.souza@empresa.com',  'Financeiro'),
            (2, 'Bruno Lima', 'bruno.lima@empresa.com', 'RH')
        `);
        console.log("✔ Solicitantes inseridos.");

        await conn.query(`
            INSERT INTO tb_categorias (id, nome, descricao) VALUES
            (1, 'Hardware', 'Problemas com equipamentos físicos'),
            (2, 'Software', 'Problemas com programas e sistemas'),
            (3, 'Rede',     'Problemas de conexão e internet')
        `);
        console.log("✔ Categorias inseridas.");

        await conn.query(`
            INSERT INTO tb_tecnicos (id, nome, email) VALUES
            (1, 'Carlos Pereira', 'carlos.pereira@helpdesk.com'),
            (2, 'Daniela Rocha',  'daniela.rocha@helpdesk.com')
        `);
        console.log("✔ Técnicos inseridos.");

        const senhaHash = await bcrypt.hash("senha123", 10);
        await conn.query(`
            INSERT INTO tb_usuarios (id, nome, email, senha_hash, perfil, solicitante_id, tecnico_id) VALUES
            (1, 'Administrador',  'admin@helpdesk.com',          ?, 'ADMIN',       NULL, NULL),
            (2, 'Ana Souza',      'ana.souza@empresa.com',       ?, 'SOLICITANTE', 1,    NULL),
            (3, 'Bruno Lima',     'bruno.lima@empresa.com',      ?, 'SOLICITANTE', 2,    NULL),
            (4, 'Carlos Pereira', 'carlos.pereira@helpdesk.com', ?, 'TECNICO',     NULL, 1),
            (5, 'Daniela Rocha',  'daniela.rocha@helpdesk.com',  ?, 'TECNICO',     NULL, 2)
        `, [senhaHash, senhaHash, senhaHash, senhaHash, senhaHash]);
        console.log("✔ Usuários inseridos (senha: senha123).");

        await conn.query(`
            INSERT INTO tb_chamados
                (id, titulo, descricao, prioridade, status, solucao, solicitante_id, categoria_id, tecnico_id)
            VALUES
            (1, 'Impressora não imprime',
                'A impressora do setor financeiro não responde aos comandos de impressão.',
                'MEDIA', 'EM_ATENDIMENTO', NULL, 1, 1, 1),
            (2, 'Erro ao abrir o ERP',
                'Ao abrir o ERP aparece "Falha na conexão com o servidor".',
                'ALTA', 'ABERTO', NULL, 1, 2, NULL),
            (3, 'Acesso à pasta compartilhada',
                'Preciso de acesso à pasta \\\\servidor\\\\financeiro.',
                'BAIXA', 'CONCLUIDO', 'Acesso concedido conforme política do setor.', 2, 2, 2),
            (4, 'Sem conexão com a internet',
                'Minha estação está sem internet desde as 9h.',
                'ALTA', 'ABERTO', NULL, 2, 3, NULL)
        `);
        console.log("✔ Chamados inseridos.");

        await conn.query("SET FOREIGN_KEY_CHECKS = 1");
        await conn.commit();
        console.log("✔ Seed concluído com sucesso!");
    } catch (error) {
        if (conn) await conn.rollback();
        console.error("✖ Erro durante o seed:", error.message);
        process.exitCode = 1;
    } finally {
        if (conn) {
            try {
                await conn.query("SET FOREIGN_KEY_CHECKS = 1");
            } catch (_) { /* ignora */ }
            conn.release();
        }
        await pool.end();
    }
}

seed();