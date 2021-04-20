-- MySQL dump 10.13  Distrib 8.0.17, for osx10.14 (x86_64)
--
-- Host: 127.0.0.1    Database: longhaul-covid-laravel
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2021_04_14_214515_create_initial_tables',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `race` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `infected_date` timestamp NOT NULL,
  `fully_recovered` tinyint(1) NOT NULL,
  `recovery_percentage` varchar(4) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `weight` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `story` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `treatments` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `symptoms` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'2021-04-19 17:35:22','2021-04-19 17:35:22','Greg\'s Story','Greg T','127.0.0.1','A_3539','WHITE','MALE','US','2020-11-23 10:00:00',0,'P80','OVERWEIGHT','<p>35/m. I\'ve been a lurker here since early December. I contracted in late november (estimate). I didn\'t have any of the most obvious symptoms. No cough, loss of smell or taste or heart issues. I didn\'t even know I had it until I was doctor diagnosed (assumed) until dec. 7th. It started as what I thought was a bad hangover but by the second day I knew something was up. That entire week I felt off and I couldn\'t even describe it. It wasn\'t until I came here that I learned about brain fog. It was something I\'ve never experienced. I had two doctors visits and the second one was when I was \"diagnosed\".</p><p>My initial, primary symptoms were severe brain-fog and GI issues. I\'ve had GI issues before so my first visit the doctor thought it might be IBS. After the second visit and I described brain-fog he diagnosed covid. Brain fog lasted about 1.5-2 months, getting better over time. It was pretty bad initially. My GI issues went away after about 3 weeks to a month and had occasional flare ups.</p><p>My most persistent condition has by vision/eye related. It started early/mid dec. I woke up from a nap and my right eye was off. it\'s been affected since. It\'s hard to describe, I wouldn\'t say it\'s blurry, maybe foggy? It just seems a bit off from my left eye. It\'s often dry, gets crusty when I wake up and is at it\'s worst at night, looking at screens. It\'s sometimes is accompanied by headaches but I generally chalk that up to screen time and it being off. This has been the most concerning symptom I\'ve had because it\'s not as common as other symptoms among long haulers.</p><p>Not a day passes that I don’t think this is something more serious and get that anxiety and depression around it. I struggle sleeping not because of covid but because of the anxiety thinking it\'s more serious. Just wanted to share my story incase people are looking for validation. This sub has helped me GREATLY. Finding others dealing with this has really really put some ease in my mind.</p>','B12,VITAMINC','HEADACHE,COATHANGERPAIN,BRAINFOG'),(2,'2021-04-19 20:38:56','2021-04-19 20:38:56','Julia\'s Longhaul story','Julia','127.0.0.1','A_2529','NATIVE_OTHER','FEMALE','US','2021-02-09 10:00:00',1,NULL,'AVERAGE','<p class=\"ql-align-justify\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit tortor metus, vel viverra dolor ullamcorper et. Nullam nec nisi ultrices, fermentum dolor non, pellentesque lectus. Nullam commodo sagittis quam, vel fringilla ex semper quis. Duis at sollicitudin eros. Donec ex erat, auctor quis nisl auctor, lobortis commodo nisi. Pellentesque iaculis gravida mi ut dapibus. Morbi eu vehicula tortor. Vivamus vehicula, enim vel bibendum vehicula, ligula mauris congue sapien, sed pretium nibh ligula eu diam. Sed porttitor non elit non luctus. Donec porta neque dictum convallis pulvinar. Morbi leo ipsum, fermentum at nisl non, condimentum fringilla odio. Morbi finibus velit purus, nec viverra tellus feugiat at. Vivamus hendrerit, odio quis venenatis ornare, leo nunc tincidunt elit, vel faucibus turpis nibh vel sapien.</p><p class=\"ql-align-justify\">Curabitur at ante eget massa commodo pellentesque quis non urna. Morbi quis aliquam sem, vel sollicitudin leo. Pellentesque quam ligula, sollicitudin sit amet pretium eget, auctor in tortor. In elementum faucibus luctus. Mauris efficitur erat a libero finibus, nec ultricies ante rutrum. Nullam a libero dapibus, imperdiet leo sed, vehicula lacus. Sed eget dictum odio.</p><p class=\"ql-align-justify\">Aenean consequat pharetra vehicula. Donec eu rhoncus odio. Proin dolor augue, molestie at arcu vitae, eleifend auctor ligula. Sed sed volutpat turpis, at venenatis tortor. Aliquam luctus, sapien vulputate hendrerit mollis, enim massa imperdiet nunc, in consequat sem justo eu arcu. Sed convallis cursus volutpat. Aliquam sed dui ipsum. Sed non placerat metus, at lacinia lorem.</p><p><br></p>','B12','HEADACHE');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2021-04-19 23:52:08
