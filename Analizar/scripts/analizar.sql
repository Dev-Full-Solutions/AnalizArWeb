-- MySQL Script generated by MySQL Workbench
-- Thu Nov 10 09:32:46 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Analizar
-- -----------------------------------------------------
-- Base de datos del proyecto Analizar

-- -----------------------------------------------------
-- Schema Analizar
--
-- Base de datos del proyecto Analizar
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Analizar` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `Analizar` ;

-- -----------------------------------------------------
-- Table `Analizar`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Analizar`.`usuarios` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `celular` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `habilitado` TINYINT NOT NULL DEFAULT 1,
  `fechaAlta` DATETIME NOT NULL DEFAULT timestamp(),
  `admin` TINYINT NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Analizar`.`administradores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Analizar`.`administradores` (
  `idAdministrador` INT NOT NULL AUTO_INCREMENT,
  `usuario` INT NOT NULL,
  `fechaAlta` DATETIME NOT NULL DEFAULT timestamp(),
  PRIMARY KEY (`idAdministrador`),
  INDEX `FK_usuario_idx` (`usuario` ASC) VISIBLE,
  CONSTRAINT `FK_usuario`
    FOREIGN KEY (`usuario`)
    REFERENCES `Analizar`.`usuarios` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Analizar`.`Medidores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Analizar`.`Medidores` (
  `idMedidor` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `detalle` VARCHAR(45) NOT NULL,
  `identificador` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idMedidor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Analizar`.`alertas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Analizar`.`alertas` (
  `idalerta` INT NOT NULL AUTO_INCREMENT,
  `medidor` INT NOT NULL,
  `valor` FLOAT NOT NULL,
  `fechaAlta` DATETIME NOT NULL DEFAULT timestamp(),
  PRIMARY KEY (`idalerta`),
  INDEX `FK_medidor_idx` (`medidor` ASC) VISIBLE,
  CONSTRAINT `FK_medidor`
    FOREIGN KEY (`medidor`)
    REFERENCES `Analizar`.`Medidores` (`idMedidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Analizar`.`MisMedidores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Analizar`.`MisMedidores` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario` INT NOT NULL,
  `medidor` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_usuario_idx` (`usuario` ASC) VISIBLE,
  INDEX `FK_medidor_idx` (`medidor` ASC) VISIBLE,
  CONSTRAINT `FK_usuario`
    FOREIGN KEY (`usuario`)
    REFERENCES `Analizar`.`usuarios` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_medidor`
    FOREIGN KEY (`medidor`)
    REFERENCES `Analizar`.`Medidores` (`idMedidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Analizar`.`consumos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Analizar`.`consumos` (
  `idconsumos` INT NOT NULL,
  `medidor` INT NOT NULL,
  `fechamedicion` DATETIME NOT NULL,
  `consumo` FLOAT NOT NULL,
  PRIMARY KEY (`idconsumos`),
  INDEX `FK_medidor_idx` (`medidor` ASC) VISIBLE,
  CONSTRAINT `FK_medidor`
    FOREIGN KEY (`medidor`)
    REFERENCES `Analizar`.`Medidores` (`idMedidor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;