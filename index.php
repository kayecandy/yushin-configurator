<?php 
	require_once( 'config.php' );

	$hasInfeedOutfeed = false;
	$hasAccessories = false;

?>

<!DOCTYPE html>
<html>
<head>
	<title>Candice Experiments - Conveyor Belt Pricing Tool</title>
	<link rel="icon" href="https://repo.cndce.me/favicon.png">
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

			var URL_TEST = '<?php echo !empty($_GET['test_data']) ? $_GET['test_data'] : URL_TEST_DEFAULT ?>';


		<?php else: ?>
			var isTestMode = false;

		<?php endif; ?>

		// Config
		var URL_API = '<?php echo URL_API; ?>';
		var URL_DATA = '<?php echo URL_DATA; ?>';
		var URL_META = '<?php echo URL_META; ?>';
		var URL_MAIL = '<?php echo URL_MAIL; ?>';
		var URL_CALCULATE = '<?php echo URL_CALCULATE ?>';

		


	</script>


</head>
<body class="<?php if( empty( $_GET['show_prices'] ) || $_GET['show_prices'] != 1 ) echo 'hidden-prices' ?>">

	<div id="top-header" class="container-fluid">
		<div class="container text-right h-100">
			<div class="float-left logo-column h-100"></div>
			Entry <b>28</b> by <i>Candice Patricia C.</i>
		</div>
	</div>

	<div id="header" class="container-fluid">
		<div class="container">
			<div class="row m-0">
				<div class="col logo-column m-0 px-4 py-5">
					<img src="./assets/yushin.png" class="w-100">
				</div>
				<div class="col title-column d-flex align-items-end">
					<h1>GUF-P 2000 Pricing Tool</h1>
				</div>
			</div>
			
		</div>
	</div>


	<div class="container">
		<?php include 'content.php' ?>

	</div>

	


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
	<!-- <script type="text/javascript" src="./js/pdfmake.min.js"></script>
	<script type="text/javascript" src="./js/vfs_fonts.js"></script> -->


	

	<script type="text/javascript" src="./pdf-header.js"></script>
	<script type="text/javascript" src="./script.js"></script>

</body>
</html>