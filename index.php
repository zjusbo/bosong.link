<?php  
  define('__ROOT__', dirname(__FILE__));
  require_once(__ROOT__.'/env.php');
  require_once(__ROOT__.'/utils.php');

  define('URL_PARAM', 'url');

  if (DEBUG) {
  	ini_set('display_errors', 1);
  	ini_set('display_startup_errors', 1);
  	error_reporting(E_ALL);
  }

  $short_url = '';
  if (isset($_GET[URL_PARAM])) {
    $short_url = $_GET[URL_PARAM];
  }

  if ($short_url === '') {
    # show edit page with no prefilled short link
    echo 'show edit page with no prefilled short link';
    exit ;
  } 
 
  $original_url = fetchOriginalUrl($short_url);
  
  if ($original_url === '') {
  	# show edit page with prefilled short link
  	echo 'show edit page with prefilled short link';
  	exit ;
  }

  # redirect the page
  # reference https://www.php.net/manual/en/function.header.php
  if (!startswith($original_url, 'http://') 
  	and !startswith($original_url, 'https://')) {
  	$original_url = 'http://'. $original_url;
  }
  header('Location: ' . $original_url, true, 302);
  exit ;

  # returns the original url found in DB. Empty string is returned if
  # no record was found.
  function fetchOriginalUrl($short_url) {
	  $pdo = new PDO('mysql:host=localhost;dbname='.DB_NAME, DB_USER, DB_PASSWORD);
	  $stm = $pdo->prepare('SELECT original_url FROM url WHERE short_url = :short_url AND is_deleted = false');
	  $stm->bindParam(':short_url', $short_url, PDO::PARAM_STR);
	  $stm->execute();
	  $row = $stm->fetch(PDO::FETCH_ASSOC);
      return isset($row['original_url'])? $row['original_url']: '';
  }
?>
