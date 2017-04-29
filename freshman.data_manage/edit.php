<?php
  /*!
  Inha University in Tashkent;
  Student name: Normurod Mamasoliev;
  Freshman year project 2016 August;
  working with data tables using jquery and php
*/
  
  if($_GET['id']){
    require_once("config/head.php"); 
        $sql->query("SELECT * FROM users WHERE id=".$_GET['id']);
        $res=$sql->fetchAll();    
  }else{
    header("Location: ../index.php");
  }
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta content="no-cache">
	<title>D-Table</title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
  <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.min.css">
  <link rel="stylesheet" type="text/css" href="css/main.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.css">
  <script type="text/javascript" src="js/jquery-2.1.4.min.js"></script>
</head>
<body>

<nav class="navbar navbar-inverse" id="fixed">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#" style="
      font-family:cursive; 
      font-weight:bold; 
      transition:.2s;
      font-size:20px; 
      margin-top:2px">DATA-TABLE</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
         
      <ul class="nav navbar-nav navbar-right">
      <?php
        if($res[0]['can_add']==1){
          echo '<li style="transition:.2s;"><a href="#" id="addRow"><button style="transition:.2s; color:white; font-weight:bold;" type="button" id="dialog1" data-toggle="modal" data-target="#modal1" class="btn btn-info edit"><span class="glyphicon glyphicon-plus"></span> Добавить</button></a></li>';
        }
        if($res[0]['can_edit']==1){
          echo "<script>window.user_edit=true;</script>";
        }else{
          echo "<script>window.user_edit=false;</script>";
        }
        if($res[0]['can_delete']==1){
          echo "<script>window.user_delete=true;</script>";
        }else{
          echo "<script>window.user_delete=false;</script>";
        }
      ?>
        <li style="transition:.2s;"><a href="config/connect.php?logout"><button class="btn btn-danger" style="transition:.2s; color:white; font-weight:bold;">Выйти</button></a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<br /> <br /><br /><br />

<div class="container">
  <table id="data_table">
    <thead>
      <tr style="background-color: rgba(0,0,0,0.5);"><th class="site_name" style="width:20px;">№</th><th style="width:150px;">Тип</th><th style="width:75px;">Серия</th><th style="width:100px;">ID №</th><th>Наименование</th><th style="width:210px;">Действие</th></tr>
    </thead>
  <tbody>
  </tbody>
</table>
</div>
<div class="container">
   <!-- Modal -->
  <div class="modal fade" id="modal" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Редактировать данные</h4>
        </div>
        <div class="modal-body">
          <form role="form" id="edit-form">
              <div class="form-group" style="display:none;">
                <label>ID</label>
                <input type="number" id="edit-id" class="form-control" />
              </div>
              <div class="form-group">
                <label>Тип</label>
                <select class="form-control" id="edit-type" autofocus="autofocus">        
                </select>
              </div>
              <div class="form-group">
                <label>Серия</label>
                <input type="text" id="edit-series" class="form-control" required="required" maxlength="4" />
              </div>
              <div class="form-group">
                <label>ID_№</label>
                <input type="text" id="edit-id_number" max="4" class="form-control" required="required" maxlength="8" />
              </div>
              <div class="form-group">
                <label>Наименование</label>
                <textarea type="number" id="edit-comments"  class="form-control"></textarea>
              </div>
              <input type="button" id="edit-save" value="Сохранить" class="btn btn-lg btn-success" />
            </form>
        </div>
      </div>
      
    </div>
  </div>
  

  <div class="modal fade" id="modal1" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Добавить данные</h4>
        </div>
        <div class="modal-body">
          <div class="form">
            <form role="form" id="form">
              <div class="form-group" style="display:none;">
                <label>ID</label>
                <input type="number" id="id" class="form-control" required="required" />
              </div>
              <div class="form-group">
                <label>Тип</label>
                <select class="form-control" id="type" autofocus="autofocus" >     
                </select>
              </div>
              <div class="form-group">
                <label>Серия</label>
                <input type="text" id="series" class="form-control" required="required" maxlength="4" placeholder="Например: 1A2B" />
              </div>
              <div class="form-group">
                <label>ID_№</label>
                <input type="text" id="id_number" max="4" class="form-control" required="required" maxlength="8" placeholder="Например: 12ABC4D5" />
              </div>
              <div class="form-group">
                <label>Наименование</label>
                <textarea type="number" id="comments"  class="form-control"></textarea>
              </div>
              <input type="button" id="add_row_submit" value="Добавить" class="btn btn-lg btn-primary" />
            </form>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

<div id="notification-box" style="position: fixed;
    bottom: 25%;
    right: 0;
    margin-bottom: 0;
    font-size: 1.2em;
    padding: 1em 1.3em;
    z-index: 2000;
    color: #31708f;
    background-color: #d9edf7;
    border-color: #bce8f1;
    border: 1px solid transparent;
    border-radius: 4px;
    font-family: Helvetica sans-serif;
    box-sizing: border-box;
    display:none;
            "><span></span></div>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/dataTables.bootstrap.js"></script>
<script type="text/javascript" src="js/jquery-ui-src.js"></script>
<script type="text/javascript" src="js/main.js"></script>
</body>
</html>
<?php require_once("config//foot.php");?>