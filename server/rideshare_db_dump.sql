-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: RideShareDB
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.16.04.1

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
-- Current Database: `RideShareDB`
--

/*!40000 DROP DATABASE IF EXISTS `RideShareDB`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `RideShareDB` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `RideShareDB`;

--
-- Table structure for table `drivers`
--

DROP TABLE IF EXISTS `drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drivers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `rating` double NOT NULL DEFAULT '0',
  `car` varchar(256) NOT NULL,
  `license` varchar(16) DEFAULT NULL,
  `car_image` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drivers`
--

LOCK TABLES `drivers` WRITE;
/*!40000 ALTER TABLE `drivers` DISABLE KEYS */;
INSERT INTO `drivers` VALUES (1,'RideShareDriver1','driver1@rideshare.com','password','127863871',3.6,'Jeep Cherokee','IL12930ND','https://mystrongad.com/seo-specials/hvm-2019grandcherokee-special.png'),(2,'Tim','tim@rideshare.com','password','1235424',4.6,'Chevrolet Traverse','NV3423J','https://s.aolcdn.com/dims-global/dims3/GLOB/legacy_thumbnail/788x525/quality/85/https://s.aolcdn.com/commerce/autodata/images/CAC60CHS291A021001.jpg'),(3,'Abdul','abdul@rideshare.com','password','819273463',4.3,'Chevrolet Camaro','IL3423J','https://upload.wikimedia.org/wikipedia/commons/5/5e/2019_Chevrolet_Camaro_2SS_6.2L_front_3.16.19.jpg'),(4,'Steve','steve@rideshare.com','password','989327423',4.8,'Toyota Camry','SJ3423J','https://file.kelleybluebookimages.com/kbb/base/evox/ExtSpP/12105/2020-Toyota-Camry-360SpinFrame_12105_032_2400x1800.png'),(5,'Mike','mike@rideshare.com','password','755765123',4,'Chevrolet Impala','NY3423J','https://st.motortrend.com/uploads/sites/10/2015/11/2012-chevrolet-impala-lt-sedan-angular-front.png'),(6,'Theiry Henry','Theiry.Henry@gmail.com','password','(312)-901-1723',4.8,'Chevrolet Volt','12897kjdasi','https://content.autotrader.com/content/dam/autotrader/articles/OversteerImages/2018/May/CheapestElectrics/volt.jpg'),(7,'Daniel James','d.james@gmail.com','password','(312)-121-2454',4.6,'Lexus RX RX 350 F Sport','MKSJ0942340NJS','https://9e59a6be9d5449310956-e1f1a2f001d94011e35e09c0b10e271b.ssl.cf1.rackcdn.com/2T2BZMCA5KC179893/1a2cbebacb4f74ec8b5279e12360961f.jpg');
/*!40000 ALTER TABLE `drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rides`
--

DROP TABLE IF EXISTS `rides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rides` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer` varchar(32) NOT NULL,
  `driver` varchar(32) NOT NULL,
  `ride_type` varchar(32) NOT NULL,
  `source` varchar(256) NOT NULL,
  `destination` varchar(256) NOT NULL,
  `status` varchar(32) NOT NULL,
  `booked_on_date` date DEFAULT NULL,
  `booked_on_time` time DEFAULT NULL,
  `duration` double NOT NULL DEFAULT '0',
  `cancelled_on_date` date DEFAULT NULL,
  `cancelled_on_time` time DEFAULT NULL,
  `cancel_reason` varchar(64) DEFAULT NULL,
  `distance` double DEFAULT NULL,
  `price` double DEFAULT NULL,
  `dropzipcode` int(11) NOT NULL DEFAULT '60616',
  `pickupzipcode` int(11) NOT NULL DEFAULT '60616',
  `userRating` int(11) DEFAULT NULL,
  `driverRating` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `customer` (`customer`),
  KEY `driver` (`driver`),
  CONSTRAINT `rides_ibfk_1` FOREIGN KEY (`customer`) REFERENCES `users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rides_ibfk_2` FOREIGN KEY (`driver`) REFERENCES `drivers` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides`
--

LOCK TABLES `rides` WRITE;
/*!40000 ALTER TABLE `rides` DISABLE KEYS */;
INSERT INTO `rides` VALUES (1,'RideShareCustomer','Steve','single','2951 S King Dr, Chicago, IL 60616, USA','322 E Illinois St, Chicago, IL 60611, USA','Cancelled','2019-11-17','18:15:54',0,'2019-11-17','18:24:54','Not felt like travelling. ',5680.215529811483,7.63,4304,60616,4,4),(2,'RideShareCustomer','Steve','single','321 E Erie St, Chicago, IL 60611, USA','2988 S Archer Ave, Chicago, IL 60608, USA','Cancelled','2019-11-17','18:18:57',0,'2019-11-24','01:18:36','uihjkn',6859.513336720318,4.12,5550,3167,3,2),(3,'RideShareCustomer','Steve','shared','2951 S King Dr, Chicago, IL 60616, USA','2801 S King Dr, Chicago, IL 60616, USA','Cancelled','2019-11-17','18:21:39',0,'2019-11-19','11:22:28','Changed my mind',367.16846672597234,6.37,60616,60616,4,NULL),(4,'RideShareCustomer','RideShareDriver1','single','121 N LaSalle St, Chicago, IL 60602, USA','4325 N Ravenswood Ave, Chicago, IL 60613, USA','Booked','2019-11-19','10:05:29',0,NULL,NULL,NULL,9205.771270321318,7.11,1111,60602,4,NULL),(5,'RideShareCustomer','Abdul','single','3947 S King Dr, Chicago, IL 60653, USA','219 N Green St, Chicago, IL 60607, USA','Cancelled','2019-11-19','10:06:55',0,'2019-11-19','10:07:15','Some Lame Reason',7572.406715618852,3.11,60607,2316,3,NULL),(6,'RideShareCustomer','Tim','single','121 N LaSalle St, Chicago, IL 60602, USA','899 S Plymouth Ct, Chicago, IL 60605, USA','Cancelled','2019-11-19','11:13:29',0,'2019-11-24','00:35:55','Not feeling like Riding ',1487.5895680148897,9.89,60605,60602,4,NULL),(7,'RideShareCustomer','Abdul','shared','9880 S Dorchester Ave, Chicago, IL 60628, USA','2988 S Archer Ave, Chicago, IL 60608, USA','Booked','2019-11-19','11:33:33',0,NULL,NULL,NULL,15018.007089170178,12.49,5550,60628,5,NULL),(8,'RideShareCustomer','Abdul','shared','7827 S South Shore Dr, Chicago, IL 60649, USA','2138 S Indiana Ave, Chicago, IL 60616, USA','Booked','2019-11-19','11:37:39',0,NULL,NULL,NULL,12542.426166725629,14.23,60616,60649,4,NULL),(9,'RideShareCustomer','Tim','single','1901 W Carroll Ave, Chicago, IL 60612, USA','901 W Roosevelt Rd, Chicago, IL 60608, USA','Booked','2019-11-19','11:41:06',0,NULL,NULL,NULL,3182.5139344510244,7.92,60608,60612,3,NULL),(10,'RideShareCustomer','Steve','shared','6540 S Cicero Ave, Bedford Park, IL 60638, USA','678 N Orleans St, Chicago, IL 60654, USA','Cancelled','2019-11-19','12:14:09',0,'2019-11-19','12:14:28','Changed my mind',16029.068287986136,10.22,3916,60638,4,NULL),(11,'RideShareCustomer','Tim','single','2951 S King Dr, Chicago, IL 60616, USA','2901 S King Dr, Chicago, IL 60616, USA','Booked','2019-11-19','19:40:46',0,NULL,NULL,NULL,0.14167258800000002,18.11,60616,60616,5,NULL),(12,'RideShareCustomer','Steve','single','2301 S Martin Luther King Dr, Chicago, IL 60616, USA','444 W Lake St, Chicago, IL 60606, USA','Cancelled','2019-11-19','19:41:58',0,'2019-11-23','17:08:35','128937',4.862228075,22.28,60606,60616,4,3),(13,'RideShareCustomer','Tim','shared','2233 S Martin Luther King Dr, Chicago, IL 60616, USA','3782 W 76th Pl, Chicago, IL 60652, USA','Cancelled','2019-11-19','19:54:26',0,'2019-11-19','19:54:56','Some Lame Reason',11.138075175,27.28,1340,60616,3,NULL),(14,'RideShareCustomer','Tim','shared','2787 W Fulton St, Chicago, IL 60612, USA','9283 Falling Waters Dr E, Burr Ridge, IL 60527, USA','Cancelled','2019-11-23','11:05:54',2069,'2019-11-23','17:08:02','Felt like not travelling!',24.72,11.56,717,2068,4,NULL),(15,'RideShareCustomer','Steve','shared','2910 S Dearborn St, Chicago, IL 60616, USA','2801 S Western Ave, Chicago, IL 60608, USA','Cancelled','2019-11-23','17:49:55',727,'2019-11-24','01:17:53','Felt like not travelling!',4.73,6.4,5220,60616,3,2),(16,'RideShareCustomer','Steve','shared','2910 S Dearborn St, Chicago, IL 60616, USA','3001 S King Dr, Chicago, IL 60616, USA','Cancelled','2019-11-23','18:15:28',536,'2019-11-24','17:37:43','Busy with other Work',1.39,4.9,60616,60616,4,NULL),(17,'RideShareCustomer','Mike','single','MC 913, 912 S Wood St, Chicago, IL 60612, USA','2121 S Prairie Ave, Chicago, IL 60616, USA','Booked','2019-11-23','18:45:28',894,NULL,NULL,NULL,4.88,13.81,60616,4300,2,2),(18,'RideShareCustomer','Mike','shared','2910 S Dearborn St, Chicago, IL 60616, USA','2951 S King Dr, Chicago, IL 60616, USA','Booked','2019-11-24','00:49:25',501,NULL,NULL,NULL,1.4,6.78,60616,60616,NULL,4),(19,'Ravi_raj','RideShareDriver1','single','2971 S Federal St, Chicago, IL 60616, USA','322 E Illinois St, Chicago, IL 60611, USA','Booked','2019-11-24','15:25:45',835,NULL,NULL,NULL,4.69,13.68,4304,60616,4,NULL),(20,'Ravi_raj','Steve','shared','839 S Wells St, Chicago, IL 60607, USA','110 N Carpenter St, Chicago, IL 60607, USA','Booked','2019-11-24','15:26:23',505,NULL,NULL,NULL,1.93,5.25,60607,60607,2,4),(21,'Ravi_raj','Tim','shared','2951 S King Dr, Chicago, IL 60616, USA','2910 S Dearborn St, Chicago, IL 60616, USA','Cancelled','2019-11-24','15:28:00',525,'2019-11-24','15:28:30','Plans got changed at the end. ',1.36,4.9,60616,60616,NULL,NULL),(22,'RideShareCustomer','Theiry Henry','shared','2951 S King Dr, Chicago, IL 60616, USA','2801 S Western Ave, Chicago, IL 60608, USA','Cancelled','2019-11-24','16:05:44',761,'2019-11-24','20:29:22','Not feeling like travelling',5.07,7.95,5220,60616,1,NULL),(23,'RideShareCustomer','RideShareDriver1','shared','2910 S Dearborn St, Chicago, IL 60616, USA','3001 S King Dr, Chicago, IL 60616, USA','Cancelled','2019-11-24','17:35:55',536,'2019-11-24','17:37:43','Busy with other Work',1.39,4.9,60616,60616,4,NULL),(24,'RideShareCustomer','Abdul','shared','2910 S Dearborn St, Chicago, IL 60616, USA','3001 S King Dr, Chicago, IL 60616, USA','Booked','2019-11-24','20:27:29',536,NULL,NULL,NULL,1.39,5.86,60616,60616,4,NULL);
/*!40000 ALTER TABLE `rides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(256) NOT NULL,
  `credit_card` varchar(16) NOT NULL,
  `phone` varchar(16) DEFAULT NULL,
  `rating` double NOT NULL DEFAULT '0',
  `superuser` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'RideShareCustomer','customer@rideshare.com','password','1231','127863871',0,0),(2,'Ravi_Raj','ravi.raj@gmail.com','password','12373981233','123908128937',0,0),(3,'Dion Wilson','d.wilson@gmail.com','password','123412353462','3892723487',0,0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-24 21:28:29
