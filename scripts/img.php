<?php
$path=$_GET['path'];
$url="http://graph.facebook.com/"+path+"/picture";
if (stristr($url, "fbcdn.")==FALSE && stristr($url, "facebook.")==FALSE)
{
     echo "ERROR";
     exit;
}
header("Content-Description: Facebook Proxied File");
header("Content-Type: image");
header("Content-Disposition: attachment; filename=".$path);
@readfile($path);
?>
