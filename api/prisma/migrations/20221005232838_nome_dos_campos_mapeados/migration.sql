-- CreateTable
CREATE TABLE `categoria_produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `nome` VARCHAR(150) NOT NULL,
    `descricao` VARCHAR(1000) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `nome` VARCHAR(150) NOT NULL,
    `estado_id` INTEGER NOT NULL,

    INDEX `fk_cidades_estados_idx`(`estado_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `colaboradores` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `ativo` BOOLEAN NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `projeto_id` INTEGER NOT NULL,

    INDEX `fk_colaboradores_projetos1_idx`(`projeto_id`),
    INDEX `fk_colaboradores_usuarios1_idx`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `titulo` VARCHAR(150) NOT NULL,
    `conteudo` VARCHAR(1000) NOT NULL,
    `tarefa_id` INTEGER NOT NULL,
    `colaborador_id` INTEGER NOT NULL,

    INDEX `fk_comentarios_colaboradores1_idx`(`colaborador_id`),
    INDEX `fk_comentarios_tarefas1_idx`(`tarefa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enderecos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `rua` VARCHAR(200) NOT NULL,
    `numero` INTEGER NOT NULL,
    `cep` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(600) NULL,
    `cidade_id` INTEGER NOT NULL,

    INDEX `fk_enderecos_cidades1_idx`(`cidade_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `nome` VARCHAR(150) NOT NULL,
    `sigla` VARCHAR(2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notificacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `titulo` VARCHAR(150) NOT NULL,
    `conteudo` VARCHAR(300) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    INDEX `fk_notificacoes_usuarios1_idx`(`usuario_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `nome` VARCHAR(150) NOT NULL,
    `descricao` VARCHAR(1000) NULL,
    `categoria_id` INTEGER NOT NULL,

    INDEX `fk_produtos_categoria_produtos1_idx`(`categoria_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projetos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `titulo` VARCHAR(200) NOT NULL,
    `descricao` VARCHAR(1000) NOT NULL,
    `data_inicio` DATE NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT false,
    `endereco_id` INTEGER NOT NULL,
    `projetista_id` INTEGER NOT NULL,

    INDEX `fk_projetos_enderecos1_idx`(`endereco_id`),
    INDEX `fk_projetos_usuarios1_idx`(`projetista_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recursos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `quantidade` DOUBLE NOT NULL,
    `descricao` VARCHAR(1000) NULL,
    `produto_id` INTEGER NOT NULL,
    `tarefa_id` INTEGER NOT NULL,

    INDEX `fk_recursos_produtos1_idx`(`produto_id`),
    INDEX `fk_recursos_tarefas1_idx`(`tarefa_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tarefas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `titulo` VARCHAR(150) NOT NULL,
    `descricao` VARCHAR(1000) NOT NULL,
    `data_inicio` DATE NOT NULL,
    `data_fim` DATE NOT NULL,
    `estado` ENUM('pendente', 'confirmada', 'concluida') NOT NULL DEFAULT 'pendente',
    `colaborador_id` INTEGER NOT NULL,

    INDEX `fk_tarefas_colaboradores1_idx`(`colaborador_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_criacao` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `data_atualizacao` TIMESTAMP(0) NULL,
    `nome` VARCHAR(150) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `data_nascimento` DATE NOT NULL,
    `nivel_acesso` ENUM('projetista', 'administrador', 'empregado') NOT NULL DEFAULT 'empregado',
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `endereco_id` INTEGER NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    INDEX `fk_usuarios_enderecos1_idx`(`endereco_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cidades` ADD CONSTRAINT `fk_cidades_estados` FOREIGN KEY (`estado_id`) REFERENCES `estados`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `colaboradores` ADD CONSTRAINT `fk_colaboradores_projetos1` FOREIGN KEY (`projeto_id`) REFERENCES `projetos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `colaboradores` ADD CONSTRAINT `fk_colaboradores_usuarios1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `fk_comentarios_colaboradores1` FOREIGN KEY (`colaborador_id`) REFERENCES `colaboradores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `fk_comentarios_tarefas1` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `enderecos` ADD CONSTRAINT `fk_enderecos_cidades1` FOREIGN KEY (`cidade_id`) REFERENCES `cidades`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notificacoes` ADD CONSTRAINT `fk_notificacoes_usuarios1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `produtos` ADD CONSTRAINT `fk_produtos_categoria_produtos1` FOREIGN KEY (`categoria_id`) REFERENCES `categoria_produtos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projetos` ADD CONSTRAINT `fk_projetos_enderecos1` FOREIGN KEY (`endereco_id`) REFERENCES `enderecos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `projetos` ADD CONSTRAINT `fk_projetos_usuarios1` FOREIGN KEY (`projetista_id`) REFERENCES `usuarios`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `fk_recursos_produtos1` FOREIGN KEY (`produto_id`) REFERENCES `produtos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `fk_recursos_tarefas1` FOREIGN KEY (`tarefa_id`) REFERENCES `tarefas`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tarefas` ADD CONSTRAINT `fk_tarefas_colaboradores1` FOREIGN KEY (`colaborador_id`) REFERENCES `colaboradores`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `fk_usuarios_enderecos1` FOREIGN KEY (`endereco_id`) REFERENCES `enderecos`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
