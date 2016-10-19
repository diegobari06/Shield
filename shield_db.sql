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
INSERT INTO `company_configurations` VALUES (1,3,4,5,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houses`
--

LOCK TABLES `houses` WRITE;
/*!40000 ALTER TABLE `houses` DISABLE KEYS */;
INSERT INTO `houses` VALUES (7,'1','101',3,0,NULL,NULL),(9,'12',NULL,4,0,NULL,NULL),(11,'2','102',3,0,NULL,NULL),(12,NULL,NULL,3,0,NULL,NULL);
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
  `in_service` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `officers_company_idx` (`company_id`),
  CONSTRAINT `officers_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `officers`
--

LOCK TABLES `officers` WRITE;
/*!40000 ALTER TABLE `officers` DISABLE KEYS */;
INSERT INTO `officers` VALUES (1,'Juan','Carvajal','Herrera','1131414',3,'384183',1),(2,'Sergio',NULL,NULL,'12342134',3,NULL,0),(3,'TOribio',NULL,NULL,NULL,3,'1234',0),(4,'Joaquin',NULL,NULL,NULL,3,'41234',0);
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
INSERT INTO `officers_watches` VALUES (60,57,1),(61,57,2),(62,58,3),(63,58,4),(64,59,3),(65,59,4),(66,60,1);
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
  PRIMARY KEY (`id`),
  KEY `me_company_idx` (`company_id`),
  CONSTRAINT `residents_company` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=410 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `residents`
--

LOCK TABLES `residents` WRITE;
/*!40000 ALTER TABLE `residents` DISABLE KEYS */;
INSERT INTO `residents` VALUES (1,'sergio','castro','rodriguez','3314134','2016-10-11',NULL,7,3,116060486,'sergiojcr16@gmail.com',0),(3,'qwerqwer','qwerqwerwqe','qwerqwerweq','2343245','2016-10-12',NULL,7,3,12312,'werwqe@a.com',0),(4,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142450,'eew@w.com',0),(5,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142452,'eew@w.com',0),(6,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142457,'eew@w.com',0),(7,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142451,'eew@w.com',0),(8,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142454,'eew@w.com',0),(9,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142453,'eew@w.com',0),(10,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142456,'eew@w.com',0),(11,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142458,'eew@w.com',0),(12,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142459,'eew@w.com',0),(13,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,142455,'eew@w.com',0),(14,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424510,'eew@w.com',0),(15,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424511,'eew@w.com',0),(16,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424513,'eew@w.com',0),(17,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424515,'eew@w.com',0),(18,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424514,'eew@w.com',0),(19,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424512,'eew@w.com',0),(20,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424516,'eew@w.com',0),(21,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424518,'eew@w.com',0),(22,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424519,'eew@w.com',0),(23,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424517,'eew@w.com',0),(24,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424520,'eew@w.com',0),(25,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424521,'eew@w.com',0),(26,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424522,'eew@w.com',0),(27,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424525,'eew@w.com',0),(28,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424524,'eew@w.com',0),(29,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424523,'eew@w.com',0),(30,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424528,'eew@w.com',0),(31,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424527,'eew@w.com',0),(32,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424526,'eew@w.com',0),(33,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424529,'eew@w.com',0),(34,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424531,'eew@w.com',0),(35,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424530,'eew@w.com',0),(36,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424534,'eew@w.com',0),(37,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424532,'eew@w.com',0),(38,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424537,'eew@w.com',0),(39,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424535,'eew@w.com',0),(40,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424533,'eew@w.com',0),(41,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424539,'eew@w.com',0),(42,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424536,'eew@w.com',0),(43,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424540,'eew@w.com',0),(44,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424538,'eew@w.com',0),(45,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424543,'eew@w.com',0),(46,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424542,'eew@w.com',0),(47,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424541,'eew@w.com',0),(48,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424544,'eew@w.com',0),(49,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424545,'eew@w.com',0),(50,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424546,'eew@w.com',0),(51,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424549,'eew@w.com',0),(52,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424548,'eew@w.com',0),(53,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424547,'eew@w.com',0),(54,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424550,'eew@w.com',0),(55,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424551,'eew@w.com',0),(56,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424552,'eew@w.com',0),(57,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424553,'eew@w.com',0),(58,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424555,'eew@w.com',0),(59,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424556,'eew@w.com',0),(60,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424554,'eew@w.com',0),(61,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424557,'eew@w.com',0),(62,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424558,'eew@w.com',0),(63,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424559,'eew@w.com',0),(64,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424563,'eew@w.com',0),(65,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424564,'eew@w.com',0),(66,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424561,'eew@w.com',0),(67,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424562,'eew@w.com',0),(68,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424560,'eew@w.com',0),(69,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424565,'eew@w.com',0),(70,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424566,'eew@w.com',0),(71,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424569,'eew@w.com',0),(72,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424568,'eew@w.com',0),(73,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424570,'eew@w.com',0),(74,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424571,'eew@w.com',0),(75,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424567,'eew@w.com',0),(76,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424574,'eew@w.com',0),(77,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424573,'eew@w.com',0),(78,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424575,'eew@w.com',0),(79,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424572,'eew@w.com',0),(80,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424576,'eew@w.com',0),(81,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424577,'eew@w.com',0),(82,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424578,'eew@w.com',0),(83,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424579,'eew@w.com',0),(84,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424581,'eew@w.com',0),(85,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424583,'eew@w.com',0),(86,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424580,'eew@w.com',0),(87,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424584,'eew@w.com',0),(88,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424582,'eew@w.com',0),(89,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424585,'eew@w.com',0),(90,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424586,'eew@w.com',0),(91,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424588,'eew@w.com',0),(92,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424587,'eew@w.com',0),(93,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424591,'eew@w.com',0),(94,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424590,'eew@w.com',0),(95,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424592,'eew@w.com',0),(96,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424589,'eew@w.com',0),(97,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424594,'eew@w.com',0),(98,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424595,'eew@w.com',0),(99,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424593,'eew@w.com',0),(100,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424599,'eew@w.com',0),(101,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424596,'eew@w.com',0),(102,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245100,'eew@w.com',0),(103,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424598,'eew@w.com',0),(104,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,1424597,'eew@w.com',0),(105,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245101,'eew@w.com',0),(106,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245102,'eew@w.com',0),(107,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245103,'eew@w.com',0),(108,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245104,'eew@w.com',0),(109,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245106,'eew@w.com',0),(110,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245105,'eew@w.com',0),(111,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245107,'eew@w.com',0),(112,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245109,'eew@w.com',0),(113,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245108,'eew@w.com',0),(114,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245113,'eew@w.com',0),(115,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245114,'eew@w.com',0),(116,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245115,'eew@w.com',0),(117,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245111,'eew@w.com',0),(118,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245112,'eew@w.com',0),(119,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245110,'eew@w.com',0),(120,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245116,'eew@w.com',0),(121,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245117,'eew@w.com',0),(122,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245120,'eew@w.com',0),(123,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245118,'eew@w.com',0),(124,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245119,'eew@w.com',0),(125,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245121,'eew@w.com',0),(126,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245123,'eew@w.com',0),(127,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245122,'eew@w.com',0),(128,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245124,'eew@w.com',0),(129,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245127,'eew@w.com',0),(130,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245126,'eew@w.com',0),(131,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245125,'eew@w.com',0),(132,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245129,'eew@w.com',0),(133,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245128,'eew@w.com',0),(134,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245133,'eew@w.com',0),(135,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245131,'eew@w.com',0),(136,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245130,'eew@w.com',0),(137,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245132,'eew@w.com',0),(138,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245135,'eew@w.com',0),(139,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245134,'eew@w.com',0),(140,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245138,'eew@w.com',0),(141,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245136,'eew@w.com',0),(142,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245137,'eew@w.com',0),(143,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245142,'eew@w.com',0),(144,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245139,'eew@w.com',0),(145,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245141,'eew@w.com',0),(146,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245140,'eew@w.com',0),(147,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245143,'eew@w.com',0),(148,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245144,'eew@w.com',0),(149,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245149,'eew@w.com',0),(150,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245150,'eew@w.com',0),(151,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245145,'eew@w.com',0),(152,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245148,'eew@w.com',0),(153,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245147,'eew@w.com',0),(154,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245146,'eew@w.com',0),(155,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245152,'eew@w.com',0),(156,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245151,'eew@w.com',0),(157,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245156,'eew@w.com',0),(158,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245157,'eew@w.com',0),(159,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245154,'eew@w.com',0),(160,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245153,'eew@w.com',0),(161,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245155,'eew@w.com',0),(162,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245158,'eew@w.com',0),(163,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245162,'eew@w.com',0),(164,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245159,'eew@w.com',0),(165,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245160,'eew@w.com',0),(166,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245161,'eew@w.com',0),(167,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245163,'eew@w.com',0),(168,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245167,'eew@w.com',0),(169,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245165,'eew@w.com',0),(170,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245164,'eew@w.com',0),(171,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245169,'eew@w.com',0),(172,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245166,'eew@w.com',0),(173,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245168,'eew@w.com',0),(174,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245172,'eew@w.com',0),(175,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245173,'eew@w.com',0),(176,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245170,'eew@w.com',0),(177,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245175,'eew@w.com',0),(178,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245171,'eew@w.com',0),(179,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245178,'eew@w.com',0),(180,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245174,'eew@w.com',0),(181,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245177,'eew@w.com',0),(182,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245176,'eew@w.com',0),(183,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245179,'eew@w.com',0),(184,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245180,'eew@w.com',0),(185,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245181,'eew@w.com',0),(186,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245182,'eew@w.com',0),(187,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245184,'eew@w.com',0),(188,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245183,'eew@w.com',0),(189,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245185,'eew@w.com',0),(190,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245188,'eew@w.com',0),(191,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245187,'eew@w.com',0),(192,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245186,'eew@w.com',0),(193,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245189,'eew@w.com',0),(194,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245191,'eew@w.com',0),(195,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245190,'eew@w.com',0),(196,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245194,'eew@w.com',0),(197,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245193,'eew@w.com',0),(198,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245192,'eew@w.com',0),(199,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245196,'eew@w.com',0),(200,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245195,'eew@w.com',0),(201,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245197,'eew@w.com',0),(202,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245198,'eew@w.com',0),(203,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245202,'eew@w.com',0),(204,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245200,'eew@w.com',0),(205,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245199,'eew@w.com',0),(206,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245204,'eew@w.com',0),(207,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245205,'eew@w.com',0),(208,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245201,'eew@w.com',0),(209,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245203,'eew@w.com',0),(210,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245208,'eew@w.com',0),(211,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245207,'eew@w.com',0),(212,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245206,'eew@w.com',0),(213,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245209,'eew@w.com',0),(214,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245210,'eew@w.com',0),(215,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245211,'eew@w.com',0),(216,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245213,'eew@w.com',0),(217,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245212,'eew@w.com',0),(218,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245217,'eew@w.com',0),(219,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245216,'eew@w.com',0),(220,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245214,'eew@w.com',0),(221,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245215,'eew@w.com',0),(222,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245218,'eew@w.com',0),(223,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245219,'eew@w.com',0),(224,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245221,'eew@w.com',0),(225,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245223,'eew@w.com',0),(226,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245220,'eew@w.com',0),(227,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245224,'eew@w.com',0),(228,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245225,'eew@w.com',0),(229,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245226,'eew@w.com',0),(230,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245222,'eew@w.com',0),(231,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245227,'eew@w.com',0),(232,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245228,'eew@w.com',0),(233,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245229,'eew@w.com',0),(234,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245230,'eew@w.com',0),(235,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245232,'eew@w.com',0),(236,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245231,'eew@w.com',0),(237,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245233,'eew@w.com',0),(238,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245234,'eew@w.com',0),(239,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245235,'eew@w.com',0),(240,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245236,'eew@w.com',0),(241,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245237,'eew@w.com',0),(242,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245238,'eew@w.com',0),(243,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245239,'eew@w.com',0),(244,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245240,'eew@w.com',0),(245,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245241,'eew@w.com',0),(246,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245242,'eew@w.com',0),(247,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245243,'eew@w.com',0),(248,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245244,'eew@w.com',0),(249,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245245,'eew@w.com',0),(250,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245246,'eew@w.com',0),(251,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245247,'eew@w.com',0),(252,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245248,'eew@w.com',0),(253,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245249,'eew@w.com',0),(254,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245250,'eew@w.com',0),(255,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245251,'eew@w.com',0),(256,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245253,'eew@w.com',0),(257,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245252,'eew@w.com',0),(258,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245254,'eew@w.com',0),(259,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245255,'eew@w.com',0),(260,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245257,'eew@w.com',0),(261,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245256,'eew@w.com',0),(262,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245258,'eew@w.com',0),(263,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245259,'eew@w.com',0),(264,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245260,'eew@w.com',0),(265,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245261,'eew@w.com',0),(266,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245262,'eew@w.com',0),(267,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245263,'eew@w.com',0),(268,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245265,'eew@w.com',0),(269,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245264,'eew@w.com',0),(270,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245266,'eew@w.com',0),(271,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245267,'eew@w.com',0),(272,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245269,'eew@w.com',0),(273,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245268,'eew@w.com',0),(274,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245270,'eew@w.com',0),(275,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245271,'eew@w.com',0),(276,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245272,'eew@w.com',0),(277,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245274,'eew@w.com',0),(278,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245275,'eew@w.com',0),(279,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245276,'eew@w.com',0),(280,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245273,'eew@w.com',0),(281,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245277,'eew@w.com',0),(282,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245279,'eew@w.com',0),(283,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245282,'eew@w.com',0),(284,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245281,'eew@w.com',0),(285,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245278,'eew@w.com',0),(286,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245284,'eew@w.com',0),(287,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245280,'eew@w.com',0),(288,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245288,'eew@w.com',0),(289,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245287,'eew@w.com',0),(290,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245283,'eew@w.com',0),(291,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245285,'eew@w.com',0),(292,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245286,'eew@w.com',0),(293,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245290,'eew@w.com',0),(294,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245291,'eew@w.com',0),(295,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245289,'eew@w.com',0),(296,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245294,'eew@w.com',0),(297,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245293,'eew@w.com',0),(298,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245292,'eew@w.com',0),(299,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245296,'eew@w.com',0),(300,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245295,'eew@w.com',0),(301,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245297,'eew@w.com',0),(302,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245298,'eew@w.com',0),(303,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245299,'eew@w.com',0),(304,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245301,'eew@w.com',0),(305,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245300,'eew@w.com',0),(306,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245302,'eew@w.com',0),(307,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245303,'eew@w.com',0),(308,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245304,'eew@w.com',0),(309,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245305,'eew@w.com',0),(310,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245306,'eew@w.com',0),(311,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245307,'eew@w.com',0),(312,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245310,'eew@w.com',0),(313,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245309,'eew@w.com',0),(314,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245313,'eew@w.com',0),(315,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245308,'eew@w.com',0),(316,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245315,'eew@w.com',0),(317,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245316,'eew@w.com',0),(318,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245311,'eew@w.com',0),(319,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245312,'eew@w.com',0),(320,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245318,'eew@w.com',0),(321,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245314,'eew@w.com',0),(322,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245317,'eew@w.com',0),(323,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245319,'eew@w.com',0),(324,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245320,'eew@w.com',0),(325,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245322,'eew@w.com',0),(326,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245321,'eew@w.com',0),(327,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245323,'eew@w.com',0),(328,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245324,'eew@w.com',0),(329,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245325,'eew@w.com',0),(330,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245326,'eew@w.com',0),(331,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245327,'eew@w.com',0),(332,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245328,'eew@w.com',0),(333,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245329,'eew@w.com',0),(334,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245330,'eew@w.com',0),(335,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245332,'eew@w.com',0),(336,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245331,'eew@w.com',0),(337,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245334,'eew@w.com',0),(338,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245333,'eew@w.com',0),(339,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245335,'eew@w.com',0),(340,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245336,'eew@w.com',0),(341,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245337,'eew@w.com',0),(342,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245338,'eew@w.com',0),(343,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245339,'eew@w.com',0),(344,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245340,'eew@w.com',0),(345,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245341,'eew@w.com',0),(346,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245342,'eew@w.com',0),(347,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245343,'eew@w.com',0),(348,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245344,'eew@w.com',0),(349,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245345,'eew@w.com',0),(350,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245346,'eew@w.com',0),(351,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245347,'eew@w.com',0),(352,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245348,'eew@w.com',0),(353,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245349,'eew@w.com',0),(354,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245350,'eew@w.com',0),(355,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245351,'eew@w.com',0),(356,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245352,'eew@w.com',0),(357,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245353,'eew@w.com',0),(358,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245354,'eew@w.com',0),(359,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245356,'eew@w.com',0),(360,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245357,'eew@w.com',0),(361,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245355,'eew@w.com',0),(362,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245358,'eew@w.com',0),(363,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245359,'eew@w.com',0),(364,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245360,'eew@w.com',0),(365,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245361,'eew@w.com',0),(366,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245363,'eew@w.com',0),(367,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245362,'eew@w.com',0),(368,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245364,'eew@w.com',0),(369,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245365,'eew@w.com',0),(370,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245366,'eew@w.com',0),(371,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245367,'eew@w.com',0),(372,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245368,'eew@w.com',0),(373,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245369,'eew@w.com',0),(374,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245370,'eew@w.com',0),(375,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245371,'eew@w.com',0),(376,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245372,'eew@w.com',0),(377,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245373,'eew@w.com',0),(378,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245374,'eew@w.com',0),(379,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245376,'eew@w.com',0),(380,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245375,'eew@w.com',0),(381,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245377,'eew@w.com',0),(382,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245378,'eew@w.com',0),(383,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245380,'eew@w.com',0),(384,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245379,'eew@w.com',0),(385,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245381,'eew@w.com',0),(386,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245382,'eew@w.com',0),(387,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245383,'eew@w.com',0),(388,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245384,'eew@w.com',0),(389,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245385,'eew@w.com',0),(390,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245386,'eew@w.com',0),(391,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245387,'eew@w.com',0),(392,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245389,'eew@w.com',0),(393,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245388,'eew@w.com',0),(394,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245390,'eew@w.com',0),(395,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245392,'eew@w.com',0),(396,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245393,'eew@w.com',0),(397,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245395,'eew@w.com',0),(398,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245391,'eew@w.com',0),(399,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245396,'eew@w.com',0),(400,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245397,'eew@w.com',0),(401,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245398,'eew@w.com',0),(402,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245394,'eew@w.com',0),(403,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245,'eew@w.com',0),(404,'Joquin','werqwer','werqwrqw','1234','2016-10-04',NULL,7,3,14245399,'eew@w.com',0),(405,'werqweAQ','WQERQWER','QWER','546','2016-10-05',NULL,7,3,11215,'w@e.com',0),(406,'qwer','qewr','qwer','3412','2016-10-19',NULL,7,3,1542,'qqw@j.com',0),(407,'werqwer','qwer','qqwer','4564','2016-10-20',NULL,7,3,11232123,'3@w.com',0);
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
INSERT INTO `users` VALUES (17,'email','luiscra@gmail.com','$2a$10$6nxIqUiswNU3vnXQ8KvNb.GNwCWCYp6Nj5.11fwYcrJA/4sQ7Dfqm',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:57:30',NULL,NULL,NULL,NULL,NULL,'luiscra@gmail.com','{}','2016-09-27 03:57:30','2016-09-27 03:57:30',2,NULL,1,3),(18,'email','scastror@ucenfotec.ac.cr','$2a$10$0wEhbn7Kv8FA/vkRRSSnpeKh70xpfqo9zbOL8ZHwkzGfWqpEv6Aa.',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:58:59',NULL,NULL,NULL,NULL,NULL,'scastror@ucenfotec.ac.cr','{}','2016-09-27 03:59:00','2016-09-27 03:59:00',3,NULL,1,3),(19,'email','luiscra0903@gmail.com','$2a$10$oQxiNLHMgJdmEb7mm4RZduYs1rXVPUIlLiWkssQdyJUX1WkM.l7IC',NULL,NULL,NULL,0,NULL,NULL,NULL,NULL,NULL,'2016-09-27 03:59:27',NULL,NULL,NULL,NULL,NULL,'luiscra0903@gmail.com','{}','2016-09-27 03:59:28','2016-09-27 03:59:28',2,NULL,1,3),(21,'email','sergiojcr16@gmail.com','$2a$10$3s9y3jMlyCX4rakQyLWLWuN4n78vfQWwXTb36f./GZoh8wzEuvKMK','21eff3257e3e91a61fd3f38b3621a050819456ef6c3544131666fa002e62dc31','2016-10-13 23:00:59',NULL,33,'2016-10-14 02:34:32','2016-10-14 02:33:02','::1','::1',NULL,'2016-10-14 02:35:01',NULL,NULL,NULL,NULL,NULL,'sergiojcr16@gmail.com','{\"thUMlSnAw3MxNgsUOvnN2A\":{\"token\":\"$2a$10$0JSRp4XmPHzDxXfDHv/AT.5vhXwDCIznZPVpvHdEEgmQAUINXuENm\",\"expiry\":1477621947,\"last_token\":\"$2a$10$vtzRv0TGVF0xd6PJHmdf/./VOb/LiOyi3WO4U7TuWSla7KC4O4b4a\",\"updated_at\":\"2016-10-13T20:32:31.417-06:00\"},\"_EEjRTXn5V7qwpp0vRqQOg\":{\"token\":\"$2a$10$dCU0TNpBm0xDxaPkRzllTu85mBoxXUnFmJPl6Do9Uo3p3f0ttEmRu\",\"expiry\":1477621953,\"last_token\":\"$2a$10$YBqo9E7wpwjOo/jAJC2g3euHi9eGS.1ffiOy4lN/YErliwbObOKEu\",\"updated_at\":\"2016-10-13T20:32:33.038-06:00\"},\"tiege3xVnLVUmqGgDLzjcw\":{\"token\":\"$2a$10$tNiq/1klEHDdioUH5RJ/k.o8Ovs0k9NcDGsPRdJaQZyDsk0SECHDm\",\"expiry\":1477621963,\"last_token\":\"$2a$10$wEcXtYa86QSDa8P.ZyKzpunh.G/sIedOC.Fnl.J10dqKvxdBVgayq\",\"updated_at\":\"2016-10-13T20:32:43.023-06:00\"},\"mcQteM-V6cUCWs5gZw3CUA\":{\"token\":\"$2a$10$aAQl7/RL02khTPa4IBWjj.9Qoc.5EB5JRJ0LCsPoexb6H9fI4vsu2\",\"expiry\":1477621963,\"last_token\":\"$2a$10$sqBXnFPHRxizWxxBA909i.wXeWX7afs1co9jQusoTk6asJ54YibVy\",\"updated_at\":\"2016-10-13T20:32:43.433-06:00\"},\"3bJ3E6U7ZB7ZSIwDm7Av1g\":{\"token\":\"$2a$10$9JQYuUcJyU8YywWFW3NZOO.lasBNMbQC6T8PQHY5sFY.zS8tPBlhG\",\"expiry\":1477621963,\"last_token\":\"$2a$10$Lxa0L/MJ9.qnswu8vmtTTOIzFld8jNDjhXR8X/9s0jmoEbgua2MYW\",\"updated_at\":\"2016-10-13T20:32:43.887-06:00\"},\"QLy1KR9DtcneIMPiDmHknQ\":{\"token\":\"$2a$10$zMZUCOD9FNEbVyXVYb1kqu1eH/l5LO7GjERpSUDBmY/u5sk5UBXyC\",\"expiry\":1477621978,\"last_token\":\"$2a$10$ryuDLXoZz2KAMTxncnQK5.Naz4ritLS1Ghf1KiANwr.OFY4S4x1uu\",\"updated_at\":\"2016-10-13T20:32:58.081-06:00\"},\"FxGG6ZcLqaPFfba6Vis6pw\":{\"token\":\"$2a$10$glCo3bvbR0ZfGR15IJ009eXmYMKhhRcY.Lwl54fXJmszDJaojlHoa\",\"expiry\":1477621979,\"last_token\":\"$2a$10$3OrQV0BYFqy4RW3YgD2yguTuzIiHtrYTEtxjOuFmoruOGJIgInzsK\",\"updated_at\":\"2016-10-13T20:32:59.273-06:00\"},\"ZrBxAa5xeJRa6Kztpf5Qlg\":{\"token\":\"$2a$10$CEkDITvhDuSXvSvTiAejzu8fEOXUOd3HAm8YoPCGPYbsg/r0A4aX6\",\"expiry\":1477621981,\"last_token\":\"$2a$10$VHR11w7iifvi4Q3.yFmqYemxXuP5HEZS29clvA2YprX2cJb59T9Rq\",\"updated_at\":\"2016-10-13T20:33:01.704-06:00\"},\"Q0pMa1Y8RKsizwi_WT8Rxg\":{\"token\":\"$2a$10$sGUSotW6AsEI9Mti8HsQ1.5ftebMLWJJub.44fhdz9u63eMVgGQzK\",\"expiry\":1477622069,\"last_token\":\"$2a$10$i.R/kbSXmt6XwkBJumWN0.snPZ/ESU0yCYrIyKSayuBob8mHPw7hq\",\"updated_at\":\"2016-10-13T20:34:29.355-06:00\"},\"XcjSTIvVS0S8QOEbT5BI3w\":{\"token\":\"$2a$10$st8pjHlygZb6ZY5ngkfSsO3gitbAT8MyevjIb42xqV0v8lKl4O3aC\",\"expiry\":1477622091,\"last_token\":\"$2a$10$EbXxs3Jsz968indoJVtCieWenyyva8lSYmL0Nl.fauAhdIfoZGoiS\",\"updated_at\":\"2016-10-13T20:35:01.859-06:00\"}}','2016-10-09 02:46:22','2016-10-14 02:35:01',3,NULL,1,3),(22,'email','diegobari06@gmail.com','$2a$10$BmZSKGll1RtU9eI/RSI5n.XEJk81xws/0ogWkI/vSQBiqz5OVWHIK',NULL,NULL,NULL,72,'2016-10-19 06:05:27','2016-10-19 05:48:27','::1','::1',NULL,'2016-10-19 06:05:27',NULL,NULL,NULL,NULL,NULL,'diegobari06@gmail.com','{\"9QpSZHl-IxCSFLT5FZYqNg\":{\"token\":\"$2a$10$XWeSvA8asy8VEKhvuXr0NO1AYS41kRnSHAV2VOdGEgR.IsF58MpS6\",\"expiry\":1478061244,\"last_token\":\"$2a$10$OdofJ/xavTO7zjOIXpE2tu0XDu5JuhJt2sU/dCjxfY9ax6NpQhfu6\",\"updated_at\":\"2016-10-18T22:34:04.473-06:00\"},\"2JCD0_W5tQjIySBZ_WR19g\":{\"token\":\"$2a$10$bdEeuuzPg8XITqWRQkA7OOEp8oTDQq4bCJ8Z/lOyv5.ju/9HJK7du\",\"expiry\":1478061245,\"last_token\":\"$2a$10$dpGWh67/jvHcmpgjjZ1BSu/R5pQUU9.tT4bStwjM2oBQtmdmoIbmq\",\"updated_at\":\"2016-10-18T22:34:05.033-06:00\"},\"Ocxl6jpFpSRpOPS4TMHeng\":{\"token\":\"$2a$10$iYk7eRiNeXRYbRsv0ghcCOMIKPo6Dfun5iyeHqZ0p2ySfUWibGwp6\",\"expiry\":1478061974,\"last_token\":\"$2a$10$rCKWnL6YCI3aiTa14cU2FOm0jMEe9JK9Ss.2nhBsykt4c08lSLYFG\",\"updated_at\":\"2016-10-18T22:46:14.761-06:00\"},\"_11YyLcwLKxpvdcaly0T9w\":{\"token\":\"$2a$10$GC1Ho65jt7506ZH7URdXl.5buFxL6XaZWBr/Iq59JW0iQRaPOJ/7u\",\"expiry\":1478062415,\"last_token\":\"$2a$10$aunN.1T5qzvDw1k7D6FQV.oDoWd1UDl3wkLCx9usV2yOHBzyYSWdy\",\"updated_at\":\"2016-10-18T22:53:40.622-06:00\"},\"C1d9spQcrRVulSLjWbsWjw\":{\"token\":\"$2a$10$YEW8tKyO9g1xpBdVcWEqC.Nq1.2jPJIXbkJu6gc8g8XjVjoFNVjz.\",\"expiry\":1478064516,\"last_token\":\"$2a$10$1qS84TY4oDjDYZUmHi2dP.ZHURoC4Vcq/vjdAsuJTqDYiUSboGmyO\",\"updated_at\":\"2016-10-18T23:28:36.109-06:00\"},\"vmAJjfI63dShy3XiB7vF6w\":{\"token\":\"$2a$10$KOVDR5tMv0WuKva8qVjL6eToXKGrT2CUkXXKW0C5l9tBLgqutPbBu\",\"expiry\":1478065166,\"last_token\":\"$2a$10$e62km0UgU60Ls2qnFnbXm.NSisETgiL/JNUeNT2xKnrQdk6aUc.Vu\",\"updated_at\":\"2016-10-18T23:39:28.732-06:00\"},\"MmwfCpW3vsMaU967cA64Hw\":{\"token\":\"$2a$10$3Esr/djekOxfGvjjJ2xGz..GomDvjjiuKx1T64l4agLbUtgPV4D2e\",\"expiry\":1478065707,\"last_token\":\"$2a$10$UpBGAwcP0WU.I3WDdRnEcuBhe5zFGZrtuUaZNSMRvzReE4wMrDWNu\",\"updated_at\":\"2016-10-18T23:48:27.027-06:00\"},\"lbWYY7EcQAIX8OZM7m6ckQ\":{\"token\":\"$2a$10$Y6uR.g2SwxNfsCpM/U.1G.VMzgxYecsCmYN1uvG4DqdK6h4QVmn0.\",\"expiry\":1478065707,\"last_token\":\"$2a$10$iyjTYv6g8W3kUWNOqAutMOvTW44C2tOa5T.fZcNks98agu53KkjlW\",\"updated_at\":\"2016-10-18T23:48:27.546-06:00\"},\"pCLxOfdA8V1_M08tzkRVTg\":{\"token\":\"$2a$10$7Tr.xgA8knqDgsPBAa38zOBWJrUnClUxqZih9vFe0eRcCb1gMVWrm\",\"expiry\":1478066724,\"last_token\":\"$2a$10$HpM/xmsgGtwa95cD8ZsK0uiOFYn/GFM9OPZjiL7gRVcGd4deU5mgC\",\"updated_at\":\"2016-10-19T00:05:26.228-06:00\"},\"kDs83zU7RP-Q2dDHMQf9mg\":{\"token\":\"$2a$10$9SmBdjmq4w9gbgjCSkg7ve6KjRg/m0w.G8OaIcK9y.5pSmd7bLBbC\",\"expiry\":1478066727,\"last_token\":\"$2a$10$/LzCymbYrbx2iqItMFjmKe/uYxLvPj8HrzhdKjq8nUgpOuUqY/XMq\",\"updated_at\":\"2016-10-19T00:05:27.786-06:00\"}}','2016-10-11 02:41:05','2016-10-19 06:05:27',2,NULL,1,3),(23,'email','diegobari06@hotmail.com','$2a$10$T4xyeCrnBJiLIEztLviXOuYfFFfkqirSIUXnh.kvq6/4uzo4sonvq',NULL,NULL,NULL,12,'2016-10-13 21:25:29','2016-10-13 20:18:42','::1','::1',NULL,'2016-10-13 21:59:52',NULL,NULL,NULL,NULL,NULL,'diegobari06@hotmail.com','{\"_w2pRPyFI9xr0jj-X2zxzQ\":{\"token\":\"$2a$10$pqOXKf0XLS4sR7gWOkQaBujecMchfb1wnLhqX/sj1e16htoFHQxWy\",\"expiry\":1477526106,\"last_token\":\"$2a$10$YHPl197QJ3abh/35EhCYZu8srH4kq3cpMzsy8AR5qy3O3.AIL9lpG\",\"updated_at\":\"2016-10-12T17:55:06.212-06:00\"},\"0oVjqwz_8OiiChdwPvu7SQ\":{\"token\":\"$2a$10$P8P121biZip/pdCQwa93ze9oie0S67I94tGN0m9Uo2tKh0A.UoYh6\",\"expiry\":1477589377,\"last_token\":\"$2a$10$kW8g8xz/0kGQc2xHNeANfeMsZdH3fCDkp5rxug6AANjTFx6aUvWve\",\"updated_at\":\"2016-10-13T11:29:37.462-06:00\"},\"q-fP8PVvq8HeMH5HoIDPEw\":{\"token\":\"$2a$10$CuMYPb3u08yMvZRQ4BnFHOgGXFR3S.2zawUCXmVSfeP2AR4qo/U0m\",\"expiry\":1477589514,\"last_token\":\"$2a$10$EhtymhoJwbbgbMK8ASg29.rRn.qLa9dsoWnPonLQo.9Wll6z1XQ9.\",\"updated_at\":\"2016-10-13T11:31:54.732-06:00\"},\"OMoncvypU6O-0d2fC7w7rQ\":{\"token\":\"$2a$10$lHuE7EqnWaxzGHtWkrbjZOl56WigsJSJmbpoJhcnkV5PoDryaZznK\",\"expiry\":1477591427,\"last_token\":\"$2a$10$udEhLU21Lif62fkvYKMguuDkhWAEvo.FJtGvX.2/V5T.U5mkhO9eq\",\"updated_at\":\"2016-10-13T12:03:47.743-06:00\"},\"aCk4m_13X5d7btYf2lWG3Q\":{\"token\":\"$2a$10$9eS.fJlxor5xw.oom3Bl5OhgxsFwu3Y/Y0MEQ95vjUI.VflNZ2sdS\",\"expiry\":1477599522,\"last_token\":\"$2a$10$gbGe1R2/5POt5M60ANahauOMWhpFETbRUEDrHm1WGKczUYJ14WNAO\",\"updated_at\":\"2016-10-13T14:18:42.251-06:00\"},\"jqdH2pcRX7mCJQy6bmBfYg\":{\"token\":\"$2a$10$nE.HsRcV.DVE1RdfW5rAR.6RSsajf5vAbGVEcO/56L0dXJWWl3RO2\",\"expiry\":1477603524,\"last_token\":\"$2a$10$SFh15YGS83AQ41KVTFaJRuIm2PM4skC80xZMPIJ3gmcd5KW//5Mc.\",\"updated_at\":\"2016-10-13T15:25:24.034-06:00\"}}','2016-10-11 02:46:53','2016-10-13 21:59:52',3,NULL,1,3);
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
INSERT INTO `vehicules` VALUES (1,'452',NULL,'12445',7,3),(2,'452j',NULL,'12445',7,3),(3,'hahaha',NULL,NULL,NULL,NULL),(4,'hahasha',NULL,NULL,NULL,NULL),(5,NULL,NULL,NULL,NULL,NULL),(6,'hahasasha',NULL,NULL,NULL,NULL),(7,'hahasashaw',NULL,NULL,NULL,NULL),(12,'2828818','English','rgb(120, 99, 255)',7,3),(13,'BCL-448','Arabic','rgb(179, 186, 162)',7,3),(14,'5','English','rgb(235, 54, 255)',7,3);
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

-- Dump completed on 2016-10-19  0:06:11
