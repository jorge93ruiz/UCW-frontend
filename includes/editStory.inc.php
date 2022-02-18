<?php

if (isset($_POST['storyId']) && isset($_FILES['newStoryImg']) && isset($_POST['storyTitle']) && isset($_POST['storyIntro']) && isset($_POST['storyContent'])) {
  require_once 'dbh.inc.php';

  $storyId = $_POST['storyId'];
  $storyImg;
  $storyTitle = $_POST['storyTitle'];
  $storyIntro = $_POST['storyIntro'];
  $storyContent = $_POST['storyContent'];

  if ($_FILES['newStoryImg']['tmp_name']) {
    $savePath = "../img/yourstory/";
    $savePath = $savePath . basename($_FILES['newStoryImg']['name']);

    if (move_uploaded_file($_FILES['newStoryImg']['tmp_name'], $savePath)) {
      $storyImg = "img/yourstory/" . basename($_FILES['newStoryImg']['name']);

      $sql = 'UPDATE `yourstories`
        SET `story_img` = ?,
          `story_title` = ?,
          `story_intro` = ?,
          `story_content` = ?
        WHERE `story_id` = ?;';
      $stmt = mysqli_stmt_init($conn);
      if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo 'Edit statement failed.';
        exit();
      }

      mysqli_stmt_bind_param($stmt, "sssss", $storyImg, $storyTitle, $storyIntro, $storyContent, $storyId);
      mysqli_stmt_execute($stmt);
      mysqli_stmt_close($stmt);

      echo 'Story successfully edited.';
      exit();
    } else {
      echo 'Story imaged uploading failed.';
      exit();
    }
  } else {
    $sql = 'UPDATE `yourstories`
      SET `story_title` = ?,
        `story_intro` = ?,
        `story_content` = ?
      WHERE `story_id` = ?;';
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      echo 'Edit statement failed.';
      exit();
    }

    mysqli_stmt_bind_param($stmt, "ssss", $storyTitle, $storyIntro, $storyContent, $storyId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    echo 'Story successfully edited.';
    exit();
  }
} else {
  echo 'Post method failed.';
  exit();
}