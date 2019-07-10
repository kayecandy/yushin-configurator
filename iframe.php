<?php 
	
	// include('under_construction.php');
	// exit();

	require_once( 'config.php' );

	$hasInfeedOutfeed = false;
	$hasAccessories = false;

?>

<!DOCTYPE html>
<html>
<head>
	<title>Candice Experiments - Conveyor Belt Pricing Tool</title>
	<link rel="icon" href="http://cndce.me/favicon.png">
	<meta name="viewport" content="width=device-width, initial-scale=1">


	<!-- Bootstrap -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">


	<!-- jQueryUI -->
	<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

	<!-- Self -->
	<link rel="stylesheet" type="text/css" href="./style.css">


	<!-- Self -->
	
	<script type="text/javascript">

		<?php if( !empty( $_GET['test_mode'] ) && $_GET['test_mode'] == 1 ): ?>
			var isTestMode = true;
		<?php else: ?>
			var isTestMode = false;

		<?php endif; ?>


		// Config
		var URL_API = '<?php echo URL_API; ?>';
		var URL_DATA = '<?php echo URL_DATA; ?>';
		var URL_MAIL = '<?php echo URL_MAIL; ?>';

	</script>


	<!-- Iframe Style -->
	<style type="text/css">
		#content{
			padding: 0;
		}

		#iframe-container{
			margin: 0;
			padding: 0;
			max-width: unset;
		}


	</style>


</head>
<body class="<?php if( empty( $_GET['show_prices'] ) || $_GET['show_prices'] != 1 ) echo 'hidden-prices' ?>">


	<?php include 'content.php' ?>



	<!-- jQuery -->
	<script
	  src="https://code.jquery.com/jquery-3.2.1.min.js"
	  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
	  crossorigin="anonymous"></script>

	<!-- jQueryUI -->
	<script
	  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
	  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
	  crossorigin="anonymous"></script>


	<!-- Bootstrap -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>

	<!-- PDF Make -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.57/pdfmake.min.js" integrity="sha256-8s2O+N1IIFZ/3uLADkpz++emTlVbAiI320n5vcyww8M=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.57/vfs_fonts.js" integrity="sha256-UsYCHdwExTu9cZB+QgcOkNzUCTweXr5cNfRlAAtIlPY=" crossorigin="anonymous"></script>
	<script type="text/javascript" src="./js/pdfmake.min.js"></script>
	<script type="text/javascript" src="./js/vfs_fonts.js"></script>


	

	<script type="text/javascript" src="./pdf-header.js"></script>
	<script type="text/javascript" src="./script.js"></script>

</body>
</html>