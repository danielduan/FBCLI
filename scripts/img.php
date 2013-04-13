<?php
header("Content-Type: image/jpg");
print file_get_contents($_GET['url']);
?>
