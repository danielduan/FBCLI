<?php
header("Content-Type: image/jpeg");
print file_get_contents($_GET['url']);
?>
