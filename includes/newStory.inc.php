<?php

if (isset($_FILES['storyImg']) && isset($_POST['storyTitle']) && isset($_POST['storyIntro']) && isset($_POST['storyContent'])) {
  require_once 'dbh.inc.php';

  $storyImg;
  $storyTitle = $_POST['storyTitle'];
  $storyIntro = $_POST['storyIntro'];
  $storyContent = $_POST['storyContent'];

  $savePath = "../img/yourstory/";
  $savePath = $savePath . basename($_FILES['storyImg']['name']);

  if (move_uploaded_file($_FILES['storyImg']['tmp_name'], $savePath)) {
    $storyImg = "img/yourstory/" . basename($_FILES['storyImg']['name']);

    $sql = 'INSERT INTO `yourstories` (`story_img`, `story_title`, `story_intro`, `story_content`) VALUES (?, ?, ?, ?);';

    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      echo 'Create statement failed.';
      exit();
    }

    mysqli_stmt_bind_param($stmt, "ssss", $storyImg, $storyTitle, $storyIntro, $storyContent);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    echo 'Story successfully created.';
    exit();
  } else {
    echo 'Story imaged uploading failed.';
    exit();
  }
} else {
  echo 'Post method failed.';
  exit();
}