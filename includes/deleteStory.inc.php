<?php

if (isset($_POST['storyId'])) {
  require_once 'dbh.inc.php';

  $storyId = $_POST['storyId'];

  $sql = 'DELETE FROM `yourstories` WHERE `story_id` = ?;';
  $stmt = mysqli_stmt_init($conn);
  if (!mysqli_stmt_prepare($stmt, $sql)) {
    echo 'Delete statement failed.';
    exit();
  }

  mysqli_stmt_bind_param($stmt, "s", $storyId);
  mysqli_stmt_execute($stmt);
  mysqli_stmt_close($stmt);

  echo 'Story successfully deleted.';
  exit();
} else {
  echo 'Post method failed.';
  exit();
}