<?php

if (isset($_POST['newsId'])) {
  require_once 'dbh.inc.php';

  $newsId = $_POST['newsId'];

  $sql = 'DELETE FROM `news` WHERE `news_id` = ?;';
  $stmt = mysqli_stmt_init($conn);
  if (!mysqli_stmt_prepare($stmt, $sql)) {
    echo 'Delete statement failed.';
    exit();
  }

  mysqli_stmt_bind_param($stmt, "s", $newsId);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);

  echo 'News successfully deleted.';
  exit();
} else {
  echo 'Post method failed.';
  exit();
}