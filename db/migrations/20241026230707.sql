-- Create "token" table
CREATE TABLE `token` (
 `id` integer NULL PRIMARY KEY AUTOINCREMENT,
 `accessToken` varchar NULL,
 `accessTokenExpiration` datetime NULL,
 `refreshToken` varchar NULL,
 `refreshTokenExpiration` datetime NULL
);
-- Create "user" table
CREATE TABLE `user` (
 `id` integer NULL PRIMARY KEY AUTOINCREMENT,
 `username` varchar NOT NULL,
 `email` varchar NOT NULL,
 `password` varchar NULL
);
-- Create index "user_username" to table: "user"
CREATE UNIQUE INDEX `user_username` ON `user` (`username`);
-- Create index "user_email" to table: "user"
CREATE UNIQUE INDEX `user_email` ON `user` (`email`);
