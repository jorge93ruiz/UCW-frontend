<?php

  function emptyInputLogIn($user, $pwd) {
    $result;
    if (empty($user) || empty($pwd)) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }

  function logInUser($conn, $user, $pwd) {
    $userExists = userExists($conn, $user);

    if (!$userExists) {
      header("Location: ../index.php?error=adminusernotexists");
      exit();
    }

    $pwdHashed = $userExists['admin_pwd'];
    $checkPwd = password_verify($pwd, $pwdHashed);

    if (!$checkPwd) {
      header("Location: ../index.php?error=pwdincorrect&user=$user");
      exit();
    }
    else if ($checkPwd) {
      session_start();
      $_SESSION['admin_id'] = $userExists['admin_id'];
      $_SESSION['admin_uid'] = $userExists['admin_uid'];
      header("Location: ../index.php?success=loggedin");
      exit();
    }
  }

  function userExists($conn, $user) {
    $sql = 'SELECT * FROM `adminusers` WHERE admin_uid = ?;';
    $stmt = mysqli_stmt_init($conn);
    if (!mysqli_stmt_prepare($stmt, $sql)) {
      header("Location: ../index.php?error=stmtfailed&user=$user");
      exit();
    }

    mysqli_stmt_bind_param($stmt, "s", $user);
    mysqli_stmt_execute($stmt);

    $resultData = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($resultData)) {
      return $row;
    } else {
      $result = false;
      return $result;
    }

    mysqli_stmt_close($stmt);
  }

  // database function
  function getNews($limit) {
    require 'dbh.inc.php';

    $sql = "SELECT *
      FROM `news`
      ORDER BY `news_date` DESC
      LIMIT $limit;";
    $result = mysqli_query($conn, $sql);

    return $result;
  }