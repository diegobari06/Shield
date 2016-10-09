-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: shield_db
-- ------------------------------------------------------
-- Server version	5.7.15-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (3,'Hacienda de Oro'),(4,'Hacienda de Oro2');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houses`
--

DROP TABLE IF EXISTS `houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `houses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `house_number` varchar(45) DEFAULT NULL,
  `extension` varchar(45) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `me_company_idx` (`company_id`),
  CONSTRAINT `houses_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houses`
--

LOCK TABLES `houses` WRITE;
/*!40000 ALTER TABLE `houses` DISABLE KEYS */;
INSERT INTO `houses` VALUES (7,NULL,NULL,3),(9,'12',NULL,4),(11,'hahaha',NULL,3);
/*!40000 ALTER TABLE `houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `residents`
--

DROP TABLE IF EXISTS `residents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `residents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `identification_number` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `me_company_idx` (`company_id`),
  CONSTRAINT `residents_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (1,'hahasha',NULL,NULL,NULL,NULL,NULL,NULL,3,116060486);
/*!40000 ALTER TABLE `residents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schema_migrations`
--

DROP TABLE IF EXISTS `schema_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schema_migrations` (
  `version` varchar(255) NOT NULL,
  UNIQUE KEY `unique_schema_migrations` (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schema_migrations`
--

LOCK TABLES `schema_migrations` WRITE;
/*!40000 ALTER TABLE `schema_migrations` DISABLE KEYS */;
/*!40000 ALTER TABLE `schema_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shifts`
--

DROP TABLE IF EXISTS `shifts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shifts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `init_time` varchar(45) DEFAULT NULL,
  `end_time` varchar(45) DEFAULT NULL,
  `officers` varchar(250) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_shift_idx` (`company_id`),
  CONSTRAINT `company_shift` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shifts`
--

LOCK TABLES `shifts` WRITE;
/*!40000 ALTER TABLE `shifts` DISABLE KEYS */;
/*!40000 ALTER TABLE `shifts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `provider` varchar(255) NOT NULL DEFAULT 'email',
  `uid` varchar(255) NOT NULL DEFAULT '',
  `encrypted_password` varchar(255) NOT NULL DEFAULT '',
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_sent_at` datetime DEFAULT NULL,
  `remember_created_at` datetime DEFAULT NULL,
  `sign_in_count` int(11) NOT NULL DEFAULT '0',
  `current_sign_in_at` datetime DEFAULT NULL,
  `last_sign_in_at` datetime DEFAULT NULL,
  `current_sign_in_ip` varchar(255) DEFAULT NULL,
  `last_sign_in_ip` varchar(255) DEFAULT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `confirmation_sent_at` datetime DEFAULT NULL,
  `unconfirmed_email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tokens` text,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `permission_level` int(11) DEFAULT NULL,
  `rol_id` int(11) DEFAULT NULL,
  `enabled` tinyint(1) DEFAULT '1',
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_uid_and_provider` (`uid`,`provider`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`),
  KEY `index_users_on_email` (`email`),
  KEY `fk_users_rol_idx` (`rol_id`),
  KEY `users_company_idx` (`company_id`),
  CONSTRAINT `fk_users_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `users_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'email','luiscra@gmail.com','$2a$10$6nxIqUiswNU3vnXQ8KvNb.GNwCWCYp6Nj5.11fwYcrJA/4sQ7Dfqm',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:57:30',NULL,NULL,NULL,NULL,NULL,'luiscra@gmail.com','{}','2016-09-27 03:57:30','2016-09-27 03:57:30',2,NULL,1,3),(18,'email','scastror@ucenfotec.ac.cr','$2a$10$0wEhbn7Kv8FA/vkRRSSnpeKh70xpfqo9zbOL8ZHwkzGfWqpEv6Aa.',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:58:59',NULL,NULL,NULL,NULL,NULL,'scastror@ucenfotec.ac.cr','{}','2016-09-27 03:59:00','2016-09-27 03:59:00',2,NULL,1,3),(19,'email','luiscra0903@gmail.com','$2a$10$oQxiNLHMgJdmEb7mm4RZduYs1rXVPUIlLiWkssQdyJUX1WkM.l7IC',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:59:27',NULL,NULL,NULL,NULL,NULL,'luiscra0903@gmail.com','{}','2016-09-27 03:59:28','2016-09-27 03:59:28',2,NULL,1,3),(20,'email','luiscra0903@hotmail.com','$2a$10$aE6QEMCH2.GwUHbr1R3RNu48uIMlRN.v.EpNOap7jik7MHWw6E1eu',NULL,NULL,NULL,1,'2016-09-27 04:00:51','2016-09-27 04:00:51','::1','::1',NULL,'2016-09-27 04:33:44',NULL,NULL,NULL,NULL,NULL,'luiscra0903@hotmail.com','{\"uGprYVvnxyUBidTstvKZrg\":{\"token\":\"$2a$10$aWocGfzGLMF9ZsQZ567XOOy4AumVr1Lr53VmCJ6q91ueGWhCjWHwK\",\"expiry\":1476160422,\"last_token\":\"$2a$10$wx7/e1fwKlX6AMyCkqwGHeiT3s2AO1za5qtIkD6GatDnkpe4ZmVF2\",\"updated_at\":\"2016-09-26T22:33:44.823-06:00\"}}','2016-09-27 04:00:03','2016-09-27 04:33:44',2,NULL,1,3),(21,'email','sergiojcr16@gmail.com','$2a$10$3s9y3jMlyCX4rakQyLWLWuN4n78vfQWwXTb36f./GZoh8wzEuvKMK','66ee2043cb4ec622a7275bb3f1e1377dc5f5304c05eb618226dd2bc1aa2af287','2016-10-09 06:56:15',NULL,1,'2016-10-09 06:41:04','2016-10-09 06:40:26','::1','::1',NULL,'2016-10-09 06:56:15',NULL,NULL,NULL,NULL,NULL,'sergiojcr16@gmail.com','{\"_Iv0Pxkys4nOzLilXJEVBg\":{\"token\":\"$2a$10$fac1b3KjXhe7zFjzjhXzHug/SxIOTM77.7fLbzpNUs6drzqTGKzuK\",\"expiry\":1477195053,\"last_token\":\"$2a$10$iTyQlZhsQqhZ8ejZZ4S5l.vIgKOL1YdIuEnovnLIhE1ms9lne/CKe\",\"updated_at\":\"2016-10-08T21:57:33.089-06:00\"},\"r3PCFCBiXyfteXNCT0EJMw\":{\"token\":\"$2a$10$wEBH9kEluU40bWXV4kUQFOcJDOLdXQJy16b8f71ZFK.mZjq6PenZm\",\"expiry\":1477195199,\"last_token\":\"$2a$10$p0yf2zKgsudKpGhCAR1z8u2PMjYaWznTmE.4T8SwKwVrn0LykRRty\",\"updated_at\":\"2016-10-08T21:59:59.972-06:00\"},\"rgJXT12yfaKoRdZUZ3hTYw\":{\"token\":\"$2a$10$KZG/9T7eQbU/1u1tU5oxLOjpr7EEyBdrPE2Fb0uFElUqjW.iFFUce\",\"expiry\":1477196365,\"last_token\":\"$2a$10$5S8UIva9AuaGeJHgZJlQMeSk0VI0K6AHFgxGEv1Yv5PlV4K/kCma2\",\"updated_at\":\"2016-10-08T22:19:25.964-06:00\"},\"QOGifLA5LMT7IvP8oVm4Cg\":{\"token\":\"$2a$10$eG5NYEA37iA9/jxqlHj/Ye3gWGvueI0IcYn7mIRLzUCX1PR4ejFKy\",\"expiry\":1477201060,\"last_token\":\"$2a$10$E/8JUb0gK822NKhPFAqI/uGbgpg1XPh.v9BkUS/J./L8Z7WCWOBg6\",\"updated_at\":\"2016-10-08T23:37:40.959-06:00\"},\"4yARfDm54Giv7lxqZkB3wg\":{\"token\":\"$2a$10$K5DUcI7l6tj9d8uztirYYe9KMjsjA3bXwKbyhNqp7dzlKZtS8KJvm\",\"expiry\":1477201119,\"last_token\":\"$2a$10$v/cmEnqmJX17gHkCEnpzou2GTN6uIApnyKT7ricpj/rGeBp1/Btt2\",\"updated_at\":\"2016-10-08T23:38:39.438-06:00\"},\"a6gg6LEuidfiaxD30J6vEQ\":{\"token\":\"$2a$10$nRl2GO3Fi4IYdMNuehZd8u.qPQRyDcjd/lDkZy5n7KdZxzUyZG.um\",\"expiry\":1477201248,\"last_token\":\"$2a$10$0Ka7PmFyjjQPBKZLa6KhfuAIRewkRfNatw0PNhyi1WRwOR1ugF5zW\",\"updated_at\":\"2016-10-08T23:40:54.839-06:00\"},\"rOIfNGgVd9CVv1oJPsWMrw\":{\"token\":\"$2a$10$sYxrPxefESF5J8lvwdImxOph8tmX6aJ.ZjHnYH3J/fn0S0V2zzYRO\",\"expiry\":1477203730,\"last_token\":\"$2a$10$MtSyS4CiSFHSum54VamGkeKVfL9qweuZXDc2ktY5PXMZqQrB7IOyS\",\"updated_at\":\"2016-10-09T00:22:10.742-06:00\"},\"b8St02QUtfPBeALCMhFcfQ\":{\"token\":\"$2a$10$rD/fkjgkwXqYMst5.mx2k.cYplkUioWlyQYkoJI6.zcIbZRkiS3I.\",\"expiry\":1477204132,\"last_token\":\"$2a$10$oY0U5eBxLJVkQMItpVzkD.pcgqp8o.86HdlklNcC1v/MCMLrm0gha\",\"updated_at\":\"2016-10-09T00:28:52.060-06:00\"},\"NaO3Lw9ScedtMcebPwq5QQ\":{\"token\":\"$2a$10$vYqeuCT5r5rTdMYGyP97P.gzX6wm6MPSXvcFOxOknNTeW7HwkcOk6\",\"expiry\":1477204496,\"last_token\":\"$2a$10$008u4oi25mndb/OFheCVou9e3uYS0TVny2D9BYjAYTa56RGyt7KXO\",\"updated_at\":\"2016-10-09T00:34:56.714-06:00\"},\"4RirUELKIFsbwoRLcilyQw\":{\"token\":\"$2a$10$YtRXkQuRTi5rzqj1fTGzJuaacZICM0DtJGOVd2acZMjdJ/u4i95Ai\",\"expiry\":1477204938}}','2016-10-09 02:46:22','2016-10-09 06:56:15',2,NULL,1,3);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicules`
--

DROP TABLE IF EXISTS `vehicules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `license_plate` varchar(45) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `color` varchar(45) DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `me_house_idx` (`house_id`),
  KEY `me_company_idx` (`company_id`),
  CONSTRAINT `vehicules_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `vehicules_house` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicules`
--

LOCK TABLES `vehicules` WRITE;
/*!40000 ALTER TABLE `vehicules` DISABLE KEYS */;
INSERT INTO `vehicules` VALUES (1,'452',NULL,'12445',NULL,NULL),(2,'452j',NULL,'12445',NULL,NULL),(3,'hahaha',NULL,NULL,NULL,NULL),(4,'hahasha',NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL),(6,'hahasasha',NULL,NULL,NULL,NULL),(7,'hahasashaw',NULL,NULL,NULL,NULL),(8,'hahasashaaaw',NULL,NULL,NULL,3),(9,'hahasashaaaws',NULL,NULL,NULL,3);
/*!40000 ALTER TABLE `vehicules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitants`
--

DROP TABLE IF EXISTS `visitants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visitants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `last_name2` varchar(45) DEFAULT NULL,
  `identification_number` varchar(45) DEFAULT NULL,
  `license_plate` varchar(45) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `id_house` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `house_visitants_idx` (`id_house`),
  KEY `company_visitants_idx` (`company_id`),
  CONSTRAINT `company_visitants` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `house_visitants` FOREIGN KEY (`id_house`) REFERENCES `houses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitants`
--

LOCK TABLES `visitants` WRITE;
/*!40000 ALTER TABLE `visitants` DISABLE KEYS */;
INSERT INTO `visitants` VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL,'2016-10-09 01:20:04',NULL,3),(2,NULL,NULL,NULL,NULL,NULL,NULL,'2016-10-08 19:22:35',NULL,3),(3,NULL,NULL,NULL,NULL,NULL,NULL,'2016-10-08 19:23:03',NULL,3),(4,NULL,NULL,NULL,NULL,NULL,NULL,'2016-10-08 19:23:29',NULL,3),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3),(6,NULL,NULL,NULL,NULL,NULL,NULL,'2016-10-08 19:25:32',NULL,3),(7,NULL,NULL,NULL,NULL,NULL,NULL,'2016-10-09 01:27:35',NULL,3),(8,NULL,NULL,NULL,NULL,NULL,NULL,'2016-10-09 01:32:05',NULL,NULL),(9,'ahora si',NULL,NULL,NULL,NULL,NULL,'2016-10-09 01:35:33',NULL,NULL);
/*!40000 ALTER TABLE `visitants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-09  1:00:24
