<?php
$friend_id = $_REQUEST['pid'];
$picture = "http://graph.facebook.com/" + friend_id + "/picture";
header('Content-type: image/jpeg');
echo file_get_contents($picture);
?>