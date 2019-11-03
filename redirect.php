<?php  
  define('__ROOT__', dirname(__FILE__));
  require_once(__ROOT__.'/env.php');
  require_once(__ROOT__.'/utils.php');

  define('URL_PARAM', 'url');

  $url = '';
  if (isset($_GET[URL_PARAM])) {
    $url = $_GET[URL_PARAM];
  }

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    handlePostRequest($url);
  } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    handleGetRequest($url);    
  } else {
  	echo $_SERVER['REQUEST_METHOD'] . ' is not supported.';
  }
  exit;

  function handlePostRequest($url) {
	  if ($url !== 'edit') {
      	echo 'unsupported post API';
	  }
	  if (!isset($_POST["short_url"]) or !isset($_POST["original_url"])) {
	  	echo 'short_url and original_url need to be set in post body';
	  	exit -1;
	  } 
	  $short_url = $_POST["short_url"];
	  $original_url = $_POST["original_url"];
	  $affectedRow = updateOriginalUrl($short_url, $original_url);
	  echo $affectedRow;
  }

  function handleGetRequest($url) {
	  $original_url = fetchOriginalUrl($url);
  
	  if ($original_url === '') {
	  	# show edit page with prefilled short link
	  	readfile('index.html');
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
  }

  # returns the original url found in DB. Empty string is returned if
  # no record was found.
  function fetchOriginalUrl($short_url, $pdo = NULL) {
  	if (is_null($short_url) or $short_url === ''){
  	  return '';
  	}
	if (is_null($pdo)) {
	  $pdo = new PDO('mysql:host=localhost;dbname='.DB_NAME, DB_USER, DB_PASSWORD);
	}
	$stm = $pdo->prepare('SELECT original_url FROM url WHERE short_url = :short_url AND is_deleted = false');
	$stm->bindParam(':short_url', $short_url, PDO::PARAM_STR);
	$stm->execute();
	$row = $stm->fetch(PDO::FETCH_ASSOC);
	return isset($row['original_url'])? $row['original_url']: '';
  }

  # TODO: 
  # 1. set correct creation date
  # 2. archive previous link and insert the new one
  # 3. set up index on short_url column
  function updateOriginalUrl($short_url, $original_url) {
  	$pdo = new PDO('mysql:host=localhost;dbname='.DB_NAME, DB_USER, DB_PASSWORD);
  	$prev_original_url = fetchOriginalUrl($short_url, $pdo);
	if ($prev_original_url === '') {
		$stm = $pdo->prepare("INSERT INTO url (short_url, original_url, owner_email, creation_date) VALUES (:short_url, :original_url, '', '2019-01-01')");
	} else {
		$stm = $pdo->prepare('UPDATE url SET original_url = :original_url WHERE short_url = :short_url AND is_deleted = false');
	}
	$stm->bindParam(':short_url', $short_url, PDO::PARAM_STR);
	$stm->bindParam(':original_url', $original_url, PDO::PARAM_STR);
	$stm->execute();
	echo $stm->rowCount();
  }
?>
