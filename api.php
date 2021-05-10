<?php 
	require_once( 'config.php' );

    $DATA = json_decode(file_get_contents(URL_DATA), true);


	function get_quote_num(){
		try{
			$conn = get_connection();

			$stmt = $conn->prepare('INSERT INTO quotes (quotenum, firstname, lastname, phone, email) VALUES (:quotenum, :firstname, :lastname, :phone, :email)');

			$stmt->bindParam(':quotenum', $_POST['format_quote_num']);
			$stmt->bindParam(':firstname', $_POST['first_name']);
			$stmt->bindParam(':lastname', $_POST['last_name']);
			$stmt->bindParam(':phone', $_POST['phone']);
			$stmt->bindParam(':email', $_POST['email']);

			$stmt->execute();

			return $_POST['format_quote_num'] . $conn->lastInsertId();
		}catch(PDOException $e){
			echo $e->getMessage();

			return '';
		}
		
	}


	function get_connection(){
		try{
			$conn = new PDO('mysql:host=' . DB_SERVER . ':' . DB_PORT . ';dbname=' . DB_SCHEMA, DB_USERNAME, DB_PASSWORD);

			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			return $conn;
		}catch(PDOException $e){
			echo $e->getMessage();
		}
		
	}

	// echo get_quote_num();
	
	function get_meta_data() {
		global $DATA;


		return [
			'conveyorWidth'				=> $DATA['conveyorWidth'],
			'belt'						=> $DATA['belt']
		];
	}


	if(isset($_REQUEST['action'])){
		die(json_encode(
			call_user_func($_REQUEST['action'])
		));
	}else{
		echo get_quote_num();
	}


?>