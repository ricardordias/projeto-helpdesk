USE db_helpdesk;

-- 2 solicitantes
INSERT INTO tb_solicitantes (id, nome, email, setor) VALUES
(1, 'Ana Souza',  'ana.souza@empresa.com',  'Financeiro'),
(2, 'Bruno Lima', 'bruno.lima@empresa.com', 'RH');

-- categorias
INSERT INTO tb_categorias (id, nome, descricao) VALUES
(1, 'Hardware', 'Problemas com equipamentos físicos'),
(2, 'Software', 'Problemas com programas e sistemas'),
(3, 'Rede',     'Problemas de conexão e internet');

-- 2 técnicos
INSERT INTO tb_tecnicos (id, nome, email) VALUES
(1, 'Carlos Pereira', 'carlos.pereira@helpdesk.com'),
(2, 'Daniela Rocha',  'daniela.rocha@helpdesk.com');

-- contas (senha: senha123  ->  hash bcrypt abaixo)
INSERT INTO tb_usuarios (id, nome, email, senha_hash, perfil, solicitante_id, tecnico_id) VALUES
(1, 'Administrador', 'admin@helpdesk.com',          '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN',       NULL, NULL),
(2, 'Ana Souza',     'ana.souza@empresa.com',       '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'SOLICITANTE', 1,    NULL),
(3, 'Bruno Lima',    'bruno.lima@empresa.com',      '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'SOLICITANTE', 2,    NULL),
(4, 'Carlos Pereira','carlos.pereira@helpdesk.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'TECNICO',     NULL, 1),
(5, 'Daniela Rocha', 'daniela.rocha@helpdesk.com',  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'TECNICO',     NULL, 2);

-- chamados variados (RF demonstração)
INSERT INTO tb_chamados (id, titulo, descricao, prioridade, status, solucao, solicitante_id, categoria_id, tecnico_id) VALUES
(1, 'Impressora não imprime',
    'A impressora do setor financeiro não responde aos comandos de impressão.',
    'MEDIA', 'EM_ATENDIMENTO', NULL, 1, 1, 1),
(2, 'Erro ao abrir o ERP',
    'Ao abrir o ERP aparece "Falha na conexão com o servidor".',
    'ALTA', 'ABERTO', NULL, 1, 2, NULL),
(3, 'Acesso à pasta compartilhada',
    'Preciso de acesso à pasta \\\\servidor\\financeiro.',
    'BAIXA', 'CONCLUIDO', 'Acesso concedido conforme política do setor.', 2, 2, 2),
(4, 'Sem conexão com a internet',
    'Minha estação está sem internet desde as 9h.',
    'ALTA', 'ABERTO', NULL, 2, 3, NULL);