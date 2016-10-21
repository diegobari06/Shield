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
-- Table structure for table `access_doors`
--

DROP TABLE IF EXISTS `access_doors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `access_doors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_door_idx` (`company_id`),
  CONSTRAINT `company_door` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_doors`
--

LOCK TABLES `access_doors` WRITE;
/*!40000 ALTER TABLE `access_doors` DISABLE KEYS */;
INSERT INTO `access_doors` VALUES (1,'Puerta 1',3),(2,'ahora no',3),(3,'ahora no',3),(5,'ahora no',3),(6,'ahora na',3);
/*!40000 ALTER TABLE `access_doors` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Table structure for table `company_configurations`
--

DROP TABLE IF EXISTS `company_configurations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_configurations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity_houses` int(11) DEFAULT '0',
  `quantity_admins` int(11) DEFAULT '0',
  `quantity_access_door` int(11) DEFAULT '0',
  `company_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `company_configuration_idx` (`company_id`),
  CONSTRAINT `company_configuration` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_configurations`
--

LOCK TABLES `company_configurations` WRITE;
/*!40000 ALTER TABLE `company_configurations` DISABLE KEYS */;
INSERT INTO `company_configurations` VALUES (1,100,4,5,3);
/*!40000 ALTER TABLE `company_configurations` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houses`
--

LOCK TABLES `houses` WRITE;
/*!40000 ALTER TABLE `houses` DISABLE KEYS */;
INSERT INTO `houses` VALUES (7,'1','1013',3,0,NULL,NULL),(9,'12',NULL,4,0,NULL,NULL),(11,'2','102',3,0,NULL,NULL),(14,'4','104',3,0,NULL,NULL),(15,'3','103',3,0,NULL,NULL);
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
  `in_service` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `officers_company_idx` (`company_id`),
  CONSTRAINT `officers_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officers`
--

LOCK TABLES `officers` WRITE;
/*!40000 ALTER TABLE `officers` DISABLE KEYS */;
INSERT INTO `officers` VALUES (1,'Juan','Carvajal','Herrera','1131414',3,1),(2,'Sergio',NULL,NULL,'12342134',3,0),(5,'Pedrito','Vargas','Araya','14919585913343',3,0);
/*!40000 ALTER TABLE `officers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `officers_watches`
--

DROP TABLE IF EXISTS `officers_watches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `officers_watches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `watch_id` int(11) DEFAULT NULL,
  `officer_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ok_officer_idx` (`officer_id`),
  KEY `pk_watch_idx` (`watch_id`),
  CONSTRAINT `pk_officer` FOREIGN KEY (`officer_id`) REFERENCES `officers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `pk_watch` FOREIGN KEY (`watch_id`) REFERENCES `watches` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officers_watches`
--

LOCK TABLES `officers_watches` WRITE;
/*!40000 ALTER TABLE `officers_watches` DISABLE KEYS */;
INSERT INTO `officers_watches` VALUES (60,57,1),(61,57,2),(66,60,1);
/*!40000 ALTER TABLE `officers_watches` ENABLE KEYS */;
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
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `me_company_idx` (`company_id`),
  CONSTRAINT `residents_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=419 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (1,'Marvin','Barillas','Solis','3314134','2016-10-11',NULL,7,3,116060486,'sergiojcr16@gmail.com',1,21),(3,'Diego Alonso ','Barillas','Solis','2343245','2016-10-12',NULL,7,3,116140419,'diegobari06@hotmail.com',0,31),(405,'Luis Angel ','Castro','QWER','1412515','2016-10-05',NULL,7,3,11415533,'diegobari06@gmail.com',0,22),(407,'Maria De los angeles',' Castillo','qqwer','7352414','2016-10-20',NULL,7,3,11232123,'scastrorr@ucenfotec.ac.cr',0,NULL),(410,'Sergio','Castro','Rodriguez','2789752','2016-09-28',NULL,7,3,134134,'dbarillasv@ucenfotec.ac.cr',0,31),(412,'Juan','Solano','Barrantes','765245245','2016-09-27',NULL,7,3,62452472,'juansolano@hotmail.com',0,NULL),(413,'Cristina','Rojas','Perez','52413','2016-10-19',NULL,7,3,789123,'cristina41@gmail.com',0,NULL),(414,'Verita','Valverde','Diaz','88871020','2016-10-12',NULL,15,3,1590866,'veravera2727@gmail.com',1,32),(415,'Marvincito','Barillas','Solis','89216272','2016-10-04',NULL,15,3,601650173,'marvin@gmail.com',0,NULL),(417,'adsf','asdf','adsfa','3431','2016-10-13',NULL,15,3,134,'adsf@adf.com',0,NULL),(418,'diegobari06 gmail.com','adsfads','dasf','3431','2016-09-26',NULL,15,3,341,'dbarillasv@ucenfotec.ac.cr1',0,NULL);
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
  `resident_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_users_on_uid_and_provider` (`uid`,`provider`),
  UNIQUE KEY `index_users_on_reset_password_token` (`reset_password_token`),
  KEY `index_users_on_email` (`email`),
  KEY `fk_users_rol_idx` (`rol_id`),
  KEY `users_company_idx` (`company_id`),
  CONSTRAINT `fk_users_rol` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `users_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (17,'email','luiscra@gmail.com','$2a$10$6nxIqUiswNU3vnXQ8KvNb.GNwCWCYp6Nj5.11fwYcrJA/4sQ7Dfqm',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:57:30',NULL,NULL,NULL,NULL,NULL,'luiscra@gmail.com','{}','2016-09-27 03:57:30','2016-09-27 03:57:30',2,NULL,1,3,NULL),(19,'email','luiscra0903@gmail.com','$2a$10$oQxiNLHMgJdmEb7mm4RZduYs1rXVPUIlLiWkssQdyJUX1WkM.l7IC',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:59:27',NULL,NULL,NULL,NULL,NULL,'luiscra0903@gmail.com','{}','2016-09-27 03:59:28','2016-09-27 03:59:28',2,NULL,1,3,NULL),(21,'email','sergiojcr16@gmail.com','$2a$10$3s9y3jMlyCX4rakQyLWLWuN4n78vfQWwXTb36f./GZoh8wzEuvKMK','21eff3257e3e91a61fd3f38b3621a050819456ef6c3544131666fa002e62dc31','2016-10-13 23:00:59',NULL,112,'2016-10-21 00:36:35','2016-10-20 22:01:16','::1','::1',NULL,'2016-10-21 00:36:36',NULL,NULL,NULL,NULL,NULL,'sergiojcr16@gmail.com','{\"sUzZI9Z20nktjomphVT3OQ\":{\"token\":\"$2a$10$nA/aazEC7axjKFUTXe063uHgrG/n.OyuHv1lBSf7J6mTJDOs3//Z2\",\"expiry\":1478175247,\"last_token\":\"$2a$10$djeFVVVpiWA.br2CAVYAYORgHm1E7NASorIpMYV4mxLLG/CbVfPBS\",\"updated_at\":\"2016-10-20T06:14:07.216-06:00\"},\"cQ58TZSlMxlXue1rX4qCig\":{\"token\":\"$2a$10$WS9j0xvCBsaEpd1TPHI0c.SmGLMJO8LXrJ5fjbpiRxllHTpW/7MRm\",\"expiry\":1478175251,\"last_token\":\"$2a$10$v84MUwJdqE0haxfDp2YCBuo0LJBbXwp/.D74f1rwPqS5vcmNdr7YS\",\"updated_at\":\"2016-10-20T06:14:14.933-06:00\"},\"8UBmYIkFFXNhSV2UOpHqww\":{\"token\":\"$2a$10$dNhKZDMOu07XrLX5hu0EZ.whZAReKiC5JmQrTGQfiDvlAM73xUzDC\",\"expiry\":1478175259,\"last_token\":\"$2a$10$jPJ7SasU5/FXprsWYFDBfuXBgeOW9kpfTUVuW3JK.Xxtr/z91YG0u\",\"updated_at\":\"2016-10-20T06:14:19.042-06:00\"},\"9GtjttRvs0qKRb9YTbcIng\":{\"token\":\"$2a$10$7aWYb7IS0afxeuDKGx7Tmuz0mqAKCfDBLU81DXhCGnJvmhPMFM6Ba\",\"expiry\":1478175287,\"last_token\":\"$2a$10$6O9D92pbkxNLWLp2D8WyheSU6RmJKmXCvo48Zy1vJHgyMyFigK7he\",\"updated_at\":\"2016-10-20T06:14:47.732-06:00\"},\"HMZhgskLjs3_IELhTFakqQ\":{\"token\":\"$2a$10$Lwy5DfEdszowOs.5daqrT.HgzvzVnRh5/UnGiGWce9PnwH/pzO.Na\",\"expiry\":1478175303,\"last_token\":\"$2a$10$8QIfVXO.bgNshrQ.ixXK3ukuJOqdp.BrboBdtv//zHgurv22ZyPl6\",\"updated_at\":\"2016-10-20T06:15:03.213-06:00\"},\"y-7WQwS7YpnYKbE3Oc-ljA\":{\"token\":\"$2a$10$kv3tsErHLyxo0BhJW5G1weiWfUWKMUgkhw0d4UoMdCs6CgceLYu3G\",\"expiry\":1478175327,\"last_token\":\"$2a$10$y9ARf4tumtHzzrrr2hQsZ.Tmeb2amXSwtg6/sLitMtb2y.uOrxQxS\",\"updated_at\":\"2016-10-20T06:15:27.184-06:00\"},\"m7kgtlQRIkP89byhTbC46A\":{\"token\":\"$2a$10$a72V0eG9FU9sSFtAxbnG7.HRXzfrdYXK2QQ0lzGl1626d.vloGAka\",\"expiry\":1478209180,\"last_token\":\"$2a$10$xQRKbfdjJo89sgP9BjTstew6qkCy.XrJ.d3cO1r1BelvsSCy98DhW\",\"updated_at\":\"2016-10-20T15:39:40.874-06:00\"},\"LRHY2BJzbohWIZ2br6W3xg\":{\"token\":\"$2a$10$oAMvJn5bBWhbUgFmbRToN.ZfZUVcO8pV1/TDWIS2wbGAB2sciPQwO\",\"expiry\":1478209644,\"last_token\":\"$2a$10$rzY3OUY1dAPf7R6mwX400OauMV6QqytHE32rFXtpZujNwclw8RUN.\",\"updated_at\":\"2016-10-20T15:47:24.550-06:00\"},\"Qz-xTDrAEuYJjnZmIJThIA\":{\"token\":\"$2a$10$qKy4WKBYGgwyvFHwWHlSRebl6E3k4WeTk9Y3P48DN9DmnVT3wpLNi\",\"expiry\":1478210502,\"last_token\":\"$2a$10$7l8kXAplzUx8Ve3P7rjmlerGUH4FZiNZPcMtZjBlZ6ABDHFKv1ttK\",\"updated_at\":\"2016-10-20T16:01:42.251-06:00\"},\"LTbv3yGC36ayTumVs_Vx9Q\":{\"token\":\"$2a$10$5XDk3JiNkaEui1RoqEp8WO6waXHifyCVeqqeWShLp8J6jKoCNXjoO\",\"expiry\":1478219796,\"last_token\":\"$2a$10$uI1gjKUiiC4M63YQ5eooROjLTUocsK58CxsvJmvu7OBMRrOS5NsAu\",\"updated_at\":\"2016-10-20T18:36:36.091-06:00\"}}','2016-10-09 02:46:22','2016-10-21 00:36:36',3,NULL,1,3,1),(22,'email','diegobari06@gmail.com','$2a$10$BmZSKGll1RtU9eI/RSI5n.XEJk81xws/0ogWkI/vSQBiqz5OVWHIK',NULL,NULL,NULL,126,'2016-10-21 01:08:00','2016-10-21 00:44:03','::1','::1',NULL,'2016-10-21 01:08:09',NULL,NULL,NULL,NULL,NULL,'diegobari06@gmail.com','{\"YHG8FZoV2Te2oHEKKNnVZA\":{\"token\":\"$2a$10$2XRMs4JB4Y3dDPr360vYQucIEjR4vQh/EEYJvtfk1nZ2OmOaxmNgK\",\"expiry\":1478167173,\"last_token\":\"$2a$10$weI9CUqUhahxhzg7hM5uxuIy7w6oyrwDix1AM2uMzGqn2bCi4JJQq\",\"updated_at\":\"2016-10-20T03:59:36.696-06:00\"},\"f6o42QRUfw1yuO0YQQSoxw\":{\"token\":\"$2a$10$nbGX9NZuBUsaF1aqQx0VZ.XzfN8x9C1c9B3T31Ak9qxL7YVdM5plq\",\"expiry\":1478167288,\"last_token\":\"$2a$10$Do6HqQzAoA/958Jt7tX18.FPR.ABRzwK66FAadtIh1eMknk5aYAKC\",\"updated_at\":\"2016-10-20T04:01:28.178-06:00\"},\"xWqWsYc_3nNF9LgBxLhCSg\":{\"token\":\"$2a$10$s1uUEL150w.mi9/Li3GreusVVxVUY0CbwbSFBmtm4fKiBXp//5oym\",\"expiry\":1478167292,\"last_token\":\"$2a$10$nnYRsOWRSLFvgbE.CpXy3eAE7WU2Fx0AH4ZaO2mDmDpyH0qF6lzFa\",\"updated_at\":\"2016-10-20T04:01:32.079-06:00\"},\"Q0A-vwGXQu9Ufz3mzHNcYg\":{\"token\":\"$2a$10$Axl4qwt2mgvFfSlJBwY5vOiqUAA02unamjDtmiHm92oejgUdTjQN.\",\"expiry\":1478167374,\"last_token\":\"$2a$10$zFAsho/EcV6xszXibD0RleaWxxdZCr5MBGxuk5P/8JEBGdoCI0BTS\",\"updated_at\":\"2016-10-20T04:02:54.298-06:00\"},\"koWkVqTShx4GJRRW7KkmWw\":{\"token\":\"$2a$10$8qRfHfqvfZ58n7w8J7o4euuiJA3OcZYaAw3LZwhU9GS83qG6GKXJe\",\"expiry\":1478167728,\"last_token\":\"$2a$10$Mh0hMicVjhZbJd7TSBdGYO9o6DIujDF7q9c1xYjp546GGVgrE0RTi\",\"updated_at\":\"2016-10-20T04:08:48.418-06:00\"},\"Crf-E5gMEGEFDEkaEHI0Ew\":{\"token\":\"$2a$10$llq5S.hv5iZLoxD.clrOoeYntq9JGgcJrz3hcy95og3977373G7wm\",\"expiry\":1478167777,\"last_token\":\"$2a$10$ZvGIVq/mPqZbcocyg5X4duNW4RL2Y9sZnxAFlFuAxYEWWho6I7gPG\",\"updated_at\":\"2016-10-20T04:09:41.432-06:00\"},\"S1UX6CrHOFHCR2_yiy0TPw\":{\"token\":\"$2a$10$BLmUklBia/4Zjgg3ayIlb.wB.dEuPdkoSyonfeUfRn5NnscSYZ2IO\",\"expiry\":1478168240,\"last_token\":\"$2a$10$w4I6nNJiLDpYhUPYqZr87uMVZPEohNdW3urdPF6mTw2GDhvYtV0Zy\",\"updated_at\":\"2016-10-20T04:17:20.021-06:00\"},\"4sjQR58TklYslCBK2tbQ4w\":{\"token\":\"$2a$10$4rqTzR2JABQ3MZMcEjr6tuVYC4EkxuE6lQOGk0AwHRUrbd6Yi59bS\",\"expiry\":1478173315,\"last_token\":\"$2a$10$0DUDb45VTxJznRTO/zOaFOM/W5xPcYDO9D8tLwg.S1M0rB7R.48ye\",\"updated_at\":\"2016-10-20T05:41:55.503-06:00\"},\"3ge0_xVebiVarQcLBjHU9A\":{\"token\":\"$2a$10$sRIcFqsgnbia3r6nmBCuselzbu2JTaaPg5MJRZfidvZ48.zyCn9ny\",\"expiry\":1478209231,\"last_token\":\"$2a$10$E03A7ELp7rL6IdymX2NrG.lURGkns0OyyEQo/ZMs8x77y.4szjA1u\",\"updated_at\":\"2016-10-20T15:40:31.611-06:00\"}}','2016-10-11 02:41:05','2016-10-21 01:08:09',2,NULL,1,3,405),(31,'email','dbarillasv@ucenfotec.ac.cr','$2a$10$tiz13.drDTIPiXp8bkRFLOA/LOa9cqIg0QqobbHr9DAQ24GpkkiUW',NULL,NULL,NULL,89,'2016-10-21 01:08:23','2016-10-21 00:49:30','::1','::1',NULL,'2016-10-21 01:23:36',NULL,NULL,NULL,NULL,NULL,'dbarillasv@ucenfotec.ac.cr','{\"o0HL1ECT0dbv0qR7vVnwLw\":{\"token\":\"$2a$10$EcQYnI073KjHT.Ih96z7ZeHq0oGyPsjpRkXrmTB6n/VpKIb.0SDzy\",\"expiry\":1478167887,\"last_token\":\"$2a$10$URNy5Cb61cIvm0CDo.EM1.RAbmA42oIfhnNXvWuPBrnPIwz4bQv2e\",\"updated_at\":\"2016-10-20T04:11:27.299-06:00\"},\"rOeq72Q63rcvih8SV8qMvA\":{\"token\":\"$2a$10$yBtMqgnapTS9yau9Ebzcu.ChxWNXEDPKf7NoRHeZ7ljudhviLFrt.\",\"expiry\":1478168021,\"last_token\":\"$2a$10$fiY223YH3sPPWusPkaM2/eTRg5r95bF0VSbI82x8D.c3J3bN26tX2\",\"updated_at\":\"2016-10-20T04:13:41.622-06:00\"},\"IqSpEJY6U_lvjUp6mwL0SQ\":{\"token\":\"$2a$10$Klqrop.YAEzYyZn.w9jHQ.wA/zeDdRHi1z9ZjCmmHB6PvWss5ZOji\",\"expiry\":1478169380,\"last_token\":\"$2a$10$JUflxioMonMiZN4H9dUf8uLL2SIMOcVtejGwr93X7Bcfd3DmUo8yO\",\"updated_at\":\"2016-10-20T04:36:20.337-06:00\"},\"909GVAGqEOcUEVyFJGGQfg\":{\"token\":\"$2a$10$IAwhvOiwbXtymfG5rt7hwORGwfPzX8hmkF8esFrAVa0ALy4ZLDHCq\",\"expiry\":1478171846,\"last_token\":\"$2a$10$RQ6S/Hm52709nv558KZtIu0yQE8mQs24v3vVp0S7pPfDHYLhobfSe\",\"updated_at\":\"2016-10-20T05:17:26.908-06:00\"},\"ikf5vfdEwd2fIQ_HJ7KP2w\":{\"token\":\"$2a$10$Sg8.i5YTGqADcRQJeKCmQ.PA.OSwYFQOuZFT47vl/IEocPNTj3qgu\",\"expiry\":1478174062,\"last_token\":\"$2a$10$n3HrmcbejR86OaWK9fR8mOVRV84NwhAHpm3hk0ddp86O2VSKGDLiC\",\"updated_at\":\"2016-10-20T05:54:22.737-06:00\"},\"uxeP-tLoyqhZR5pGcIKo-w\":{\"token\":\"$2a$10$Q2KTodI6it3wIEkZerJncuAkbSgvjWWfVsv0oVVwLY8hc9bFJckL.\",\"expiry\":1478174672,\"last_token\":\"$2a$10$3.GpT14oU/KfITCcxBOLGuq4ln2vMAUcRyZqzQxfyWIZsdj9garci\",\"updated_at\":\"2016-10-20T06:04:32.034-06:00\"},\"_8ah-fz81MO79TMhpKMiQg\":{\"token\":\"$2a$10$flAOMzCzbHtT4a8gBXb4A.hZQIehRfG0fHluVx2Vb0.iC0HYNmtZC\",\"expiry\":1478174726,\"last_token\":\"$2a$10$b8/ANKxHesQiSvR6PdzgSu4vUdV.OZ8bGff0AJlBsF9T3xWCAG3nq\",\"updated_at\":\"2016-10-20T06:05:26.198-06:00\"},\"meu-9s6V6obpAuuJGLkW8w\":{\"token\":\"$2a$10$79uf5BtasvbVP7m1.jljs.yEuUGR22/b5wx.jRFoF9jJOD6Ue.d.u\",\"expiry\":1478174792,\"last_token\":\"$2a$10$8nUXJy0t4vR542KdYEX2CeSlA/OWZlsR3EBLgAg7iHAyOLeV1tMti\",\"updated_at\":\"2016-10-20T06:06:32.930-06:00\"},\"H5nAVihCuYiFr8-el7-oTA\":{\"token\":\"$2a$10$hJmnSeGwQyO6Qw1TyrdBCev/b.jPIkCxKmLcMy93H.9Uoj3AtlQBa\",\"expiry\":1478174881,\"last_token\":\"$2a$10$imyfd9tdloy2jwM4Bk.oquIrArQQVvgTtj15JOLrIR/FRa.DqbtF.\",\"updated_at\":\"2016-10-20T06:08:01.978-06:00\"},\"4H594ahnWIVDjZwASk3DHg\":{\"token\":\"$2a$10$admnXWw8343G3U.uxgsh3.jlpIz/h.0J1QcgV2nhqEHZh/CUTt2Eu\",\"expiry\":1478222616,\"last_token\":\"$2a$10$E8p36vv78VXqNbQd5inuKOGjpMjuDs97N4ToAaAZ/7TCPryTftb8q\",\"updated_at\":\"2016-10-20T19:23:36.767-06:00\"}}','2016-10-19 10:47:08','2016-10-21 01:23:36',1,NULL,1,3,3),(32,'email','veravera2727@gmail.com','$2a$10$5ciBUyrXTIE6c4.thZfaze/WQBQEp4VGiCRG8bQ52QEUDJXYmBLwC',NULL,NULL,NULL,6,'2016-10-21 00:43:01','2016-10-20 22:05:23','::1','::1',NULL,'2016-10-21 00:43:01',NULL,NULL,NULL,NULL,NULL,'veravera2727@gmail.com','{\"7GzrLAXm_xI5rrmQ-hnobw\":{\"token\":\"$2a$10$CkkslK4mpH4mSZv6kcB1EOAxVX4kxMQFCRImVl6vzIDDgoeIY.xQu\",\"expiry\":1478209144,\"last_token\":\"$2a$10$UMubasw2VovlxpUNT8T13Oy4oVuuAvAbcB2uqDkIo59mIDBzWzfkm\",\"updated_at\":\"2016-10-20T15:39:04.522-06:00\"},\"2vFhn9BOjVscfzpsHZsubQ\":{\"token\":\"$2a$10$Ti2KDF4KWHJo2buLHG8z1.QmEIBlpcNDatOL.3FIRh8t4nk5YbqHa\",\"expiry\":1478220181,\"last_token\":\"$2a$10$oBbBcUYU0zc22Bbd6uSjxOEjCwyQyKeR.zGZ2p/6izZb4b4hOOi3e\",\"updated_at\":\"2016-10-20T18:43:01.815-06:00\"}}','2016-10-20 21:34:30','2016-10-21 00:43:01',1,NULL,1,3,414);
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicules`
--

LOCK TABLES `vehicules` WRITE;
/*!40000 ALTER TABLE `vehicules` DISABLE KEYS */;
INSERT INTO `vehicules` VALUES (3,'hahaha',NULL,NULL,NULL,NULL),(4,'hahasha',NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL),(6,'hahasasha',NULL,NULL,NULL,NULL),(7,'hahasashaw',NULL,NULL,NULL,NULL),(25,'7164914','Kia','rgb(199, 255, 69)',11,3),(26,'617574','Izuzu','rgb(28, 255, 47)',11,3),(27,'2524524','Ford','rgb(173, 150, 255)',7,3),(28,'854506','Honda','rgb(125, 125, 125)',15,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitants`
--

LOCK TABLES `visitants` WRITE;
/*!40000 ALTER TABLE `visitants` DISABLE KEYS */;
INSERT INTO `visitants` VALUES (1,'Sergio','Castro','Rodriguez','116060486',NULL,'2016-10-09 01:20:04',7,3,'2016-10-17 00:47:04','2016-10-17 00:49:04',1),(34,'Andrea','Saborio','Herrera','8134781','624232','2016-10-20 22:01:30',15,3,NULL,NULL,0);
/*!40000 ALTER TABLE `visitants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watches`
--

DROP TABLE IF EXISTS `watches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `watches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `initial_time` datetime DEFAULT NULL,
  `final_time` datetime DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `access_door_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `watch_company_idx` (`company_id`),
  KEY `watch_access_idx` (`access_door_id`),
  CONSTRAINT `watch_access` FOREIGN KEY (`access_door_id`) REFERENCES `access_doors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `watch_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watches`
--

LOCK TABLES `watches` WRITE;
/*!40000 ALTER TABLE `watches` DISABLE KEYS */;
INSERT INTO `watches` VALUES (57,'2016-10-18 00:02:00','2016-10-18 00:02:15',3,1),(58,'2016-10-18 00:02:15','2016-10-18 00:02:31',3,1),(59,'2016-10-18 00:02:31','2016-10-18 00:02:59',3,1),(60,'2016-10-18 00:02:59',NULL,3,1);
/*!40000 ALTER TABLE `watches` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-20 19:55:49
