

<?php
/*!
	Inha University in Tashkent 
	Student name: Normurod Mamasoliev;
	Freshman year project 2016 July
	Simple project made on pure PHP
	very simple chat that no database requires 
*/


		//Set the Content Type
  	header('Content-type: image/jpeg');

	if($_SERVER['REQUEST_METHOD']=='POST'){

		if(isset($_POST['go'])){

			$name=$_POST['sender'];

			$message=$_POST['message'];

			$file=fopen("data.json", 'w');

			fwrite($file, '{ "name":"'.$name.'", "message":"'.$message.'"}');

			fclose($file);

			$file_json=fopen("history.json", 'a');

			fwrite($file_json, '{ "name":"'.$name.'", "message":"'.$message.'"}');

			fclose($file_json);

			$file_h=fopen("history.html", 'a');

			fwrite($file_h, '<div class="col-md-6"><h3><b>Name: </b> '.$name.'</h3><p><b>Message: </b>'.$message.'</p></div>');

			fclose($file_h);

			$dat = array('first' =>$name ,'second' => $message );

			echo json_encode($dat);

		}
		if(isset($_POST['do'])){

			$name=$_POST['sender'];

			$message=$_POST['message'];

			$file_name=$_POST['file'];

			$file_type=$_POST['type'];

			$file=fopen("data.json", 'w');

			fwrite($file, '{ "name":"'.$name.'", "message":"'.$message.'","file":"'.$file_name.'","type":"'.$file_type.'"}');

			fclose($file);

			$file_json=fopen("history.json", 'a');

			fwrite($file_json, '{ "name":"'.$name.'", "message":"'.$message.'","file":"'.$file_name.'","type":"'.$file_type.'"}');

			fclose($file_json);

			$file_h=fopen("history.html", 'a');
			echo json_encode($a = array('a' => $file_type));
			if($file_type=='image/gif' OR $file_type=='image/jpeg' OR $file_type=='image/x-icon' OR $file_type=='image/png'){

			fwrite($file_h, '<div class="col-md-6"><h3><b>Name: </b> '.$name.'</h3><p><b>Message: </b>'.$message.'</p><div><p onclick="set(this)" class="file"><span class="glyphicon glyphicon-download"></span> '.$file_name.'</p></div></div>');

			}else{

				fwrite($file_h, '<div class="col-md-6"><h3><b>Name: </b> '.$name.'</h3><p><b>Message: </b>'.$message.'</p><div><a download href="uploads/'.$file_name.'"><span class="glyphicon glyphicon-download"></span> '.$file_name.'</a></div></div>');

			}

			fclose($file_h);

			$dat = array('first' =>$name ,'second' => $message, 'third' => $file_name );

			echo json_encode($dat);

		}

		if(isset($_POST['come'])){

			$file_d=fopen("data.json", 'w');

			fwrite($file_d, '');

			fclose($file_d);

		}

		if(isset($_POST['get_history'])){

			$file_r=fopen('history.html', 'r');

			$data="";

			while(!feof($file_r)) {
  				
  				$data=$data.fgetc($file_r);

			}

			fclose($file_r);

			echo json_encode($data);

		}

		$data = array();

		if(isset($_GET['files']))
		{  
		    $error = false;
		    $files = array();

		    $uploaddir = './uploads/';
		    foreach($_FILES as $file)
		    {
		        if(move_uploaded_file($file['tmp_name'], $uploaddir .basename($file['name'])))
		        {
		            if(substr($file['type'], 0,5)=="image"){
		            
		            	// Create Image From Existing File
  						$jpg_image = imagecreatefromjpeg('images/1.jpg');
  						/*image*/

  						// Allocate A Color For The Text
						$white = imagecolorallocate($jpg_image, 255, 255, 255);

						// Set Path to Font File
						$font_path = 'fonts/glyphicons-halflings-regular.TTF';

						// Set Text to Be Printed On Image
						$text = "This is a sunset!";

						// Print Text On Image
						imagettftext($jpg_image, 25, 0, 75, 300, $white, $font_path, $text);

						// Send Image to Browser
						//imagejpeg($jpg_image);
						$files[] = $uploaddir.$jpg_image;
						
		            		//echo json_encode($jpg_image);

		            }else{

		            	$files[] = $uploaddir .$file['name'];

		            }
		        }
		        else
		        {
		            $error = true;
		        }
		    }
		    $data = ($error) ? array('error' => 'There was an error uploading your files') : array('files' => $files);
		}
		/*else
		{
		    $data = array('success' => 'Form was submitted', 'formData' => $_POST);
		}

		echo json_encode($data);*/

	}

?>