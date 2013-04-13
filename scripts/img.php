<?php
header("Content-Type: image");
print file_get_contents($_GET['url']);
?>
