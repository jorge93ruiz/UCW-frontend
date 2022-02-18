<?php

if (isset($_POST['newsId']) && isset($_FILES['newNewsImg']) && isset($_POST['newsTitle']) && isset($_POST['newsIntro']) && isset($_POST['newsUrl']) && isset($_FILES['newsMedia']) && isset($_POST['newsContent'])) {
  require_once 'dbh.inc.php';

  $newsId = $_POST['newsId'];
  $newsImg;
  $newsTitle = $_POST['newsTitle'];
  $newsIntro = $_POST['newsIntro'];
  $newsUrl = $_POST['newsUrl'];
  // $newsMedia = $_FILES['newsMedia'];
  $newsMedia = "";
  $newsContent = $_POST['newsContent'];

  if ($_FILES['newNewsImg']['tmp_name']) {
    $savePath = "../img/news/";
    $savePath = $savePath . basename($_FILES['newNewsImg']['name']);

    if (move_uploaded_file($_FILES['newNewsImg']['tmp_name'], $savePath)) {
      $newsImg = "img/news/" . basename($_FILES['newNewsImg']['name']);

      $sql = 'UPDATE `news`
        SET `news_img` = ?,
          `news_title` = ?,
          `news_intro` = ?,
          `news_url` = ?,
          `news_media` = ?,
          `news_content` = ?
        WHERE `news_id` = ?;';
      $stmt = mysqli_stmt_init($conn);
      if (!mysqli_stmt_prepare($stmt, $sql)) {
        echo 'Edit statement failed.';
        exit();
      }

      mysqli_stmt_bind_param($stmt, "sssssss", $newsImg, $newsTitle, $newsIntro, $newsUrl, $newsMedia, $newsContent, $newsId);
      mysqli_stmt_execute($stmt);
      mysqli_stmt_close($stmt);

      echo 'News successfully edited.';
      exit();
    } else {
      echo 'News imaged uploading failed.';
      exit();
    }
  } else {
    $sql = 'UPDATE `news`
      SET `news_title` = ?,
        `news_intro` = ?,
        `news_url` = ?,
        `news_media` = ?,
        `news_content` = ?
      WHERE `news_id` = ?;';
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      echo 'Edit statement failed.';
      exit();
    }

    mysqli_stmt_bind_param($stmt, "ssssss", $newsTitle, $newsIntro, $newsUrl, $newsMedia, $newsContent, $newsId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    echo 'News successfully edited.';
    exit();
  }
} else {
  echo 'Post method failed.';
  exit();
}