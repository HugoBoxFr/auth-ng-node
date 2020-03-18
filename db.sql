DROP DATABASE authentification_db;

CREATE DATABASE authentification_db;

USE authentification_db;

CREATE TABLE `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100),
  `password` VARCHAR(100),
  `role` VARCHAR(100),
  PRIMARY KEY (`id`)
);

/* commande à faire après creation de son admin */
UPDATE user SET role = 'admin' WHERE id=1;
