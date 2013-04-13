<?php
$friend_id = $_REQUEST['fid'];
$picture = "http://graph.facebook.com/" + friend_id + "/picture?type=small";
header('Content-type: image/jpeg');
echo file_get_contents($picture);
?>