<?php

  if (!isset($_POST['submit'])) {
    header("Location: ../index.php");
    exit();
  }
  else if (isset($_POST['submit'])) {
    $user = $_POST['user'];
    $pwd = $_POST['pwd'];

    require_once 'dbh.inc.php';
    require_once 'functions.inc.php';

    // in case any input is empty
    if (emptyInputLogIn($user, $pwd) !== false) {
      header("Location: ../index.php?error=emptyinput&user=$user");
      exit();
    }

    logInUser($conn, $user, $pwd);

    // to create new admin user
    // $sql = 'INSERT INTO `adminusers` (`admin_uid`, `admin_pwd`) VALUES (?, ?);';
    // $stmt = mysqli_stmt_init($conn);
    // if (!mysqli_stmt_prepare($stmt, $sql)) {
    //   header("Location: ../signUp.php?error=stmtfailed");
    //   exit();
    // }

    // $hashedPwd = password_hash($pwd, PASSWORD_DEFAULT);

    // mysqli_stmt_bind_param($stmt, "ss", $user, $hashedPwd);
    // mysqli_stmt_execute($stmt);
    // mysqli_stmt_close($stmt);

    // header("Location: ../index.php?error=none");
    // exit();
  }