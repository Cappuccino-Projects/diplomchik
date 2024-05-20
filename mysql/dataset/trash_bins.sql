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

 Date: 19/05/2024 15:36:27
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
) ENGINE = InnoDB AUTO_INCREMENT = 160 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

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
INSERT INTO `places` VALUES (8, NULL, 1, NULL, 54.243953, 49.598286, '063A85D780754AB69B2BCD5B8D7D72DF.jpg');
INSERT INTO `places` VALUES (9, NULL, 1, NULL, 54.238844, 49.559269, '0B9CAB22CF484077936BDEA9695A1AD3.jpg');
INSERT INTO `places` VALUES (10, NULL, 1, NULL, 54.235981, 49.562942, '0FF58E14D5FA40A884C79168D77CCB64.jpg');
INSERT INTO `places` VALUES (11, NULL, 1, NULL, 54.238739, 49.564083, '107216E0CFB54E77A91A6A73C0717F4E.jpg');
INSERT INTO `places` VALUES (12, NULL, 1, NULL, 54.240219, 49.556928, '15C1D1C99E4744F995CDC3457AC0AB04.jpg');
INSERT INTO `places` VALUES (13, NULL, 1, NULL, 54.243983, 49.598275, '1DFD9046FB8D40FF803C0EF61F4E8E9F.jpg');
INSERT INTO `places` VALUES (14, NULL, 1, NULL, 54.239658, 49.558839, '1F4766A18B1E407596451839B67CF9AC.jpg');
INSERT INTO `places` VALUES (15, NULL, 1, NULL, 54.240108, 49.557214, '201B291B13A14588AA9FB641B7175AF5.jpg');
INSERT INTO `places` VALUES (16, NULL, 1, NULL, 54.235881, 49.563100, '2191B383FA3246A08C3C626BDC8E2B1D.jpg');
INSERT INTO `places` VALUES (17, NULL, 1, NULL, 54.237131, 49.558475, '252DFAE64B584888BACCB257DD9BE2F9.jpg');
INSERT INTO `places` VALUES (18, NULL, 1, NULL, 54.240350, 49.557236, '2678A9C2B55C4E3EB6F0999589DDEEF4.jpg');
INSERT INTO `places` VALUES (19, NULL, 1, NULL, 54.239414, 49.559544, '28621794494A4668863F36F00200AD5F.jpg');
INSERT INTO `places` VALUES (20, NULL, 1, NULL, 54.237972, 49.558844, '294E4EACCA9545089752E49EC32BBD58.jpg');
INSERT INTO `places` VALUES (21, NULL, 1, NULL, 54.236319, 49.563164, '2FFA7A42D2F84BF98E177048807030BA.jpg');
INSERT INTO `places` VALUES (22, NULL, 1, NULL, 54.239472, 49.558983, '338E00521FDF437297134F99174092DC.jpg');
INSERT INTO `places` VALUES (23, NULL, 1, NULL, 54.239853, 49.559094, '355AF232F4EE4BDEB26B0ED49EA4AB91.jpg');
INSERT INTO `places` VALUES (24, NULL, 1, NULL, 54.239547, 49.559136, '42A8DB703B6145559563001E7CBAD1A0.jpg');
INSERT INTO `places` VALUES (25, NULL, 1, NULL, 54.237033, 49.558503, '45B17D5B2A9949DAA7397278A497CDF7.jpg');
INSERT INTO `places` VALUES (26, NULL, 1, NULL, 54.240275, 49.557197, '4E62A21002FC4F898B3D077D58F9F336.jpg');
INSERT INTO `places` VALUES (27, NULL, 1, NULL, 54.236183, 49.562806, '51CA515C5A884CB2B86D2166D94D5A62.jpg');
INSERT INTO `places` VALUES (28, NULL, 1, NULL, 54.237617, 49.564522, '5367F29BDAFD426DA8C663518387512D.jpg');
INSERT INTO `places` VALUES (29, NULL, 1, NULL, 54.239414, 49.559431, '542BD1319F434BD4A79AB0658832899B.jpg');
INSERT INTO `places` VALUES (30, NULL, 1, NULL, 54.236172, 49.562967, '5B7B3133D951496FBACE7533D1218751.jpg');
INSERT INTO `places` VALUES (31, NULL, 1, NULL, 54.238503, 49.559381, '6181784262D84F8587243CC6F9A309B2.jpg');
INSERT INTO `places` VALUES (32, NULL, 1, NULL, 54.236164, 49.562625, '64EEFA2AB8CD401E8CCFD8D38E5A14D6.jpg');
INSERT INTO `places` VALUES (33, NULL, 1, NULL, 54.236192, 49.562758, '67ADAD5BDA8D4EA5A782B534432871D6.jpg');
INSERT INTO `places` VALUES (34, NULL, 1, NULL, 54.245231, 49.598789, '6C281F4F95984C4EAA8D394229F4BE42.jpg');
INSERT INTO `places` VALUES (35, NULL, 1, NULL, 54.239792, 49.558936, '6E4FB7959864478587AA9F46A26DEE06.jpg');
INSERT INTO `places` VALUES (36, NULL, 1, NULL, 54.238706, 49.559289, '6EFE6E861F2645D4BC83C76B21E6AB24.jpg');
INSERT INTO `places` VALUES (37, NULL, 1, NULL, 54.238328, 49.558589, '6F73E737A0D141F6A7869D4B7487789A.jpg');
INSERT INTO `places` VALUES (38, NULL, 1, NULL, 54.235878, 49.563133, '6F73EF66823C41FD9A4B048BA2C7B48F.jpg');
INSERT INTO `places` VALUES (39, NULL, 1, NULL, 54.236125, 49.562967, '704A2FAE021C41F9935DAB123AC0FF12.jpg');
INSERT INTO `places` VALUES (40, NULL, 1, NULL, 54.239628, 49.559458, '79F6B401FAEC4228AAA11A5B502DC75D.jpg');
INSERT INTO `places` VALUES (41, NULL, 1, NULL, 54.236892, 49.563192, '7A1E62CDF5A14EF5B7F7B846EF7D4148.jpg');
INSERT INTO `places` VALUES (42, NULL, 1, NULL, 54.239106, 49.559292, '7A71EDB68CD4459D836552CDFAA1931A.jpg');
INSERT INTO `places` VALUES (43, NULL, 1, NULL, 54.237689, 49.564403, '8044560D338841BB879AB1992C04BDF9.jpg');
INSERT INTO `places` VALUES (44, NULL, 1, NULL, 54.239661, 49.559589, '80D9248FEA524DE995A34EB9609AB074.jpg');
INSERT INTO `places` VALUES (45, NULL, 1, NULL, 54.238617, 49.566906, '8F1C50227CDA4531AF156E333C7F7F53.jpg');
INSERT INTO `places` VALUES (46, NULL, 1, NULL, 54.238875, 49.559642, '95A00CF547274888A02366B509ABF267.jpg');
INSERT INTO `places` VALUES (47, NULL, 1, NULL, 54.237611, 49.558267, '9A80A3AB8DE44E268ECEE7BC3A851AF9.jpg');
INSERT INTO `places` VALUES (48, NULL, 1, NULL, 54.239400, 49.559239, '9B47DD8A82D242BDB8009A92429DAE1A.jpg');
INSERT INTO `places` VALUES (49, NULL, 1, NULL, 54.239514, 49.559533, '9C0D8C804E8B48FA94FC170784D8D134.jpg');
INSERT INTO `places` VALUES (50, NULL, 1, NULL, 54.237258, 49.558169, 'A0FE1E0D52E748399F387BEB09C2DD33.jpg');
INSERT INTO `places` VALUES (51, NULL, 1, NULL, 54.239006, 49.559167, 'A28B8CDBCAFF46EAB0FE687AD9518F3A.jpg');
INSERT INTO `places` VALUES (52, NULL, 1, NULL, 54.239144, 49.559558, 'A7503C7143664CD7B835775B6159CF53.jpg');
INSERT INTO `places` VALUES (53, NULL, 1, NULL, 54.239494, 49.559619, 'A909758874B744E29985B483DF2D9D43.jpg');
INSERT INTO `places` VALUES (54, NULL, 1, NULL, 54.239781, 49.558900, 'A97BAD3F530647098DCA077C25EBCB9A.jpg');
INSERT INTO `places` VALUES (55, NULL, 1, NULL, 54.235950, 49.562928, 'AA20DE93ACAB4FA090DF3539ED4EF020.jpg');
INSERT INTO `places` VALUES (56, NULL, 1, NULL, 54.239403, 49.559417, 'B53550BE93794BF7A870C80C74203779.jpg');
INSERT INTO `places` VALUES (57, NULL, 1, NULL, 54.236319, 49.563228, 'BD6B9278BA0D46C58D3BEA0C7AE5D5DD.jpg');
INSERT INTO `places` VALUES (58, NULL, 1, NULL, 54.236503, 49.563286, 'C29E2E04F71C4F54A103A4F98306EE82.jpg');
INSERT INTO `places` VALUES (59, NULL, 1, NULL, 54.238536, 49.567067, 'C348636BEC0049A28DD2EC051E765D97.jpg');
INSERT INTO `places` VALUES (60, NULL, 1, NULL, 54.238000, 49.558917, 'C6D955F81DAE4226AB8488FF1EC8EED5.jpg');
INSERT INTO `places` VALUES (61, NULL, 1, NULL, 54.239819, 49.558936, 'CEE15B9C121A4366898F682F929BD4C5.jpg');
INSERT INTO `places` VALUES (62, NULL, 1, NULL, 54.236800, 49.563061, 'D1BE0FD81AD445F8824DDB49D6E68248.jpg');
INSERT INTO `places` VALUES (63, NULL, 1, NULL, 54.237428, 49.557828, 'D7680A4F723F4B048919021F21DBE9B1.jpg');
INSERT INTO `places` VALUES (64, NULL, 1, NULL, 54.236497, 49.563258, 'D8AA41E73C924C98BE6551CA1E540460.jpg');
INSERT INTO `places` VALUES (65, NULL, 1, NULL, 54.236214, 49.563214, 'D986E835BB964E4D898A80DE3CCE0598.jpg');
INSERT INTO `places` VALUES (66, NULL, 1, NULL, 54.239636, 49.559475, 'DA12B131B7674C288E3E260BF9FBD317.jpg');
INSERT INTO `places` VALUES (67, NULL, 1, NULL, 54.238800, 49.559022, 'DB0FD7D1F54E4A91B024DAD6E1012333.jpg');
INSERT INTO `places` VALUES (68, NULL, 1, NULL, 54.239158, 49.559550, 'E26071757D404D4F9121CA10FB35D2D5.jpg');
INSERT INTO `places` VALUES (69, NULL, 1, NULL, 54.239708, 49.559806, 'E4CADFD682414B2182255A825B8B9192.jpg');
INSERT INTO `places` VALUES (70, NULL, 1, NULL, 54.244014, 49.598208, 'E7D91752BF634BF583E368E741B41B5D.jpg');
INSERT INTO `places` VALUES (71, NULL, 1, NULL, 54.238711, 49.559372, 'E8D82AC958044228BFE9596B9510811C.jpg');
INSERT INTO `places` VALUES (72, NULL, 1, NULL, 54.238675, 49.559536, 'EA778711D78D405288EA2A6AF126B6FB.jpg');
INSERT INTO `places` VALUES (73, NULL, 1, NULL, 54.239272, 49.559578, 'EC5E7BAFF3BE44F1A9CC2EB03E22DAA5.jpg');
INSERT INTO `places` VALUES (74, NULL, 1, NULL, 54.239128, 49.558808, 'F103BE28C7E24308B01D4C072F6FA7C2.jpg');
INSERT INTO `places` VALUES (75, NULL, 1, NULL, 54.236214, 49.563194, 'F21FC09E06474E9A843DA94819C63A5C.jpg');
INSERT INTO `places` VALUES (76, NULL, 1, NULL, 54.239553, 49.559589, 'F802F1063ABF4985831DBCCE737031B1.jpg');
INSERT INTO `places` VALUES (77, NULL, 2, NULL, 54.238669, 49.559533, '0409E83B1C104AAB95965AF6FF5017F7.jpg');
INSERT INTO `places` VALUES (78, NULL, 2, NULL, 54.237603, 49.558217, '0719C537347A4D5BB92DDBAAC7912190.jpg');
INSERT INTO `places` VALUES (79, NULL, 2, NULL, 54.239283, 49.559631, '0FD41720344342F1B64514ED7A64C569.jpg');
INSERT INTO `places` VALUES (80, NULL, 2, NULL, 54.239597, 49.559444, '127EE027311B4446A13411193206563C.jpg');
INSERT INTO `places` VALUES (81, NULL, 2, NULL, 54.237031, 49.558517, '13393060672C4D1995ED0D77913E0DF5.jpg');
INSERT INTO `places` VALUES (82, NULL, 2, NULL, 54.239789, 49.559672, '144083DC1DFF464596D7CFF78E09E20A.jpg');
INSERT INTO `places` VALUES (83, NULL, 2, NULL, 54.239436, 49.559639, '148AC473737C4B969E142487ADF7AC3E.jpg');
INSERT INTO `places` VALUES (84, NULL, 2, NULL, 54.238503, 49.559333, '24C88922D21E4AA9ADA5F0700A2953D8.jpg');
INSERT INTO `places` VALUES (85, NULL, 2, NULL, 54.238828, 49.558978, '266222BF1E5045F09D1D36A6A64D0063.jpg');
INSERT INTO `places` VALUES (86, NULL, 2, NULL, 54.239414, 49.559158, '26EBA1508A0A4DCCAEA4501E7D180E0E.jpg');
INSERT INTO `places` VALUES (87, NULL, 2, NULL, 54.240253, 49.556992, '28560C3206444DD694E786E01843B009.jpg');
INSERT INTO `places` VALUES (88, NULL, 2, NULL, 54.237408, 49.557864, '28B5F8575D004AE691D71EB273EF8EB5.jpg');
INSERT INTO `places` VALUES (89, NULL, 2, NULL, 54.239528, 49.559650, '36D6C1C3FE3F4A4FB895F5BFAF4F42AF.jpg');
INSERT INTO `places` VALUES (90, NULL, 2, NULL, 54.235911, 49.563117, '36FE430EA4A2467B85B9A16B0CBB3469.jpg');
INSERT INTO `places` VALUES (91, NULL, 2, NULL, 54.236197, 49.563136, '380CEAEB60BE431CA632A5C259183A18.jpg');
INSERT INTO `places` VALUES (92, NULL, 2, NULL, 54.236194, 49.562775, '3A8DF74DD8464CEEB4658EBC80A005B0.jpg');
INSERT INTO `places` VALUES (93, NULL, 2, NULL, 54.239014, 49.559856, '3DCE697DE7874C17B23F0F44695A6CDB.jpg');
INSERT INTO `places` VALUES (94, NULL, 2, NULL, 54.239903, 49.559064, '560D182C306943468B5616F8466EDD09.jpg');
INSERT INTO `places` VALUES (95, NULL, 2, NULL, 54.236325, 49.563161, '5734A20A0D464562884498869280FA9E.jpg');
INSERT INTO `places` VALUES (96, NULL, 2, NULL, 54.239381, 49.559392, '59F02C47C53942D8B32C09E104D2608D.jpg');
INSERT INTO `places` VALUES (97, NULL, 2, NULL, 54.237247, 49.558178, '5B2B6E05AA9847E5B13A88AF70FD333D.jpg');
INSERT INTO `places` VALUES (98, NULL, 2, NULL, 54.238961, 49.559994, '5CC4DE9552CC4926BAA51A0492F6FEE5.jpg');
INSERT INTO `places` VALUES (99, NULL, 2, NULL, 54.239414, 49.559442, '5EDE66C1A6D2445AAB894A5145D6F3E8.jpg');
INSERT INTO `places` VALUES (100, NULL, 2, NULL, 54.237839, 49.558833, '690D94BCE35B4BB7AF3681202D654A26.jpg');
INSERT INTO `places` VALUES (101, NULL, 2, NULL, 54.236783, 49.563061, '6C4D99C8CE064C07A6D5AB9B73256E16.jpg');
INSERT INTO `places` VALUES (102, NULL, 2, NULL, 54.235931, 49.562969, '6D26F09F653845A0B57081DCC632898A.jpg');
INSERT INTO `places` VALUES (103, NULL, 2, NULL, 54.239503, 49.558917, '706E76248FF9478A9F11FC1FAE7E0CCA.jpg');
INSERT INTO `places` VALUES (104, NULL, 2, NULL, 54.239025, 49.559128, '775E866D4E4B498DB9F61CA36245897F.jpg');
INSERT INTO `places` VALUES (105, NULL, 2, NULL, 54.238706, 49.559231, '7C02E80F21DF49FCA3436D8E7567161A.jpg');
INSERT INTO `places` VALUES (106, NULL, 2, NULL, 54.244217, 49.598614, '86FC3A8D37DF4D338DFDD2C6FFA3998A.jpg');
INSERT INTO `places` VALUES (107, NULL, 2, NULL, 54.244039, 49.598269, '8CA3015E302241959AB199CB04693FAA.jpg');
INSERT INTO `places` VALUES (108, NULL, 2, NULL, 54.238858, 49.559606, '8D4A05D0F2C541408ABB26BE7F7F878C.jpg');
INSERT INTO `places` VALUES (109, NULL, 2, NULL, 54.238742, 49.564061, '8EC4EDA578CC4804A696FA48666E6E2B.jpg');
INSERT INTO `places` VALUES (110, NULL, 2, NULL, 54.239525, 49.559533, '97280682C7CC4464BB0AD2ADE6C63D99.jpg');
INSERT INTO `places` VALUES (111, NULL, 2, NULL, 54.239167, 49.559547, '98AA7AB1F2E74FDC87257E0318D5F701.jpg');
INSERT INTO `places` VALUES (112, NULL, 2, NULL, 54.240372, 49.557147, 'A4A8329032954BA985EB2FA5A384F9B2.jpg');
INSERT INTO `places` VALUES (113, NULL, 2, NULL, 54.239778, 49.558892, 'A6D3582F2B024C498DCD40FDE6896BF6.jpg');
INSERT INTO `places` VALUES (114, NULL, 2, NULL, 54.236500, 49.563294, 'AABEC68358814E8FBD0F4B45D6A9D831.jpg');
INSERT INTO `places` VALUES (115, NULL, 2, NULL, 54.237125, 49.558481, 'AE1861B3E266443EAE5E71C8897B05CC.jpg');
INSERT INTO `places` VALUES (116, NULL, 2, NULL, 54.239742, 49.559803, 'B86CBC7DDB2C463CAD5DC533B20B07DC.jpg');
INSERT INTO `places` VALUES (117, NULL, 2, NULL, 54.238650, 49.566842, 'B9ACF91F0D574C37A23F4E5AA6B5CD38.jpg');
INSERT INTO `places` VALUES (118, NULL, 2, NULL, 54.239544, 49.559611, 'C2D0CA2FF638434FAEC2BA0766215056.jpg');
INSERT INTO `places` VALUES (119, NULL, 2, NULL, 54.245303, 49.598536, 'C417DC460DCB4F809C3E92BAA4693EA9.jpg');
INSERT INTO `places` VALUES (120, NULL, 2, NULL, 54.239556, 49.559078, 'C4616876AF2844F8AE81F5CCD142F856.jpg');
INSERT INTO `places` VALUES (121, NULL, 2, NULL, 54.237944, 49.558933, 'D234812FD0E643BFAEB4CB496DC381FD.jpg');
INSERT INTO `places` VALUES (122, NULL, 2, NULL, 54.235978, 49.562936, 'DA4115EECC1C4CBD92E1AE994F7A8ABB.jpg');
INSERT INTO `places` VALUES (123, NULL, 2, NULL, 54.239625, 49.559486, 'DC57F4E2C52E482398C5AD71861E6E64.jpg');
INSERT INTO `places` VALUES (124, NULL, 2, NULL, 54.237567, 49.564597, 'DF240E5097824B9DB55DD6F3600AEF17.jpg');
INSERT INTO `places` VALUES (125, NULL, 2, NULL, 54.236114, 49.562958, 'E29D6218788240EF9249580C33B39D7C.jpg');
INSERT INTO `places` VALUES (126, NULL, 2, NULL, 54.238411, 49.558511, 'E39361BA8DBC401D8CBDB777FDBD71DD.jpg');
INSERT INTO `places` VALUES (127, NULL, 2, NULL, 54.244100, 49.598672, 'E673A2B1D2C240C7A73DC718CC2114C2.jpg');
INSERT INTO `places` VALUES (128, NULL, 2, NULL, 54.239167, 49.559617, 'E7F932922FBB47D785986244F54E1D03.jpg');
INSERT INTO `places` VALUES (129, NULL, 2, NULL, 54.236192, 49.562972, 'E824F681B5E049CFB98EF9F9B2E0C043.jpg');
INSERT INTO `places` VALUES (130, NULL, 2, NULL, 54.239644, 49.558797, 'F1017EC537584DDC9F617BED3034598A.jpg');
INSERT INTO `places` VALUES (131, NULL, 2, NULL, 54.239814, 49.558931, 'F447757088DB4802B858E55A0A59D6B8.jpg');
INSERT INTO `places` VALUES (132, NULL, 2, NULL, 54.236431, 49.563236, 'F55CB4D2CB484F43B82F478576DE2573.jpg');
INSERT INTO `places` VALUES (133, NULL, 2, NULL, 54.239131, 49.558800, 'F83376FBC7AD402AA93068B591E16FC0.jpg');
INSERT INTO `places` VALUES (134, NULL, 3, NULL, 54.238625, 49.558742, '162D506154B54942B0D3975216E297DF.jpg');
INSERT INTO `places` VALUES (135, NULL, 3, NULL, 54.237789, 49.558739, '1DE26619DD134EC8A35844F4C5312BE2.jpg');
INSERT INTO `places` VALUES (136, NULL, 3, NULL, 54.239236, 49.562844, '468649488A8740BFBD456B6F205642C6.jpg');
INSERT INTO `places` VALUES (137, NULL, 3, NULL, 54.235794, 49.563208, '90BCE28FF220442B9B678DD2E94423AF.jpg');
INSERT INTO `places` VALUES (138, NULL, 3, NULL, 54.245025, 49.598656, '9B65D14FE0FC47208018A0C70CB35432.jpg');
INSERT INTO `places` VALUES (139, NULL, 3, NULL, 54.235742, 49.563239, 'B186707741434BB29D866F4BF9751358.jpg');
INSERT INTO `places` VALUES (140, NULL, 3, NULL, 54.240156, 49.556942, 'C0A2143A4A9A4205BCEA71AF4930B982.jpg');
INSERT INTO `places` VALUES (141, NULL, 3, NULL, 54.238650, 49.558586, 'FA4A6B843DE44732A00A3DFD16C30C44.jpg');
INSERT INTO `places` VALUES (142, NULL, 4, NULL, 54.238828, 49.564142, '0013BE5096B240D2BD679F06827D73F1.jpg');
INSERT INTO `places` VALUES (143, NULL, 4, NULL, 54.238808, 49.559247, '00EFBBCB3A414907960A5914493A9E6F.jpg');
INSERT INTO `places` VALUES (144, NULL, 4, NULL, 54.239131, 49.559533, '0F4C508C69704F2A9321BEDD9C52B4B9.jpg');
INSERT INTO `places` VALUES (145, NULL, 4, NULL, 54.240239, 49.557189, '18AF9702894943D6A0CA380C9F8531B2.jpg');
INSERT INTO `places` VALUES (146, NULL, 4, NULL, 54.239589, 49.559458, '21B12A73B32242B7B39BFC39F7DECBC2.jpg');
INSERT INTO `places` VALUES (147, NULL, 4, NULL, 54.239033, 49.559375, '281C178A51E34778AF3E09517BED96B9.jpg');
INSERT INTO `places` VALUES (148, NULL, 4, NULL, 54.238453, 49.559325, '30A930FB65EA43E5AB64254D8386A01F.jpg');
INSERT INTO `places` VALUES (149, NULL, 4, NULL, 54.238217, 49.558803, '31B0BA588940424599059EDD8FAE0ECA.jpg');
INSERT INTO `places` VALUES (150, NULL, 4, NULL, 54.239522, 49.558872, '3A3B7EABE84245F28E41B8007B0BF9FE.jpg');
INSERT INTO `places` VALUES (151, NULL, 4, NULL, 54.238514, 49.567122, '800726654A8E4C1EB91F32246D75D86E.jpg');
INSERT INTO `places` VALUES (152, NULL, 4, NULL, 54.235961, 49.563019, 'A430C0CEE6D04C3B8919795D606BB410.jpg');
INSERT INTO `places` VALUES (153, NULL, 4, NULL, 54.236789, 49.563656, 'C34F04D94AAB49D584DCE3FFCDE2FB4F.jpg');
INSERT INTO `places` VALUES (154, NULL, 4, NULL, 54.236042, 49.562961, 'C45512C9F64840B182B0C851DED3A73C.jpg');
INSERT INTO `places` VALUES (155, NULL, 4, NULL, 54.239872, 49.558858, 'C7EB3B483C5B43E8A08237B91543D4D0.jpg');
INSERT INTO `places` VALUES (156, NULL, 4, NULL, 54.237103, 49.558517, 'FC86F6D8F97344EBA9967239B2D82143.jpg');
INSERT INTO `places` VALUES (157, NULL, 5, NULL, 54.238767, 49.564144, '32B64CCD579E46F3BAC172C0403558E8.jpg');
INSERT INTO `places` VALUES (158, NULL, 5, NULL, 54.244081, 49.598564, 'BB70A090911145749CA3F2A5D3C9F2BF.jpg');
INSERT INTO `places` VALUES (159, NULL, 5, NULL, 54.244094, 49.598625, 'DAD876DAE7574142AB2B987132D4D637.jpg');

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
