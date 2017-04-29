<?php
/*!
  Inha University in Tashkent;
  Student name: Normurod Mamasoliev;
  Freshman year project 2016 August;
  working with data tables using jquery and php
*/

if(isset($_GET["sts"])){
  if ($_GET["sts"] == 'error') {
    echo '<div id="danger" id><div class="alert alert-danger">Неверное имя пользователя или пароль!</div></div>';
  }
}
session_start();
if(isset($_GET['logout'])){
    session_unset();
    $_SESSION['username']="";
    $_SESSION['password']="";
    session_destroy();
    //session_destroy();
    //header("Location: ../index.php");
  }else{

  }
?> 
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Логин</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="css/main.css">
</head>
<body>
<div class="container">
  <div class="alert alert-success">Login: admin <br> Password : admin </div>
  <div class="col-sm-4" id="login-bar">
    <h3>Вход</h3>
      <form method="post" action="config/connect.php" role="form" enctype="multipart-data">
        <div class="form-group">
        <label for="password">Логин</label>
            <input type="username" value="<?php if($_SESSION){echo $_SESSION['username'];} ?>" name="username" placeholder="Введите логин" class="form-control" required="required" autofocus />
        </div>
        <div class="form-group">
          <label for="password">Парол</label>
          <input type="password" value="<?php if($_SESSION){echo $_SESSION['password'];} ?>" name="password" placeholder="Введите парол" class="form-control" required="required">
        </div>
            <input type="submit" name="submit" value="Вход" class="btn btn-md btn-primary" style="margin:0 auto; float:none;">
    </form>  
  </div>
</div>
<script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
</body>
</html>