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
  `is_desocupated` tinyint(4) DEFAULT '0',
  `desocupation_initial_time` datetime DEFAULT NULL,
  `desocupation_limit_time` datetime DEFAULT NULL,
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
INSERT INTO `houses` VALUES (7,'1','101',3,0,NULL,NULL),(9,'12',NULL,4,0,NULL,NULL),(11,'2','102',3,0,NULL,NULL);
/*!40000 ALTER TABLE `houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notes`
--

DROP TABLE IF EXISTS `notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(1000) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  `note_type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_note_idx` (`company_id`),
  KEY `house_note_idx` (`house_id`),
  CONSTRAINT `company_note` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `house_note` FOREIGN KEY (`house_id`) REFERENCES `houses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notes`
--

LOCK TABLES `notes` WRITE;
/*!40000 ALTER TABLE `notes` DISABLE KEYS */;
INSERT INTO `notes` VALUES (1,'Hola',3,7,'Domicilio');
/*!40000 ALTER TABLE `notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officers`
--

DROP TABLE IF EXISTS `officers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `officers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `second_last_name` varchar(45) DEFAULT NULL,
  `identification_number` varchar(45) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `license` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `officers_company_idx` (`company_id`),
  CONSTRAINT `officers_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officers`
--

LOCK TABLES `officers` WRITE;
/*!40000 ALTER TABLE `officers` DISABLE KEYS */;
INSERT INTO `officers` VALUES (1,'Juan','Carvajal','Herrera','1131414',3,'384183');
/*!40000 ALTER TABLE `officers` ENABLE KEYS */;
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
  `last_name` varchar(45) DEFAULT NULL,
  `second_last_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `picture` varchar(45) DEFAULT NULL,
  `house_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `identification_number` int(11) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `is_owner` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `me_company_idx` (`company_id`),
  CONSTRAINT `residents_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (1,'sergio','castro','rodriguez','3314134','2016-10-11',NULL,7,3,116060486,'sergiojcr16@gmail.com',0),(2,'4234','23423','442','32432','2016-05-10',NULL,7,3,324,'dfasf@gsg.vom',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'email','luiscra@gmail.com','$2a$10$6nxIqUiswNU3vnXQ8KvNb.GNwCWCYp6Nj5.11fwYcrJA/4sQ7Dfqm',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:57:30',NULL,NULL,NULL,NULL,NULL,'luiscra@gmail.com','{}','2016-09-27 03:57:30','2016-09-27 03:57:30',2,NULL,1,3),(18,'email','scastror@ucenfotec.ac.cr','$2a$10$0wEhbn7Kv8FA/vkRRSSnpeKh70xpfqo9zbOL8ZHwkzGfWqpEv6Aa.',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:58:59',NULL,NULL,NULL,NULL,NULL,'scastror@ucenfotec.ac.cr','{}','2016-09-27 03:59:00','2016-09-27 03:59:00',3,NULL,1,3),(19,'email','luiscra0903@gmail.com','$2a$10$oQxiNLHMgJdmEb7mm4RZduYs1rXVPUIlLiWkssQdyJUX1WkM.l7IC',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:59:27',NULL,NULL,NULL,NULL,NULL,'luiscra0903@gmail.com','{}','2016-09-27 03:59:28','2016-09-27 03:59:28',2,NULL,1,3),(20,'email','luiscra0903@hotmail.com','$2a$10$aE6QEMCH2.GwUHbr1R3RNu48uIMlRN.v.EpNOap7jik7MHWw6E1eu',NULL,NULL,NULL,1,'2016-09-27 04:00:51','2016-09-27 04:00:51','::1','::1',NULL,'2016-09-27 04:33:44',NULL,NULL,NULL,NULL,NULL,'luiscra0903@hotmail.com','{\"uGprYVvnxyUBidTstvKZrg\":{\"token\":\"$2a$10$aWocGfzGLMF9ZsQZ567XOOy4AumVr1Lr53VmCJ6q91ueGWhCjWHwK\",\"expiry\":1476160422,\"last_token\":\"$2a$10$wx7/e1fwKlX6AMyCkqwGHeiT3s2AO1za5qtIkD6GatDnkpe4ZmVF2\",\"updated_at\":\"2016-09-26T22:33:44.823-06:00\"}}','2016-09-27 04:00:03','2016-09-27 04:33:44',2,NULL,1,3),(21,'email','sergiojcr16@gmail.com','$2a$10$3s9y3jMlyCX4rakQyLWLWuN4n78vfQWwXTb36f./GZoh8wzEuvKMK','21eff3257e3e91a61fd3f38b3621a050819456ef6c3544131666fa002e62dc31','2016-10-13 23:00:59',NULL,33,'2016-10-14 02:34:32','2016-10-14 02:33:02','::1','::1',NULL,'2016-10-14 02:35:01',NULL,NULL,NULL,NULL,NULL,'sergiojcr16@gmail.com','{\"thUMlSnAw3MxNgsUOvnN2A\":{\"token\":\"$2a$10$0JSRp4XmPHzDxXfDHv/AT.5vhXwDCIznZPVpvHdEEgmQAUINXuENm\",\"expiry\":1477621947,\"last_token\":\"$2a$10$vtzRv0TGVF0xd6PJHmdf/./VOb/LiOyi3WO4U7TuWSla7KC4O4b4a\",\"updated_at\":\"2016-10-13T20:32:31.417-06:00\"},\"_EEjRTXn5V7qwpp0vRqQOg\":{\"token\":\"$2a$10$dCU0TNpBm0xDxaPkRzllTu85mBoxXUnFmJPl6Do9Uo3p3f0ttEmRu\",\"expiry\":1477621953,\"last_token\":\"$2a$10$YBqo9E7wpwjOo/jAJC2g3euHi9eGS.1ffiOy4lN/YErliwbObOKEu\",\"updated_at\":\"2016-10-13T20:32:33.038-06:00\"},\"tiege3xVnLVUmqGgDLzjcw\":{\"token\":\"$2a$10$tNiq/1klEHDdioUH5RJ/k.o8Ovs0k9NcDGsPRdJaQZyDsk0SECHDm\",\"expiry\":1477621963,\"last_token\":\"$2a$10$wEcXtYa86QSDa8P.ZyKzpunh.G/sIedOC.Fnl.J10dqKvxdBVgayq\",\"updated_at\":\"2016-10-13T20:32:43.023-06:00\"},\"mcQteM-V6cUCWs5gZw3CUA\":{\"token\":\"$2a$10$aAQl7/RL02khTPa4IBWjj.9Qoc.5EB5JRJ0LCsPoexb6H9fI4vsu2\",\"expiry\":1477621963,\"last_token\":\"$2a$10$sqBXnFPHRxizWxxBA909i.wXeWX7afs1co9jQusoTk6asJ54YibVy\",\"updated_at\":\"2016-10-13T20:32:43.433-06:00\"},\"3bJ3E6U7ZB7ZSIwDm7Av1g\":{\"token\":\"$2a$10$9JQYuUcJyU8YywWFW3NZOO.lasBNMbQC6T8PQHY5sFY.zS8tPBlhG\",\"expiry\":1477621963,\"last_token\":\"$2a$10$Lxa0L/MJ9.qnswu8vmtTTOIzFld8jNDjhXR8X/9s0jmoEbgua2MYW\",\"updated_at\":\"2016-10-13T20:32:43.887-06:00\"},\"QLy1KR9DtcneIMPiDmHknQ\":{\"token\":\"$2a$10$zMZUCOD9FNEbVyXVYb1kqu1eH/l5LO7GjERpSUDBmY/u5sk5UBXyC\",\"expiry\":1477621978,\"last_token\":\"$2a$10$ryuDLXoZz2KAMTxncnQK5.Naz4ritLS1Ghf1KiANwr.OFY4S4x1uu\",\"updated_at\":\"2016-10-13T20:32:58.081-06:00\"},\"FxGG6ZcLqaPFfba6Vis6pw\":{\"token\":\"$2a$10$glCo3bvbR0ZfGR15IJ009eXmYMKhhRcY.Lwl54fXJmszDJaojlHoa\",\"expiry\":1477621979,\"last_token\":\"$2a$10$3OrQV0BYFqy4RW3YgD2yguTuzIiHtrYTEtxjOuFmoruOGJIgInzsK\",\"updated_at\":\"2016-10-13T20:32:59.273-06:00\"},\"ZrBxAa5xeJRa6Kztpf5Qlg\":{\"token\":\"$2a$10$CEkDITvhDuSXvSvTiAejzu8fEOXUOd3HAm8YoPCGPYbsg/r0A4aX6\",\"expiry\":1477621981,\"last_token\":\"$2a$10$VHR11w7iifvi4Q3.yFmqYemxXuP5HEZS29clvA2YprX2cJb59T9Rq\",\"updated_at\":\"2016-10-13T20:33:01.704-06:00\"},\"Q0pMa1Y8RKsizwi_WT8Rxg\":{\"token\":\"$2a$10$sGUSotW6AsEI9Mti8HsQ1.5ftebMLWJJub.44fhdz9u63eMVgGQzK\",\"expiry\":1477622069,\"last_token\":\"$2a$10$i.R/kbSXmt6XwkBJumWN0.snPZ/ESU0yCYrIyKSayuBob8mHPw7hq\",\"updated_at\":\"2016-10-13T20:34:29.355-06:00\"},\"XcjSTIvVS0S8QOEbT5BI3w\":{\"token\":\"$2a$10$st8pjHlygZb6ZY5ngkfSsO3gitbAT8MyevjIb42xqV0v8lKl4O3aC\",\"expiry\":1477622091,\"last_token\":\"$2a$10$EbXxs3Jsz968indoJVtCieWenyyva8lSYmL0Nl.fauAhdIfoZGoiS\",\"updated_at\":\"2016-10-13T20:35:01.859-06:00\"}}','2016-10-09 02:46:22','2016-10-14 02:35:01',3,NULL,1,3),(22,'email','diegobari06@gmail.com','$2a$10$BmZSKGll1RtU9eI/RSI5n.XEJk81xws/0ogWkI/vSQBiqz5OVWHIK',NULL,NULL,NULL,51,'2016-10-13 22:30:28','2016-10-13 22:29:57','::1','::1',NULL,'2016-10-13 22:30:49',NULL,NULL,NULL,NULL,NULL,'diegobari06@gmail.com','{\"A7MHhu2Za_6Pe3MS9w0XNw\":{\"token\":\"$2a$10$fj4Hve1VVj680mpO5ywmfOMgsD9.bWrpWTvfjZbxgXG4KhbXEmzCC\",\"expiry\":1477606067,\"last_token\":\"$2a$10$07A1Niq9IoSnflsCf.TETOz.q7QPjr2XcTWi3nAtjlsQf.NMYIxL.\",\"updated_at\":\"2016-10-13T16:07:47.251-06:00\"},\"1Q1AQQFRDuhReXUtv6cvzg\":{\"token\":\"$2a$10$grcck4GPramNUmsXxyPJ2uS3fbopvMvvwqJjfTZ1oI5McAc87p9VG\",\"expiry\":1477606070,\"last_token\":\"$2a$10$iAhryQKMXTXrx9abnS0u5.BU4G/eJjdA5t7eEH6gO4cL6IcidmI1q\",\"updated_at\":\"2016-10-13T16:07:50.074-06:00\"},\"zbThrh8Pw8uWdyptGB92fg\":{\"token\":\"$2a$10$ImLSYqub4SqPGWOgD5x6kOGje7//oXaHSrv.WnHVq4e12cZpC2kce\",\"expiry\":1477606070,\"last_token\":\"$2a$10$YRxOxjU.4xWLGymAICzNzuGPLhOIYXo/CkSY00Nu6kYuu5d8A9Alm\",\"updated_at\":\"2016-10-13T16:07:50.589-06:00\"},\"OdwoMqpwIiW-HT1Be15yrA\":{\"token\":\"$2a$10$sX48bDtHgOdCtDmCdmU99.jW5SNPQHWIs0UYMGnKcnkNQn53.jkbC\",\"expiry\":1477606071,\"last_token\":\"$2a$10$7VJIGfI3XgRdfNY7EUkZ3eQUkSxes37AMS4bea1tpGzTWmhvGRbJ2\",\"updated_at\":\"2016-10-13T16:07:51.168-06:00\"},\"nJLO-bU7xlIHl7GCO-FbXw\":{\"token\":\"$2a$10$LgBcSmGxNQvA66XY.M5jv.UemmWKnT8ieZM8Etve/hdP23ZaXwbUq\",\"expiry\":1477606074,\"last_token\":\"$2a$10$V.KWGXOmI26ey1h9PeLHYudwiAacJVWcR.T3RKseagRJTtf0aKbPa\",\"updated_at\":\"2016-10-13T16:07:54.699-06:00\"},\"AyX_jJ2TPGZDqArh5mJ9-Q\":{\"token\":\"$2a$10$wPrOXNfgBpJcS1kZnD/Q.eCzxuqQuiCgCMO3kME0F5BKz1BIGPEje\",\"expiry\":1477606076,\"last_token\":\"$2a$10$MIZBWyRXFAcTemWwzJBn4ujWQHXpjT8SdnsfEqHetzi/HM3V9BO96\",\"updated_at\":\"2016-10-13T16:07:56.923-06:00\"},\"O1CiGcT6CdzC-jArCyk7Mw\":{\"token\":\"$2a$10$oJ.XOw4Sv2.gcNQBCgun1u9d1iFclKCVGysOZp70pLZw8jQpUuOy6\",\"expiry\":1477606092,\"last_token\":\"$2a$10$Oib5mExKHQYiX3VrQvoMjORRXOrfZuJFSxt5tbc34rbbCQPrQebHm\",\"updated_at\":\"2016-10-13T16:08:14.373-06:00\"},\"lf6FGjw30XsWsibuXKA7eA\":{\"token\":\"$2a$10$4uclnanUMiflyVlBU3efeOCT2nSq2mK./toS9Z5RwE2RH8SH/ZG/q\",\"expiry\":1477607019,\"last_token\":\"$2a$10$iLMEDDcbYvjX7npa7R8Ipe9fFL12BO6eyZiwWIx2t5/TWN8HjcJnu\",\"updated_at\":\"2016-10-13T16:23:44.296-06:00\"},\"ouyLR4-F3mQtynSj9Y3SAQ\":{\"token\":\"$2a$10$7AewA4CGgDvD7uiSIMKXg.0QTRCDgkiYTiBsWQfls4bAE99l70udW\",\"expiry\":1477607109,\"last_token\":\"$2a$10$V4DmiSNmuAIyzFTo.YvyNOjHVEVbBvz6IB4ltVpS6ZORovNfH04Je\",\"updated_at\":\"2016-10-13T16:25:09.696-06:00\"},\"ofAMO-8uarSWaiL4FaEtJg\":{\"token\":\"$2a$10$iO/aKKXDhQg.bQdfYesFWu4J8xYqo.R3KIdJoQBYoC3u01CMZQoJa\",\"expiry\":1477607449,\"last_token\":\"$2a$10$FukEA6jboyjpQ9iHx1QmcOdrMdmJWDjjaUmNIjKHq0wmwk3Un7ruG\",\"updated_at\":\"2016-10-13T16:30:49.523-06:00\"}}','2016-10-11 02:41:05','2016-10-13 22:30:49',2,NULL,1,3),(23,'email','diegobari06@hotmail.com','$2a$10$T4xyeCrnBJiLIEztLviXOuYfFFfkqirSIUXnh.kvq6/4uzo4sonvq',NULL,NULL,NULL,12,'2016-10-13 21:25:29','2016-10-13 20:18:42','::1','::1',NULL,'2016-10-13 21:59:52',NULL,NULL,NULL,NULL,NULL,'diegobari06@hotmail.com','{\"_w2pRPyFI9xr0jj-X2zxzQ\":{\"token\":\"$2a$10$pqOXKf0XLS4sR7gWOkQaBujecMchfb1wnLhqX/sj1e16htoFHQxWy\",\"expiry\":1477526106,\"last_token\":\"$2a$10$YHPl197QJ3abh/35EhCYZu8srH4kq3cpMzsy8AR5qy3O3.AIL9lpG\",\"updated_at\":\"2016-10-12T17:55:06.212-06:00\"},\"0oVjqwz_8OiiChdwPvu7SQ\":{\"token\":\"$2a$10$P8P121biZip/pdCQwa93ze9oie0S67I94tGN0m9Uo2tKh0A.UoYh6\",\"expiry\":1477589377,\"last_token\":\"$2a$10$kW8g8xz/0kGQc2xHNeANfeMsZdH3fCDkp5rxug6AANjTFx6aUvWve\",\"updated_at\":\"2016-10-13T11:29:37.462-06:00\"},\"q-fP8PVvq8HeMH5HoIDPEw\":{\"token\":\"$2a$10$CuMYPb3u08yMvZRQ4BnFHOgGXFR3S.2zawUCXmVSfeP2AR4qo/U0m\",\"expiry\":1477589514,\"last_token\":\"$2a$10$EhtymhoJwbbgbMK8ASg29.rRn.qLa9dsoWnPonLQo.9Wll6z1XQ9.\",\"updated_at\":\"2016-10-13T11:31:54.732-06:00\"},\"OMoncvypU6O-0d2fC7w7rQ\":{\"token\":\"$2a$10$lHuE7EqnWaxzGHtWkrbjZOl56WigsJSJmbpoJhcnkV5PoDryaZznK\",\"expiry\":1477591427,\"last_token\":\"$2a$10$udEhLU21Lif62fkvYKMguuDkhWAEvo.FJtGvX.2/V5T.U5mkhO9eq\",\"updated_at\":\"2016-10-13T12:03:47.743-06:00\"},\"aCk4m_13X5d7btYf2lWG3Q\":{\"token\":\"$2a$10$9eS.fJlxor5xw.oom3Bl5OhgxsFwu3Y/Y0MEQ95vjUI.VflNZ2sdS\",\"expiry\":1477599522,\"last_token\":\"$2a$10$gbGe1R2/5POt5M60ANahauOMWhpFETbRUEDrHm1WGKczUYJ14WNAO\",\"updated_at\":\"2016-10-13T14:18:42.251-06:00\"},\"jqdH2pcRX7mCJQy6bmBfYg\":{\"token\":\"$2a$10$nE.HsRcV.DVE1RdfW5rAR.6RSsajf5vAbGVEcO/56L0dXJWWl3RO2\",\"expiry\":1477603524,\"last_token\":\"$2a$10$SFh15YGS83AQ41KVTFaJRuIm2PM4skC80xZMPIJ3gmcd5KW//5Mc.\",\"updated_at\":\"2016-10-13T15:25:24.034-06:00\"}}','2016-10-11 02:46:53','2016-10-13 21:59:52',3,NULL,1,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicules`
--

LOCK TABLES `vehicules` WRITE;
/*!40000 ALTER TABLE `vehicules` DISABLE KEYS */;
INSERT INTO `vehicules` VALUES (1,'452',NULL,'12445',NULL,NULL),(2,'452j',NULL,'12445',NULL,NULL),(3,'hahaha',NULL,NULL,NULL,NULL),(4,'hahasha',NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL),(6,'hahasasha',NULL,NULL,NULL,NULL),(7,'hahasashaw',NULL,NULL,NULL,NULL),(12,'2828818','English','rgb(120, 99, 255)',7,3),(13,'BCL-448','Arabic','rgb(179, 186, 162)',7,3),(14,'5','English','rgb(235, 54, 255)',7,3);
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
  `last_name` varchar(45) DEFAULT NULL,
  `second_last_name` varchar(45) DEFAULT NULL,
  `identification_number` varchar(45) DEFAULT NULL,
  `license_plate` varchar(45) DEFAULT NULL,
  `date_time` datetime DEFAULT NULL,
  `id_house` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `invitation_starting_time` datetime DEFAULT NULL,
  `invitation_limit_time` datetime DEFAULT NULL,
  `is_invited` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `house_visitants_idx` (`id_house`),
  KEY `company_visitants_idx` (`company_id`),
  CONSTRAINT `company_visitants` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `house_visitants` FOREIGN KEY (`id_house`) REFERENCES `houses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitants`
--

LOCK TABLES `visitants` WRITE;
/*!40000 ALTER TABLE `visitants` DISABLE KEYS */;
INSERT INTO `visitants` VALUES (1,'Sergio','Castro','Rodriguez','116060486',NULL,'2016-10-09 01:20:04',7,3,'2016-10-17 00:47:04','2016-10-17 00:49:04',1),(2,NULL,NULL,NULL,NULL,NULL,'2016-10-08 19:22:35',NULL,3,NULL,NULL,0),(3,NULL,NULL,NULL,NULL,NULL,'2016-10-08 19:23:03',NULL,3,NULL,NULL,0),(4,NULL,NULL,NULL,NULL,NULL,'2016-10-08 19:23:29',NULL,3,NULL,NULL,0),(5,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,NULL,NULL,0),(6,NULL,NULL,NULL,NULL,NULL,'2016-10-08 19:25:32',NULL,3,NULL,NULL,0),(7,NULL,NULL,NULL,NULL,NULL,'2016-10-09 01:27:35',NULL,3,NULL,NULL,0),(8,NULL,NULL,NULL,NULL,NULL,'2016-10-09 01:32:05',NULL,NULL,NULL,NULL,0),(9,'ahora si',NULL,NULL,NULL,NULL,'2016-10-09 01:35:33',NULL,NULL,NULL,NULL,0),(12,'31413',NULL,'413413','4134','134','2016-10-11 20:37:55',NULL,3,NULL,NULL,0),(13,'diego','barillas','valverde','117471','34713471','2016-10-11 20:39:00',NULL,3,'2016-10-11 20:39:00','2016-10-11 20:39:00',1),(14,'','','','','','2016-10-11 20:42:46',NULL,3,NULL,NULL,0),(15,'sergio','castro','rodirig','213721371','77777','2016-10-11 20:47:03',11,3,NULL,NULL,0),(16,'Vera ','Valverde','Diaz','11848188','','2016-10-12 20:13:46',11,3,NULL,NULL,0),(17,'','','','','','2016-10-12 23:47:11',7,3,NULL,NULL,0),(18,'','','','','','2016-10-12 23:55:19',7,3,NULL,NULL,0),(19,'Diego','Barillas','Valverde','134134','4524','2016-10-13 17:31:08',11,3,NULL,NULL,0),(20,'','','','','','2016-10-13 20:18:56',7,3,NULL,NULL,0),(21,'','','','','','2016-10-13 20:19:00',7,3,NULL,NULL,0),(22,'','','ewfewf','','','2016-10-14 01:22:11',7,3,NULL,NULL,0),(23,'','','','','','2016-10-14 01:23:57',7,3,NULL,NULL,0),(24,'','','','sdv','sdv','2016-10-14 01:24:42',7,3,NULL,NULL,0),(25,'','','','ds','sdwevw','2016-10-14 01:24:59',7,3,NULL,NULL,0),(26,'','','','sdv','sdvsdvsdv','2016-10-14 01:25:18',7,3,NULL,NULL,0),(27,'','','','','wefsefafaef','2016-10-14 01:26:04',7,3,NULL,NULL,0),(28,'','','','wevwev','wevv','2016-10-14 01:26:37',7,3,NULL,NULL,0),(29,'','','','','','2016-10-14 02:16:46',7,3,NULL,NULL,0),(30,'','','','asdf','','2016-10-14 02:16:50',7,3,NULL,NULL,0),(31,'','','','','','2016-10-14 02:17:35',7,3,NULL,NULL,0),(32,'','','','','','2016-10-14 02:17:49',7,3,NULL,NULL,0),(33,'','','','','','2016-10-14 02:17:54',11,3,NULL,NULL,0);
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

-- Dump completed on 2016-10-17  1:17:41
