<?php

if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['message'])) {
  $name = $_POST['name'];
  $phone = $_POST['phone'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  // compose email before be sent
  $emailContent = "Name: " . $name . "\n\n
    Phone: " . $phone . "\n\n
    Email: " . $email . "\n\n
    Message: " . $message;
  $emailContent = wordwrap($emailContent, 70);

  // send email
  if (mail("jandresruiz1993@gmail.com", "Email from UCW Website (Contact Us Form)", $emailContent)) {
    echo 'Message sent. We will be in touch shortly.';
    exit();
  }
  else {
    echo 'Message sending failed.';
    exit();
  }
}