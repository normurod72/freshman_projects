<?php
/*!
  Inha University in Tashkent;
  Student name: Normurod Mamasoliev;
  Freshman year project 2016 August;
  working with data tables using jquery and php
*/

	require_once "head.php";
// for only post reques check

	if(isset($_GET['logout'])){
		session_unset();
		session_destroy();
		header("Location: ../index.php");
	}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
	/* form submittion part */
	if(isset($_POST['submit'])){
		$username=$_POST['username'];
		$password=$_POST['password'];
		session_start();
		$_SESSION['username']=$username;
		$_SESSION['password']=$password;

		$sql->query('SELECT id FROM users WHERE username = \''.$username.'\' AND password = \''.$password.'\' LIMIT 1');
		$data = $sql->fetchAssoc();
		if($data["id"]){
			header("Location: ../edit.php?id=".$data['id']);
		}else{
			header("Location: ../index.php?sts=error");
		}
	}
	
	/* delete row from dataTable */
	if(isset($_POST['delete'])){
		$d_data=$_POST['id'];
		echo $d_data;
		$sql->query('DELETE FROM data WHERE id='.$d_data);
	}

	/* add row to dataTable */
	if(isset($_POST['addRow'])){
		$result=$_POST['ar'];
		$sql->query("INSERT INTO data (type,series,id_number,comments) VALUES ({$result[1]},'{$result[2]}','{$result[3]}','{$result[4]}');");
		$sql->query("SELECT * FROM data WHERE id=(SELECT MAX(id) FROM data)");
		$val=$sql->fetchAll();
		echo json_encode(array('result'=>$val));
	}

	/* update dataTable */
	if(isset($_POST['update'])){
		$update=$_POST['values'];
		$first=$update[0]; $second=$update[1];$third=$update[2];$fourth=$update[3];$fifth=$update[4];
		$sql->query("UPDATE data SET type=$second, series='$third', id_number= '$fourth', comments='$fifth' WHERE id=$first");
	}

	/* Retrieve all data from database */
	if(isset($_POST['retrieve'])){
		$sql->query("SELECT * FROM data ORDER BY id DESC");
		$result=$sql->fetchAll();
		echo json_encode(array('result'=>$result));
	}
	
	/* gat all types */
	if(isset($_POST['get_types'])){
		$sql->query("SELECT * FROM types");
		$types=$sql->fetchAll();
		echo json_encode(array('result'=>$types));
	}
}
	require_once "foot.php";
?>