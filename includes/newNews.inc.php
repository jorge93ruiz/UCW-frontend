<?php

// if (!isset($_POST['createNewsBtn'])) {
//   header("Location: ../index.php");
//   exit();
// }
// else if (isset($_POST['createNewsBtn'])) {
//   $newsImg;
//   $newsTitle = $_POST['newsTitle'];
//   $newsIntro = $_POST['newsIntro'];
//   $newsUrl = $_POST['newsUrl'];
//   $newsMedia = "";
//   $newsContent = $_POST['newsContent'];

//   require_once 'dbh.inc.php';

//   $savePath = "../img/news/";
//   $savePath = $savePath . basename($_FILES['newsImg']['name']);
//   if (move_uploaded_file($_FILES['newsImg']['tmp_name'], $savePath)) {
//     $newsImg = "img/news/" . basename($_FILES['newsImg']['name']);

//     /* command to create news */
//     $sql = 'INSERT INTO `news` (`news_img`, `news_title`, `news_intro`, `news_url`, `news_media`, `news_content`) VALUES (?, ?, ?, ?, ?, ?);';
//     $stmt = mysqli_stmt_init($conn);
//     if (!mysqli_stmt_prepare($stmt, $sql)) {
//       header("Location: ../index.php?error=createstmtfailed");
//       exit();
//     }

//     mysqli_stmt_bind_param($stmt, "ssssss", $newsImg, $newsTitle, $newsIntro, $newsUrl, $newsMedia, $newsContent);
//     mysqli_stmt_execute($stmt);
//     mysqli_stmt_close($stmt);

//     // header("Location: ../index.php?img=$newsImg?title=$newsTitle?intro=$newsIntro?url=$newsUrl?media=$newsMedia?content=$newsContent");
//     header("Location: ../index.php?success=created");
//     exit();
//   } else {
//     // code to tell user the file uploading has failed
//   }
// }

if (isset($_FILES['newsImg']) && isset($_POST['newsTitle']) && isset($_POST['newsIntro'])) {
  require_once 'dbh.inc.php';

  $newsImg;
  $newsTitle = $_POST['newsTitle'];
  $newsIntro = $_POST['newsIntro'];
  $newsUrl = $_POST['newsUrl'];
  // $newsMedia = $_FILES['newsMedia'];
  $newsMedia = "";
  $newsContent = $_POST['newsContent'];

  $savePath = "../img/news/";
  $savePath = $savePath . basename($_FILES['newsImg']['name']);

  if (move_uploaded_file($_FILES['newsImg']['tmp_name'], $savePath)) {
    $newsImg = "img/news/" . basename($_FILES['newsImg']['name']);

    $sql = 'INSERT INTO `news` (`news_img`, `news_title`, `news_intro`, `news_url`, `news_media`, `news_content`) VALUES (?, ?, ?, ?, ?, ?);';

    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      echo 'Create statement failed.';
      exit();
    }

    mysqli_stmt_bind_param($stmt, "ssssss", $newsImg, $newsTitle, $newsIntro, $newsUrl, $newsMedia, $newsContent);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    echo 'News successfully created.';
    exit();
  } else {
    echo 'News imaged uploading failed.';
    exit();
  }
} else {
  echo 'Post method failed.';
  exit();
}

