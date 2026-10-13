const pool = require("../src/config/database");
const bcrypt = require("bcryptjs");

async function seed() {
    try {
        console.log("Iniciando seed do banco de dados...");

        await pool.query("SET FOREIGN_KEY_CHECKS = 0;");

        // Limpa tabelas
        await pool.query("TRUNCATE TABLE tb_chamados;");
        await pool.query("TRUNCATE TABLE tb_usuarios;");
        await pool.query("TRUNCATE TABLE tb_tecnicos;");
        await pool.query("TRUNCATE TABLE tb_categorias;");
        await pool.query("TRUNCATE TABLE tb_solicitantes;");

        // 1. Inserir Solicitantes de demonstração
        await pool.query(`
            INSERT INTO tb_solicitantes (id, nome, email, setor) VALUES
            (1, 'Ana Souza', 'ana.souza@empresa.com', 'Financeiro'),
            (2, 'Bruno Lima', 'bruno.lima@empresa.com', 'RH');
        `);
        console.log("Solicitantes de demonstração inseridos.");

        // 2. Inserir Categorias de demonstração
        await pool.query(`
            INSERT INTO tb_categorias (id, nome, descricao) VALUES
            (1, 'Hardware', 'Problemas com equipamentos físicos'),
            (2, 'Software', 'Problemas com programas e sistemas'),
            (3, 'Rede', 'Problemas de conexão e internet');
        `);
        console.log("Categorias de demonstração inseridas.");

        // 3. Inserir Técnicos de demonstração
        await pool.query(`
            INSERT INTO tb_tecnicos (id, nome, email) VALUES
            (1, 'Carlos Pereira', 'carlos.pereira@helpdesk.com'),
            (2, 'Daniela Rocha', 'daniela.rocha@helpdesk.com');
        `);
        console.log("Técnicos de demonstração inseridos.");

        // 4. Inserir Contas de Usuários com hash de senha
        const senhaHash = await bcrypt.hash("senha123", 10);
        await pool.query(`
            INSERT INTO tb_usuarios (id, nome, email, senha_hash, perfil, solicitante_id, tecnico_id) VALUES
            (1, 'Administrador', 'admin@helpdesk.com', ?, 'ADMIN', NULL, NULL),
            (2, 'Ana Souza', 'ana.souza@empresa.com', ?, 'SOLICITANTE', 1, NULL),
            (3, 'Bruno Lima', 'bruno.lima@empresa.com', ?, 'SOLICITANTE', 2, NULL),
            (4, 'Carlos Pereira', 'carlos.pereira@helpdesk.com', ?, 'TECNICO', NULL, 1),
            (5, 'Daniela Rocha', 'daniela.rocha@helpdesk.com', ?, 'TECNICO', NULL, 2);
        `, [senhaHash, senhaHash, senhaHash, senhaHash, senhaHash]);
        console.log("Usuários de demonstração inseridos.");

        // 5. Inserir Chamados de demonstração
        await pool.query(`
            INSERT INTO tb_chamados (id, titulo, descricao, prioridade, status, solucao, solicitante_id, categoria_id, tecnico_id) VALUES
            (1, 'Impressora não imprime', 'A impressora do setor financeiro não responde aos comandos de impressão.', 'MEDIA', 'EM_ATENDIMENTO', NULL, 1, 1, 1),
            (2, 'Erro ao abrir o ERP', 'Ao abrir o ERP aparece "Falha na conexão com o servidor".', 'ALTA', 'ABERTO', NULL, 1, 2, NULL),
            (3, 'Acesso à pasta compartilhada', 'Preciso de acesso à pasta \\\\servidor\\\\financeiro.', 'BAIXA', 'CONCLUIDO', 'Acesso concedido conforme política do setor.', 2, 2, 2),
            (4, 'Sem conexão com a internet', 'Minha estação está sem internet desde as 9h.', 'ALTA', 'ABERTO', NULL, 2, 3, NULL);
        `);
        console.log("Chamados de demonstração inseridos.");

        await pool.query("SET FOREIGN_KEY_CHECKS = 1;");
        console.log("Seed concluído com sucesso!");
    } catch (error) {
        console.error("Erro durante o seed:", error);
    } finally {
        await pool.end();
    }
}

seed();

