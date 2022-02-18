<?php
session_start();
include 'includes/dbh.inc.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Uniting Canterbury Women</title>
  <!-- font awesome -->
  <link rel="stylesheet" type="text/css" href="css/font-awesome.css">
  <!-- main css -->
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <!-- responsive css -->
  <link rel="stylesheet" type="text/css" href="css/responsive.css">
</head>
<!-- <body style="visibility: hidden;"> -->
<body>

<!-- admin login form START -->
<div class="admin-login-container">
  <div class="admin-login-container-inner">
    <form action="includes/adminLogin.inc.php" method="POST">
      <div class="title">Admin Log In</div>
      <div class="input-group outer-shadow hover-in-shadow">
        <input class="input-control" type="text" name="user" placeholder="Admin Username">
      </div>
      <div class="input-group outer-shadow hover-in-shadow">
        <input class="input-control" type="password" name="pwd" placeholder="Password">
      </div>
      <div class="submit-btn">
        <button type="submit" name="submit" class="btn-1 outer-shadow hover-in-shadow">Log in</button>
      </div>
    </form>
    
    <div class="back-btn-container">
      <a href="index.php" class="btn-1 outer-shadow hover-in-shadow">Go back to home</a>
    </div>
  </div>
  
</div>
<!-- admin login form END -->

<!-- main js -->
<script src="js/main.js"></script>
</body>
</html>