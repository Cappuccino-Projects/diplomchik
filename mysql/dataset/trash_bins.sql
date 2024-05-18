/*
 Navicat Premium Data Transfer

 Source Server         : Local MAMP (MySQL)
 Source Server Type    : MySQL
 Source Server Version : 50724 (5.7.24)
 Source Host           : localhost:3306
 Source Schema         : all_places

 Target Server Type    : MySQL
 Target Server Version : 50724 (5.7.24)
 File Encoding         : 65001

 Date: 18/05/2024 19:14:59
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for change_types
-- ----------------------------
DROP TABLE IF EXISTS `change_types`;
CREATE TABLE `change_types`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `product_type_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of change_types
-- ----------------------------
INSERT INTO `change_types` VALUES (4, 'Добавить маршрут');
INSERT INTO `change_types` VALUES (1, 'Добавить место');
INSERT INTO `change_types` VALUES (5, 'Изменить маршрут');
INSERT INTO `change_types` VALUES (2, 'Изменить место');
INSERT INTO `change_types` VALUES (6, 'Удалить маршрут');
INSERT INTO `change_types` VALUES (3, 'Удалить место');

-- ----------------------------
-- Table structure for changes
-- ----------------------------
DROP TABLE IF EXISTS `changes`;
CREATE TABLE `changes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `place_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `timestamp` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_changes_change_types_1`(`type_id`) USING BTREE,
  INDEX `fk_changes_users_1`(`user_id`) USING BTREE,
  INDEX `fk_changes_places_1`(`place_id`) USING BTREE,
  CONSTRAINT `fk_changes_change_types_1` FOREIGN KEY (`type_id`) REFERENCES `change_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_changes_places_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_changes_users_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of changes
-- ----------------------------
INSERT INTO `changes` VALUES (1, 1, 1, 1, '2024-05-13 22:07:40');
INSERT INTO `changes` VALUES (2, 1, 2, 2, '2024-05-13 21:12:55');
INSERT INTO `changes` VALUES (3, 2, 3, 1, '2024-05-03 12:44:02');

-- ----------------------------
-- Table structure for cities
-- ----------------------------
DROP TABLE IF EXISTS `cities`;
CREATE TABLE `cities`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `city_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of cities
-- ----------------------------
INSERT INTO `cities` VALUES (1, 'Димитровград');

-- ----------------------------
-- Table structure for missions
-- ----------------------------
DROP TABLE IF EXISTS `missions`;
CREATE TABLE `missions`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `icon_path` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `exp_award` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `mission_title`(`title`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of missions
-- ----------------------------
INSERT INTO `missions` VALUES (1, 'Ваше мнение важно', 'Оставьте отзыв на месте', 'review-mission-icon', 15);
INSERT INTO `missions` VALUES (2, 'Что-то интересное?', 'Посмотрите чужие отзывы', 'trophy-mission-icon', 15);
INSERT INTO `missions` VALUES (3, 'Нет, только показываем', 'Посетите красивое место', 'nice-mission-icon', 15);
INSERT INTO `missions` VALUES (4, 'Сейчас бы фоточку…', 'Загрузите фотографию места', 'photo-mission-icon', 15);
INSERT INTO `missions` VALUES (5, 'Зеленая трава', 'Выбросите мусор в мусорку', 'grass-mission-icon', 15);
INSERT INTO `missions` VALUES (6, 'Не только крошечки', 'Покормите птиц', 'bird-mission-icon', 15);
INSERT INTO `missions` VALUES (7, 'Немного отдохнем', 'Посидите на лавочке', 'bench-mission-icon', 15);
INSERT INTO `missions` VALUES (8, 'string', 'string', 'string', 1);
INSERT INTO `missions` VALUES (10, 'string2', 'string', 'string', 1);

-- ----------------------------
-- Table structure for missions_users
-- ----------------------------
DROP TABLE IF EXISTS `missions_users`;
CREATE TABLE `missions_users`  (
  `mission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`user_id`, `mission_id`) USING BTREE,
  INDEX `fk_missions_users_missions_1`(`mission_id`) USING BTREE,
  INDEX `fk_missions_users_statuses_1`(`status_id`) USING BTREE,
  CONSTRAINT `fk_missions_users_missions_1` FOREIGN KEY (`mission_id`) REFERENCES `missions` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_missions_users_statuses_1` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_missions_users_users_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of missions_users
-- ----------------------------
INSERT INTO `missions_users` VALUES (1, 1, 1);
INSERT INTO `missions_users` VALUES (4, 1, 1);
INSERT INTO `missions_users` VALUES (1, 2, 1);
INSERT INTO `missions_users` VALUES (2, 2, 1);
INSERT INTO `missions_users` VALUES (2, 1, 2);
INSERT INTO `missions_users` VALUES (3, 1, 4);

-- ----------------------------
-- Table structure for place_types
-- ----------------------------
DROP TABLE IF EXISTS `place_types`;
CREATE TABLE `place_types`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `place_type_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of place_types
-- ----------------------------
INSERT INTO `place_types` VALUES (4, 'Детская площадка');
INSERT INTO `place_types` VALUES (7, 'Кафе');
INSERT INTO `place_types` VALUES (1, 'Лавочка');
INSERT INTO `place_types` VALUES (6, 'Место для фото');
INSERT INTO `place_types` VALUES (8, 'Место отдыха');
INSERT INTO `place_types` VALUES (5, 'Место прикормки птиц');
INSERT INTO `place_types` VALUES (2, 'Мусорка');
INSERT INTO `place_types` VALUES (3, 'Мусорные баки');
INSERT INTO `place_types` VALUES (9, 'Туалет');

-- ----------------------------
-- Table structure for places
-- ----------------------------
DROP TABLE IF EXISTS `places`;
CREATE TABLE `places`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type_id` int(11) NOT NULL,
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `latitude` decimal(9, 6) NOT NULL,
  `longitude` decimal(9, 6) NOT NULL,
  `photo_path` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_places_place_types_1`(`type_id`) USING BTREE,
  CONSTRAINT `fk_places_place_types_1` FOREIGN KEY (`type_id`) REFERENCES `place_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of places
-- ----------------------------
INSERT INTO `places` VALUES (1, NULL, 1, '\r\nул. Славского, д. 16', 54.238319, 49.558386, NULL);
INSERT INTO `places` VALUES (2, NULL, 1, 'ул. Славского, д. 16', 54.238059, 49.558395, 'test_photo');
INSERT INTO `places` VALUES (3, 'Площадка у дома', 4, NULL, 54.238203, 49.558651, NULL);
INSERT INTO `places` VALUES (4, NULL, 3, NULL, 54.238653, 49.558618, 'test_photo_2');
INSERT INTO `places` VALUES (5, 'Тест', 1, 'Тест', 1.000000, 1.000000, NULL);
INSERT INTO `places` VALUES (6, 'string', 1, 'string', 1.000000, 1.000000, 'string');
INSERT INTO `places` VALUES (7, 'string2', 1, 'string', 1.000000, 1.000000, 'string');

-- ----------------------------
-- Table structure for product_types
-- ----------------------------
DROP TABLE IF EXISTS `product_types`;
CREATE TABLE `product_types`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `product_type_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of product_types
-- ----------------------------
INSERT INTO `product_types` VALUES (1, 'Персонаж');
INSERT INTO `product_types` VALUES (2, 'Рамка аватара');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `type_id` int(11) NOT NULL,
  `price` decimal(10, 2) NOT NULL DEFAULT 1.00,
  `icon_path` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `product_name`(`name`) USING BTREE,
  INDEX `fk_products_product_types_1`(`type_id`) USING BTREE,
  CONSTRAINT `fk_products_product_types_1` FOREIGN KEY (`type_id`) REFERENCES `product_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (1, 'Веселье', 2, 200.00, 'avatar_frame1');
INSERT INTO `products` VALUES (2, 'Киберпанк', 2, 200.00, 'avatar_frame2');
INSERT INTO `products` VALUES (3, 'Потерянное королевство', 2, 200.00, 'avatar_frame3');
INSERT INTO `products` VALUES (4, 'Роса', 2, 200.00, 'avatar_frame4');
INSERT INTO `products` VALUES (5, 'Нежность', 2, 200.00, 'avatar_frame5');
INSERT INTO `products` VALUES (6, 'Руины', 2, 200.00, 'avatar_frame6');
INSERT INTO `products` VALUES (7, 'Конец света', 2, 200.00, 'avatar_frame7');
INSERT INTO `products` VALUES (8, 'Круглость', 2, 200.00, 'avatar_frame8');
INSERT INTO `products` VALUES (9, 'Пастель', 2, 200.00, 'avatar_frame9');
INSERT INTO `products` VALUES (10, 'Мегатрон', 2, 200.00, 'avatar_frame10');
INSERT INTO `products` VALUES (11, 'Рассвет', 2, 200.00, 'avatar_frame11');
INSERT INTO `products` VALUES (12, 'Безмятежность', 2, 200.00, 'avatar_frame12');
INSERT INTO `products` VALUES (13, 'Цветение', 2, 200.00, 'avatar_frame13');
INSERT INTO `products` VALUES (14, 'Снежность', 2, 200.00, 'avatar_frame14');
INSERT INTO `products` VALUES (15, 'Домик в горах', 2, 200.00, 'avatar_frame15');
INSERT INTO `products` VALUES (16, 'Медитация', 2, 200.00, 'avatar_frame16');
INSERT INTO `products` VALUES (17, 'Ангел Соня', 1, 250.00, 'angel');
INSERT INTO `products` VALUES (19, 'Ангел Соня BG', 1, 300.00, 'angelbg');
INSERT INTO `products` VALUES (20, 'Демон Варя', 1, 250.00, 'demon');
INSERT INTO `products` VALUES (21, 'Демон Варя BG', 1, 300.00, 'demonbg');
INSERT INTO `products` VALUES (22, 'Эльф Варвара', 1, 250.00, 'girl');
INSERT INTO `products` VALUES (23, 'Эльф Варвара BG', 1, 300.00, 'girlbg');
INSERT INTO `products` VALUES (24, 'Вампир Миша', 1, 250.00, 'vampire');
INSERT INTO `products` VALUES (25, 'Вампир Миша BG', 1, 300.00, 'vampirebg');
INSERT INTO `products` VALUES (26, 'string', 1, 1.00, 'string');
INSERT INTO `products` VALUES (28, 'string1', 1, 1.00, 'string');
INSERT INTO `products` VALUES (29, 'string7', 1, 1.00, 'string');

-- ----------------------------
-- Table structure for ranks
-- ----------------------------
DROP TABLE IF EXISTS `ranks`;
CREATE TABLE `ranks`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `city_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ranks
-- ----------------------------
INSERT INTO `ranks` VALUES (10, 'Великий искатель');
INSERT INTO `ranks` VALUES (1, 'Вольный странник');
INSERT INTO `ranks` VALUES (5, 'Главный навигатор');
INSERT INTO `ranks` VALUES (9, 'Исследователь изогнутых троп');
INSERT INTO `ranks` VALUES (6, 'Капитан координат');
INSERT INTO `ranks` VALUES (3, 'Любимец дорог');
INSERT INTO `ranks` VALUES (2, 'Начинающий навигатор');
INSERT INTO `ranks` VALUES (8, 'Опытный путешественник');
INSERT INTO `ranks` VALUES (7, 'Покоритель горизонтов');
INSERT INTO `ranks` VALUES (4, 'Честный наблюдатель');

-- ----------------------------
-- Table structure for reviews
-- ----------------------------
DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NULL DEFAULT NULL,
  `place_id` int(11) NOT NULL,
  `rank` int(11) NOT NULL,
  `comment` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `photo_path` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_reviews_users_1`(`user_id`) USING BTREE,
  INDEX `fk_reviews_places_1`(`place_id`) USING BTREE,
  CONSTRAINT `fk_reviews_places_1` FOREIGN KEY (`place_id`) REFERENCES `places` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_reviews_users_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of reviews
-- ----------------------------
INSERT INTO `reviews` VALUES (1, 1, 2, 5, 'Лучшая лавочка i ever seen!', NULL);
INSERT INTO `reviews` VALUES (2, 1, 1, 4, NULL, NULL);
INSERT INTO `reviews` VALUES (3, 2, 3, 1, 'Мои дети упали', NULL);

-- ----------------------------
-- Table structure for statuses
-- ----------------------------
DROP TABLE IF EXISTS `statuses`;
CREATE TABLE `statuses`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `status_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of statuses
-- ----------------------------
INSERT INTO `statuses` VALUES (1, 'Открыто', NULL);
INSERT INTO `statuses` VALUES (2, 'Выполняется', NULL);
INSERT INTO `statuses` VALUES (4, 'Выполнено', NULL);

-- ----------------------------
-- Table structure for themes
-- ----------------------------
DROP TABLE IF EXISTS `themes`;
CREATE TABLE `themes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `theme_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of themes
-- ----------------------------
INSERT INTO `themes` VALUES (1, 'Светлая');
INSERT INTO `themes` VALUES (2, 'Тёмная');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `display_name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password_hash` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `city_id` int(11) NOT NULL DEFAULT 1,
  `avatar_path` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `theme_id` int(11) NULL DEFAULT NULL,
  `rank_id` int(11) NOT NULL DEFAULT 1,
  `experience` int(11) NOT NULL DEFAULT 0,
  `balance` decimal(10, 2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `user_login`(`login`) USING BTREE,
  UNIQUE INDEX `user_email`(`email`) USING BTREE,
  INDEX `fk_users_cities_1`(`city_id`) USING BTREE,
  INDEX `fk_users_themes_1`(`theme_id`) USING BTREE,
  INDEX `fk_users_ranks_1`(`rank_id`) USING BTREE,
  CONSTRAINT `fk_users_cities_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_ranks_1` FOREIGN KEY (`rank_id`) REFERENCES `ranks` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_users_themes_1` FOREIGN KEY (`theme_id`) REFERENCES `themes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'test', 'Test User', 'test@example.com', '123', 1, NULL, NULL, 1, 0, 0.00);
INSERT INTO `users` VALUES (2, 'test2', 'Test User 2', 'test2@example.com', '123', 1, 'test_avatar', 1, 1, 1000, 500.00);
INSERT INTO `users` VALUES (3, 'test3', 'Test User 3', 'test3@example.com', '123', 1, NULL, NULL, 1, 0, 0.00);

-- ----------------------------
-- Table structure for users_products
-- ----------------------------
DROP TABLE IF EXISTS `users_products`;
CREATE TABLE `users_products`  (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `active` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`user_id`, `product_id`) USING BTREE,
  INDEX `fk_users_products_products_1`(`product_id`) USING BTREE,
  CONSTRAINT `fk_users_products_products_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_users_products_users_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users_products
-- ----------------------------
INSERT INTO `users_products` VALUES (1, 1, b'1');
INSERT INTO `users_products` VALUES (1, 2, b'0');
INSERT INTO `users_products` VALUES (2, 1, b'1');

SET FOREIGN_KEY_CHECKS = 1;
