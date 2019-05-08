CREATE DATABASE  IF NOT EXISTS `plajara` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `plajara`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: plajara
-- ------------------------------------------------------
-- Server version	8.0.11

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
-- Table structure for table `beach_comments`
--

DROP TABLE IF EXISTS `beach_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `beach_comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `beach_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(600) NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beach_comments`
--

LOCK TABLES `beach_comments` WRITE;
/*!40000 ALTER TABLE `beach_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `beach_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beach_images`
--

DROP TABLE IF EXISTS `beach_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `beach_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(150) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `beach_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beach_images`
--

LOCK TABLES `beach_images` WRITE;
/*!40000 ALTER TABLE `beach_images` DISABLE KEYS */;
INSERT INTO `beach_images` VALUES (1,'test image url',1,1),(2,'test image url',0,1),(3,'test image url',1,1);
/*!40000 ALTER TABLE `beach_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `beaches`
--

DROP TABLE IF EXISTS `beaches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `beaches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(1000) NOT NULL,
  `title` varchar(120) NOT NULL,
  `created_at` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `beaches`
--

LOCK TABLES `beaches` WRITE;
/*!40000 ALTER TABLE `beaches` DISABLE KEYS */;
INSERT INTO `beaches` VALUES (1,'Burası istanbulun en iyi plajı','Suma Besch Club','2018-09-27 14:16:11'),(8,'Ankara plaj alanı','Ekşın plaj','2018-09-27 14:16:11'),(9,'Yüzme havuzu','kapalı yüzme havuzu','2018-09-27 14:16:11'),(10,'izmirdeki en kral plaj','İzmir plaj','2018-09-27 14:16:11'),(11,'deneme plan','Plajj 1','2018-09-27 14:16:11'),(12,'deneme plajı 2345','Plajj 2','2018-09-27 14:16:11'),(13,'deneme plajı 2345','Plajj 3','2018-09-27 14:16:11'),(14,'deneme plajı 2345','Plajj 4','2018-09-27 14:16:11'),(15,'deneme plajı 2345','Plajj 5','2018-09-27 14:16:11'),(16,'deneme plajı 2345','Plajj 6','2018-09-27 14:16:11'),(17,'deneme plajı 2345','Plajj 7','2018-09-27 14:16:11'),(18,'deneme plajı 2345','Plajj 8','2018-09-27 14:16:11'),(19,'deneme plajı 2345','Plajj 9','2018-09-27 14:16:11'),(20,'deneme plajı 2345','Plajj 10','2018-09-27 14:16:11'),(21,'deneme plajı 2345','Plajj 11','2018-09-27 14:16:11'),(22,'deneme plajı 2345','Plajj 12','2018-09-27 14:16:11'),(23,'deneme plajı 2345','Plajj 13','2018-09-27 14:16:11'),(24,'deneme plajı 2345','Plajj 14','2018-09-27 14:16:11'),(25,'deneme plajı 2345','Plajj 15','2018-09-27 14:16:11'),(26,'deneme plajı 2345','Plajj 16','2018-09-27 14:16:11'),(27,'deneme plajı 2345','Plajj 17','2018-09-27 14:16:11'),(28,'deneme plajı 2345','Plajj 18','2018-09-27 14:16:11'),(29,'deneme plajı 2345','Plajj 19','2018-09-27 14:16:11');
/*!40000 ALTER TABLE `beaches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `token` varchar(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,1,'b2be1dea61464bbf2f427bc6c02ee8','2018-09-27 14:16:11'),(2,2,'1b1646693bfcfc646326adf7fbac70','2018-09-27 14:17:24'),(4,1,'25f4d5fda711f087a66ad2efaf66fd','2018-09-27 14:44:26'),(6,1,'c0713c2737b2cfcaab9ffd9546d5e6','2018-09-27 14:50:21'),(7,1,'cd7ec6dbc62352faa1985c1dfcca89','2018-09-27 14:52:33'),(8,1,'505ab92b897c7fdd6183a4611573a6','2018-09-27 14:53:30'),(9,1,'f3795a4f1fd838704fdbbe503216c2','2018-09-27 14:59:41'),(10,1,'b99a9a82e19b00f6a2adfe70a6e117','2018-09-27 15:02:17'),(11,1,'b7877ed4a036d13036f6f03b728700','2018-09-27 15:03:05'),(12,1,'046227c35cc9b34cc5b5cb4dea10db','2018-09-27 15:03:49'),(13,1,'6adb6c9d20c43dde46a492c31fcaef','2018-09-27 15:05:54'),(14,1,'04fff71b430755fe8487a5d22cd69e','2018-09-27 15:07:46'),(16,1,'af874fdd83c6be0b2b2800e530d6a6','2018-09-27 15:16:05'),(17,1,'5fc0f70a0d0aa845a70dae41630d28','2018-09-27 15:17:54'),(19,1,'d1463f9f585c639ae5c841bc24f07a','2018-09-27 15:25:02'),(20,1,'771be3f9e5f11464627f8c711b7476','2018-09-27 15:25:56'),(21,1,'fed0fec2581476175f67b461ec78f3','2018-09-27 15:26:12'),(22,1,'c391826ba10ab1d8b2ed2ff53b68fa','2018-09-27 15:29:07'),(23,1,'ecb420289571aabb595705acb8f168','2018-09-27 15:29:15'),(24,1,'97e4d456d18c22556fc4b215d02a50','2018-09-27 15:29:42'),(26,1,'e4f527b030bb156889e3bc139ad6e9','2018-09-27 15:40:12'),(27,1,'192de545bd306aeff64f25a4c8c262','2018-09-27 15:42:32'),(28,1,'ea50075d2e908e684d00fb67cb47c5','2018-09-27 15:43:02'),(29,1,'03ac6d3344dbcb992162cf95f085e3','2018-09-27 15:43:46'),(30,1,'a3ed93cc6cc5a2908f7fc3dc566ec2','2018-09-27 15:44:44'),(32,1,'c2315082e875886a9b449a21c1eed0','2018-09-27 15:45:37'),(33,1,'8ad6629b816199a8219e51cfdc1ff0','2018-09-27 15:46:20'),(34,1,'20446ee8da4196fbe62c71580978b5','2018-09-27 15:47:42'),(35,1,'ff350b5494c8db6181da404f2f71bb','2018-09-27 15:48:06'),(37,1,'eac4bca9dc7939a6aa5362c6b8a0f4','2018-09-27 15:48:29'),(38,1,'b74b6521f84028406dfdd9b0dcb940','2018-09-27 15:49:07'),(39,1,'450e46ee66ea5c001c3a0c3bcd7851','2018-09-27 15:50:37'),(40,1,'cd255ebb8bb7a1b21e44f4171e4beb','2018-09-27 15:51:18'),(41,1,'0e15b75c1667027d22c927a6699b9c','2018-09-27 15:52:48'),(42,1,'9ba01d9abab363a4aec84854d91dab','2018-09-27 16:03:53'),(43,1,'6e06452aeaf31ecb5c13b0af61d98a','2018-09-27 16:04:28'),(44,1,'260ea2febd2334edb042a5b369c9c3','2018-09-27 16:05:05'),(45,1,'dd954036cdb7cdd1cda17750dec68e','2018-09-27 16:05:44'),(46,1,'5d4b16ad35f57b035decfd22de6faf','2018-09-27 16:08:56'),(47,1,'fcdb5f73600461db5607fe4c89d534','2018-09-27 16:09:59'),(48,1,'7d9ae7100f769c6cd0b2fb927f66d1','2018-09-27 16:10:45'),(50,1,'beb5a3aa06f78bdc3676e44b0579c4','2018-09-27 16:11:19'),(51,2,'090f245f0ddd73d8b12094167c90d8','2018-09-27 16:13:41'),(52,1,'ee4a5e23efa1fc177694df8209a0ee','2018-09-27 16:14:10'),(55,3,'8dcd0aba9d3c5b3c504855d2485fa5','2018-09-27 16:21:36'),(57,2,'a9d020a589137e95ba10c2df5245c2','2018-09-27 16:22:01'),(59,1,'94b4235fd8f605681804fb41b1356b','2018-09-28 11:42:10'),(60,1,'6db450ea1f6cd87c0ddd6e2cb77c93','2018-09-28 11:48:03'),(64,1,'1986c4bc48642cebe0c1f1b02bc024','2018-09-28 11:52:19'),(65,1,'c60c9cfe512a49ae53fab56059e53b','2018-09-28 11:52:54'),(66,1,'325a98064f6045e657a63dd2b14e09','2018-09-28 11:53:10'),(69,1,'6e271ee29b41d470414c5c2e6581aa','2018-09-28 12:12:21'),(70,1,'81f638bba8943e3e37f8ecfd990555','2018-09-28 12:13:29'),(71,1,'70ac7a47fae4f2ed0ad85ab4f707e7','2018-09-28 12:14:17'),(73,1,'7c79fd6b5374a95585dc6d28d7adeb','2018-09-28 12:20:04'),(74,1,'f97695a32ed253fd96c0a57be3ee5d','2018-09-28 12:20:33'),(79,3,'10c4361caf756fbeb514106b50af2b','2018-09-28 12:33:58'),(80,3,'47f85a77b331171a76e7c5efc28899','2018-09-28 12:34:21'),(91,1,'3c2784fedf662d5c5829232aeef678','2018-09-28 13:56:57'),(92,1,'55c0f71a4f4eff7e728fc184eea500','2018-09-28 14:27:16'),(93,1,'64fc852bdbdf65d363058bbb892783','2018-09-28 14:55:00'),(94,1,'46fc32b97c6ac0a3661c97a0d23267','2018-09-28 14:55:34'),(95,1,'cb4f1fe79fc6de23275fe81a5bd80c','2018-10-01 12:59:18'),(96,2,'d133d4e846e111f36c7410a090a1ef','2018-10-01 14:50:08'),(97,1,'f97a2f43829eef4c8f51b2ede7143e','2018-10-01 15:12:47'),(98,2,'104cb9b959c0cb36a666d930ae273f','2018-10-01 15:13:54'),(99,2,'c8a3b3d6fe66b200f2fac83f439cb5','2018-10-01 15:14:08'),(100,1,'458a5102c5d1926a466544e40e1b82','2018-10-01 15:14:46'),(101,1,'c661832e49d62bcef00ae4c1b8d255','2018-10-01 15:15:30'),(102,1,'27a9062fb2b725af84936512836047','2018-10-01 15:18:58'),(103,1,'415b2d544842ff1a219483bee73ce4','2018-10-01 15:20:05'),(104,1,'e3b534ce8b4ee8900639833fd57b41','2018-10-01 15:21:21'),(105,1,'515c35890e3a77744cf99b1c571672','2018-10-01 15:27:48'),(106,2,'1e3b5d1db741270611739bd9ead35d','2018-10-01 15:29:23'),(107,1,'fbab0e02d2b9545c979e657411e489','2018-10-01 15:31:30'),(108,1,'8edc2b6a2a4eb6ad491dcca09f8348','2018-10-01 15:34:03'),(109,1,'17e2bc34659894a5c16045159a452c','2018-10-01 15:34:53'),(110,1,'a652160edf04235ed2f35c6a343720','2018-10-01 15:38:43'),(111,1,'9e4350b69d57b8d14a63fce8b8569b','2018-10-01 15:39:38'),(112,1,'35a5598bc6418adb4aa3fc2cfab8b4','2018-10-01 15:40:06'),(113,1,'e92c39f3fd0e253c0a0f428eb96749','2018-10-01 15:41:04'),(117,1,'e04f2b3c529c5f5c52800f3cedae8a','2018-10-02 11:46:23'),(118,1,'d878364b5d7c3bc6ebca8d1df36d2c','2018-10-02 12:10:46'),(119,1,'2e3cba1be7e89b2e34016dda0c9eb5','2018-10-02 12:21:03'),(120,2,'77848245af6eb600395531fb7c034b','2018-10-02 12:30:13'),(121,2,'742a7421b68dc7a6087173ab79fb0a','2018-10-02 12:30:41'),(122,2,'781b8344ea397e191034ad0e81fd51','2018-10-02 12:31:11'),(123,2,'644e16fadb148eca7b9c404cbe2e4e','2018-10-02 12:32:01'),(124,1,'ff06e33f80589c3816a683458b6957','2018-10-02 12:32:48'),(125,1,'e44613b5d8739049ad487a07b7b118','2018-10-02 12:32:59'),(126,1,'18cd2049a06aa741bf0318fd44f4f5','2018-10-02 12:34:10'),(128,2,'368c998d24cd1828ae75f5306bf9b1','2018-10-02 12:52:19'),(129,1,'0576f55997c953b8514aa218e1bc81','2018-10-02 12:52:34'),(130,1,'99c2d5219f48ac5d2269affeb08b8e','2018-10-02 13:54:20'),(131,1,'6b1c7d338ab17cbefaa23ef9fa8707','2018-10-02 14:01:08'),(132,1,'4a9a8db5748777729a480fc956af29','2018-10-02 14:07:15'),(133,1,'9f3ae0c782caa81bef21843bd71b83','2018-10-02 14:17:19'),(134,1,'3d302ce975512e1b48a5b5a53b6977','2018-10-02 15:17:26'),(135,1,'8e0ac271586c9cd3b0766b861c99be','2018-10-02 15:26:53'),(136,1,'269f65b27d6d8b44e5a4c862e63110','2018-10-02 15:27:03'),(137,1,'8cb6802383f79fa1073add910e3146','2018-10-02 15:27:17'),(138,1,'c1b092690490474c747153aed435af','2018-10-02 15:28:16'),(139,1,'5eea318367d2e2cf8547e441e25aa4','2018-10-02 15:40:24'),(140,1,'0f2c6d451afccd4219e2d5b96dfb44','2018-10-02 15:40:54'),(141,1,'332ae10d92b1eaf30f7e0f7e098cc2','2018-10-02 15:41:49'),(142,1,'a48b52341455ec6e23c87ccf5e3941','2018-10-02 15:42:11'),(143,1,'6ee016047163f982634b6748bad911','2018-10-02 15:42:36'),(144,1,'935bc88d4d2248f2bd820a533cc062','2018-10-02 15:46:13'),(145,1,'7a0af56d0c522a210563582f68d427','2018-10-02 16:04:29'),(146,1,'77148adbb251baeb7d914bc8a7efc9','2018-10-02 16:14:38'),(147,1,'0718b38c5030af8c6aa966c4c9dd34','2018-10-02 16:15:13'),(148,1,'25c2eb8e675e5f4845c57839e872d2','2018-10-02 16:26:17'),(149,1,'72a5f8753fffc31b6d148223ed62ee','2018-10-02 16:28:14'),(150,1,'8ca5f31427cdddaa5f7658401034e2','2018-10-02 16:29:06'),(151,1,'550fd8dda03630d8ac1f75aa79e6d5','2018-10-02 16:29:26'),(152,1,'c936eff45bec5abef10acee71d4440','2018-10-02 16:30:21'),(153,1,'f985379e05d046a6d5ca5b53d69888','2018-10-02 16:41:20'),(154,1,'7f4499814bc7d562986a89fa6c5376','2018-10-02 16:42:19'),(155,1,'e54daed421a76e48355106f671a81d','2018-10-02 16:43:08'),(156,1,'4cefebd2ca0b45b26bc98921fd5116','2018-10-02 16:45:49'),(157,1,'6108eb2eb80422924eed46ce84ef55','2018-10-02 16:48:28'),(158,1,'a688cdbd4f15de26ba659abaa82b15','2018-10-02 16:58:03'),(160,1,'59663b673c9fe1afc4b548c1d49d57','2018-10-02 17:07:36'),(163,1,'6886864825225391cceb30e8e9dba2','2018-10-02 20:44:27'),(166,1,'d42f73d238e987757351419f5e5de6','2018-10-03 10:59:46'),(167,1,'7e205559b07dad1736dd7ca0314a18','2018-10-03 11:09:35'),(168,1,'afed9d0a2f104b516eabf8570778bd','2018-10-03 11:46:09'),(169,1,'3602ef93a1f787f79424fef83f4ae7','2018-10-03 11:50:38'),(170,1,'7b7665594c77bbd4378ac63fbbb990','2018-10-03 11:52:31'),(171,1,'d5964565bf06f024ade716959d22da','2018-10-03 11:52:53'),(172,1,'81e50912009c3126d8b0a4c2cd936f','2018-10-03 11:53:09'),(173,1,'0afec7cce6dfa523414d9a703921d7','2018-10-03 11:54:02'),(174,1,'345e874a1bbe54e8951ccfbdde423e','2018-10-03 11:54:57'),(175,1,'0a0f7a45144b43cc4cf9b782c980c7','2018-10-03 11:56:14'),(176,1,'0c9787a4917a5470b0d1ddf8f443ae','2018-10-03 12:01:39'),(177,1,'4e68a61a962219136b50430c060de0','2018-10-03 12:02:38'),(178,1,'ea5e89d85f0a1750073b96e8c9b3b3','2018-10-03 12:03:31'),(179,1,'27fcbf3cc8c98ca868937ff27a2073','2018-10-03 12:06:19'),(180,1,'25b8412926f2f75d64febf40ceb86d','2018-10-03 12:07:34'),(181,1,'18bb55ff6744a8c489c981529e5e81','2018-10-03 12:08:06'),(182,1,'de3989471b6027d350291102f7c877','2018-10-03 12:09:10'),(185,1,'78d74fee47570e6124a41df2421a38','2018-10-03 12:10:49'),(186,1,'2e11e5b1c22795df0ad9ef47b73b70','2018-10-03 12:11:50'),(187,1,'ad5eccdab1a975cfca32660768f1bb','2018-10-03 12:13:54'),(189,1,'8ae8b37c44eae6996a126eb5ef3ab1','2018-10-03 12:14:33'),(196,1,'3e734ed983a48dd887a9c81df4c022','2018-10-03 12:19:16'),(198,1,'d77ee6ddee68a15afd42797243ae3f','2018-10-03 12:20:00'),(199,1,'f8126bec4ced7561a7c672c3100990','2018-10-03 12:20:50'),(200,1,'92a5b21ef9dd38899bb1b7263f9b47','2018-10-03 12:26:59'),(202,1,'66de23695a552a5257032d1bad0b25','2018-10-03 12:28:35'),(203,1,'95d866437873bf7946505eeff1d0ba','2018-10-03 12:29:26'),(205,1,'0103d210c518adbdcf2a68fbf18cb7','2019-05-08 11:32:31'),(206,1,'579346e201d0f5a7578c6c77a8a669','2019-05-08 11:35:43');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) NOT NULL,
  `uemail` varchar(70) NOT NULL,
  `upass` varchar(70) NOT NULL,
  `created_at` datetime NOT NULL,
  `avatar_url` varchar(100) NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `profession` varchar(70) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'guven','trokle@gmail.com','$2b$10$KKT2JJ6QrZ113X70emQMUukMJVNOV8AldG4ebZs2h7Qimv2KxFWGe','2018-09-27 14:16:11','default.png','Bio buraya gelecek','Software Developer',1),(2,'guven2','guven.aydin@hotmail.com','$2b$10$llFxKmy9b80FLjKMo3IIJen2.lJB/jpANrLcjyNsPeTH1Yr02EKhy','2018-09-27 14:17:24','default.png',NULL,NULL,1),(3,'ringo','trokle1@gmail.com','$2b$10$4TuxlDH4fvqaE3iKZplDrenf6VNHuOi35TKTjWLjjCTb0v6Wkj2Hi','2018-09-27 16:21:36','default.png',NULL,NULL,1),(8,'d112d','troklesad@gmail.com','$2b$10$KeGzkzICKmX4FC16sVSe3uLKEyNShh8d1Izn2UesArVA80cMDoi6m','2018-09-28 12:52:30','default.png',NULL,NULL,1),(11,'d12dd3f24g','trokle132312@gmail.com','$2b$10$LhHNMQGDXKzgkHZyileBKeql7qpFRE1jwETMidGEhNHpplVrpnEDW','2018-09-28 13:04:21','default.png',NULL,NULL,1),(12,'ajdar','trokle1234@gmail.com','$2b$10$L3P4K3Pu9oqtal4HelQdvetYqzbbEvoC7lylvP0pXpZal8hpOYd8u','2018-09-28 13:18:10','default.png',NULL,NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_socialmedia`
--

DROP TABLE IF EXISTS `user_socialmedia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_socialmedia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `social_media_type` int(11) NOT NULL,
  `nick` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_socialmedia`
--

LOCK TABLES `user_socialmedia` WRITE;
/*!40000 ALTER TABLE `user_socialmedia` DISABLE KEYS */;
INSERT INTO `user_socialmedia` VALUES (55,'1',3,'guvenaydin'),(56,'1',2,'guvenaydin'),(57,'1',4,'guvenaydin'),(58,'1',1,'guvenaydinn');
/*!40000 ALTER TABLE `user_socialmedia` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-08 13:18:53
