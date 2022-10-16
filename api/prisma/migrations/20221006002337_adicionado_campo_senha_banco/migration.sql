/*
  Warnings:

  - Added the required column `senha` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `senha` VARCHAR(1000) NOT NULL;
