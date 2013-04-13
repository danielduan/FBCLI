<?php
function follow($url){ 
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_FRESH_CONNECT,true);
		curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)"); 
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
		curl_setopt($ch, CURLOPT_AUTOREFERER, true);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 120);
		curl_setopt($ch, CURLOPT_TIMEOUT, 120);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0); 
		$result = curl_exec($ch);
		$header  = curl_getinfo($ch); 
	    curl_close($ch); 
		return $header['url'];  
}

function downImg($imagepath) {
	$url = follow('graph.facebook.com/'.$imagepath.'/picture');
	echo $url;
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_POST, 0);
	curl_setopt($ch,CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$result=curl_exec($ch);
	curl_close($ch);
	return $result;
}

$imagecontent = downImg($_GET['fid']);
$savefile = fopen($_GET['fid'].'_image.jpg', 'w'); // or path/to/image.jpg
fwrite($savefile, $imagecontent);
fclose($savefile);


// file_put_contents('/path/to/file', file_get_contents('http://www.example.com/source.image');
?>