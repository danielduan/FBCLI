<?php
$path=$_GET['path'];
$url="http://graph.facebook.com/"+path+"/picture";

header("Content-Description: Facebook Proxied File");
header("Content-Type: image");
header("Content-Disposition: attachment; filename=".$url);
@readfile($url);
?>
