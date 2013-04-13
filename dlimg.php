<?php

function downImg($imagepath) {
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_POST, 0);
	curl_setopt($ch,CURLOPT_URL, $imagepath);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$result=curl_exec($ch);
	curl_close($ch);
	return $result;
}

$imagecontent = downImg(“http://www.urlofimage.png”);
$savefile = fopen('image.jpg', ‘w’); // or path/to/image.jpg
fwrite($savefile, $imagecontent);
fclose($savefile);

// do stuff

unlink('image.jpg'); // deletes the image


// file_put_contents('/path/to/file', file_get_contents('http://www.example.com/source.image');
?>