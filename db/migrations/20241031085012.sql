-- Disable the enforcement of foreign-keys constraints
PRAGMA foreign_keys = off;
-- Create "new_token" table
CREATE TABLE `new_token` (
 `id` integer NULL PRIMARY KEY AUTOINCREMENT,
 `accessToken` varchar NULL,
 `accessExpiration` datetime NULL,
 `refreshToken` varchar NULL,
 `refreshExpiration` datetime NULL,
 `userId` integer NOT NULL,
 CONSTRAINT `0` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE NO ACTION
);
-- Copy rows from old table "token" to new temporary table "new_token"
INSERT INTO `new_token` (`id`, `accessToken`, `accessExpiration`, `refreshToken`, `refreshExpiration`, `userId`) SELECT `id`, `accessToken`, `accessExpiration`, `refreshToken`, `refreshExpiration`, `userId` FROM `token`;
-- Drop "token" table after copying rows
DROP TABLE `token`;
-- Rename temporary table "new_token" to "token"
ALTER TABLE `new_token` RENAME TO `token`;
-- Create "shopping_list" table
CREATE TABLE `shopping_list` (
 `id` integer NULL PRIMARY KEY AUTOINCREMENT,
 `items` blob NULL,
 `userId` integer NULL,
 CONSTRAINT `0` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE ON DELETE NO ACTION
);
-- Enable back the enforcement of foreign-keys constraints
PRAGMA foreign_keys = on;
