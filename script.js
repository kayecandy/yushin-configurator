$( document ).ready( function(  ){
	var data;

	const FT_TO_M = 0.3048;
	const FT_TO_MM = 304.8;
	const FT_TO_IN = 12;

	const IN_TO_MM = 25.4;

	const KG_TO_LBS = 2.2;

	const DEG_TO_RAD = Math.PI / 180;

	const MPM_TO_FPM = 3.2808;



	var $aboutContainer = $( '#about-container' );
	var $stepsContainer = $( '#steps-container' );
	var $sidebarContainer = $( '#sidebar' );

	// Input
	var $acceptTerms = $( '#accept-terms-checkbox' );

	var $width = $( '#conveyor-width' );
	var $length = $( '#conveyor-length' );
	var $voltage = $( '#conveyor-voltage' );
	var $lengthUnit = $( '#length-unit' );
	var $slider = $( '#conveyor-slider' );
	var $angle = $( '#conveyor-angle' );

	var $drive = $( 'input[name=conveyor-drive-type]' );
	var $driveVersion = $( '#conveyor-drive-version' );
	var $driveLocation = $( '#conveyor-drive-location' );

	var $infeed = $( '#conveyor-infeed' );
	var $outfeed = $( '#conveyor-outfeed' );

	var $opsMode = $( '#conveyor-operations-mode' );
	var $speedMode = $( '#conveyor-speed-mode' );
	var $speed = $( '#conveyor-speed' );
	var $load = $( '#conveyor-load' );

	var $sideRail = $( '#conveyor-side-rails' );
	var $sideRailSystem = $( 'input[name=conveyor-side-rails-system]' );
	var $sideRailHeight = $( '#conveyor-side-rails-height' );
	var $sideRailUHMW = $( '#conveyor-side-rails-uhmw' );

	var $standType = $( 'input[name=conveyor-stand]' );
	var $standHeight = $( '#conveyor-stand-height' );
	var $standHeightUnit = $( '#stand-height-unit' );
	var $standQuantity = $( '#conveyor-stand-quantity' );
	var $hasCasters = $( '#conveyor-has-caster' );
	var $hasLeveling = $( '#conveyor-has-bracket' );

	var $control1 = $( '#conveyor-controls' );
	var $control2 = $( '#conveyor-controls-cdo-1' );
	var $control3 = $( '#conveyor-controls-cdo-2' );


	// Belt Filters
	var $beltFilters = $( '#belt-step .belt-filter input' );
	var $beltMaxTemp = $( '#belt-max-temp' );
	var $beltRows;



	// Customer Info Input
	var $contactPref = $( '#customer-contact-prefix' );
	var $contactFirst = $( '#customer-contact-first' );
	var $contactLast = $( '#customer-contact-last' );
	var $company = $( '#customer-company' );

	var $address1 = $( '#customer-address-1' );
	var $address2 = $( '#customer-address-2' );
	var $address3 = $( '#customer-address-3' );
	var $address4 = $( '#customer-address-4' );
	var $address5 = $( '#customer-address-5' );

	var $phone = $( '#customer-phone' );
	var $email = $( '#customer-email' );
	var $notes = $( '#customer-notes' );



	// Set active step
	gotoStep( 0 );

	$stepsContainer.css({
		'min-height': $sidebarContainer.height() + 'px'
	});


	// jQuery Dialogues
	$( '.help-text-dialog' ).dialog( {
		autoOpen: false,
		modal: true,
		resizable: false,
		maxHeight: $( window ).height(  ) - 50,
		buttons: {
			'OK': function(  ){
				$( this ).dialog( 'close' );
			}
		},
		show: {
			effect: 'drop',
			direction: 'up',
			duration: 500
		},
		hide: {
			effect: 'drop',
			direction: 'up',
			duration: 200
		},
		width: 650
	} )

	$( '.help-text' ).click( function(  ){
		var field = $( this ).data( 'field' );

		$( '.help-text-dialog[data-field=' + field + ']' ).dialog( 'open' );
	} )






	// Functions
	function gotoNextStep(  ){
		var i = $( '#sidebar .active' ).index(  );

		gotoStep( i + 1 );

	}

	function gotoPreviousStep(  ){
		var i = $( '#sidebar .active' ).index(  );

		gotoStep( i - 1 );
	}

	function gotoStep( index ){
		var $activeMenu = $( '#sidebar .active' );
		var $activeStep = $( '#steps-container .active' );


		var $selectedMenu = $( $( '#sidebar li' )[index] );
		var $selectedStep = $( $( '#steps-container .step' )[index] );

		(async function(){

		if( $selectedStep.is( '#pricing-step' ) ){
				const isValid = await validateAllForms(  );

				if( !isValid )
				return;

			submitForm(  );
				
		}

		$activeMenu.removeClass('active');
		$activeStep.removeClass('active');
		

		$selectedMenu.addClass('active visited');
		$selectedStep.addClass('active visited');

		})();
		
		
	}

	function isWithin( min, max, number ){
		if( max === "NA" )
			max = Infinity;

		return number >= min && number <= max;
	}

	function priceFormat( number ){
		// return '$' + parseFloat( Math.round( number * 100 ) / 100 ).toFixed( 2 );
		return '$' + Math.round( number ).toLocaleString() + '.00';
	}

	function updateSliderDeduct( delta ){
		var sliderDeduct = $length.data( 'slider-deduct' );
		sliderDeduct += delta;
		$length.data( 'slider-deduct', sliderDeduct );
	}



	// Motor Functions
	function getSpeedRange( motorSpeed, speedMode ){
		var speedRange = data['calculations']['speedRange'][speedMode];

		var returnRange = [];

		for( var i=0; i < speedRange.length; i++ ){
			returnRange.push( {
				'min': motorSpeed * speedRange[i]['min'], 
				'max': motorSpeed * speedRange[i]['max']
			} );
		}

		return returnRange;
	}
	function getFriction( drive ){
		if( drive == 'head' )
			return 0.3;

		return 0.7;
	}
	function getWeightOfBelt( length, width, beltWeight ){
		var lengthm = length * FT_TO_M;
		var widthmm = Math.round( width * IN_TO_MM );


		return ( ( lengthm * 2 ) + 0.14 ) * ( widthmm/1000 ) * beltWeight;
	}
	function getTotalForce( beltWeight, frictionFactor, loadkg, angle, opsMode ){
		var angleRad = angle * DEG_TO_RAD;

		var totalForce = 0;

		// Force due to friction
		totalForce += ( loadkg + beltWeight ) * 9.81 * Math.cos( angleRad ) * frictionFactor;

		// Force due to incline
		totalForce += loadkg * 9.81 * Math.sin( angleRad );


		if( opsMode == 'accumulating' ){
			// Force due to accumulation
			totalForce= loadkg * 9.81 * Math.cos( angleRad ) * 0.5;
		}


		return totalForce;
	}
	function getMotorDriveDrum( drive ){
		if( drive == 'head' )
			return 52;

		return 62;
	}
	function getMotorSpeed( driveDrum, speedmpm ){
		return speedmpm / ( ( driveDrum/1000 ) * Math.PI );
	}
	function getMotorPower( drumEfficiency, motorEfficiency, safetyFactor, totalForce, speedmpm ){

		// Motor Power Requirement
		var power = totalForce * speedmpm / 60;


		// Multiply for drum efficacy
		power /= drumEfficiency;


		// Multiply for motor efficiency
		power /= motorEfficiency;


		// Multiply for safety factor
		power *= safetyFactor;


		return power * 0.001341022;
	}
	function getMotorTorque( drumEfficiency, motorEfficiency, safetyFactor, totalForce, driveDrum ){
		// Multiply by drum radius
		var torque = totalForce * driveDrum / 2000;

		// Multiply for drum efficacy
		torque /= drumEfficiency;

		// Multiply for motor efficiency
		torque /= motorEfficiency;

		// Multiply for safety factor
		torque *= safetyFactor;

		return torque * 8.850748;
	}
	function testSpeedRange( speedRange, motorSpeed ){
		for( var i=0; i < speedRange.length; i++ ){
			if( motorSpeed >= speedRange[i]['min'] && motorSpeed <= speedRange[i]['max'] )
				return i+1;
		}

		return false;
	}
	function testMotor( motor, speedRange, speedMode, motorManufacturer, motorSpeed, motorTorque, motorPower ){

		// console.log( 'speedmode', motor['speedMode'], speedMode );
		if( motor['speedMode'] != speedMode )
			return false;

		// console.log( 'mfg', motor['modelManufacturer'], motorManufacturer );
		if( motor['modelManufacturer'] != motorManufacturer )
			return false;

		// console.log( 'SPEED', motor['speed'], motor['torque'], motorSpeed, motorTorque );
		if( ( motor['speed'] / motorSpeed ) * motor['torque'] < motorTorque )
			return false;

		// console.log( 'power' );
		if( motor['power'] < motorPower )
			return false;

		return testSpeedRange( speedRange, motor['speed'] );

	}



	// Drive Function
	function getIsPlateHeavy( driveVersion, quote16 ){
		return driveVersion == 'AC' && quote16 == 3;
	}
	function getIsBodine( driveManufacturer, adapterPlate ){
		return ( driveManufacturer == 'Bodine' || driveManufacturer == 'Baldor' )
			&& ( adapterPlate == 0 || adapterPlate == '' );
	}
	function getDriveDrumOption( drive, driveVersion ){
		if( drive == 'head' && driveVersion != 'AW' )
			return 1;

		if( drive == 'head' && driveVersion == 'AW' )
			return 2;

		if( drive == 'center' )
			return 3;
	}
	function getIsSteelDriveDrum( drive, load, speed ){
		var loadkg = load /= KG_TO_LBS;
		var speedmpm = speed /= MPM_TO_FPM;

		if( drive == 'head' && loadkg > 75 )
			return false;

		if( drive == 'center' && loadkg > 30 )
			return false;

		if( speedmpm > 80 )
			return false;

		return true;
	}
	function getIsLaggedDriveDrum( isSteelDriveDrum ){
		return !isSteelDriveDrum;
	}

	function testDrive( drive, isPlateHeavy, isBodine, isASAbove, isStainlessSteelDrums, isVGuidedDrums, widthmm, driveVersion, driveShafts, driveLocation ){

		// console.log( 'version' );
		if( drive['version'] != driveVersion )
			return false;

		// console.log( 'shafts' );
		if( drive['maxShafts'] < driveShafts )
			return false;


		// console.log( 'bb', widthmm, drive['minBB'], drive['maxBB'] );
		if( drive['minBB'] > widthmm || drive['maxBB'] < widthmm )
			return false;

		// console.log( 'heavy' );
		if( drive['plateHeavy'] != isPlateHeavy )
			return false;

		// console.log( 'location' );
		if( drive['location'] != '' && drive['location'] != 0 )
			if( drive['location'] != driveLocation )
				return false;

		// console.log( 'bodine' );
		if( drive['bodine'] != isBodine && driveVersion != 'AA')
			return false;

		// console.log( 'above' );
		if( drive['above'] != isASAbove )
			return false;

		// console.log( 'ss' );
		if( drive['SS'] != isStainlessSteelDrums )
			return false;

		// console.log( 'v' );
		if( drive['V'] != isVGuidedDrums )
			return false;


		return true;
	}


	function testDriveDrum( driveDrum, driveDrumOption, isSteelDriveDrum, isLaggedDriveDrum, isStainlessSteelDrums, isVGuidedDrums, widthmm ){

		if( driveDrum['drumOptions'] != driveDrumOption )
			return false;

		if( driveDrum['minBB'] > widthmm || driveDrum['maxBB'] < widthmm )
			return false;

		if( driveDrum['steel'] != isSteelDriveDrum )
			return false;

		if( driveDrum['lagged'] != isLaggedDriveDrum )
			return false;

		if( driveDrum['SS'] != isStainlessSteelDrums )
			return false;

		if( driveDrum['V'] != isVGuidedDrums )
			return false;

		return true;
	}
	

	// Infeed/Oufeed Functions
	function testInfeedTail( infeedTail, widthmm, lengthmm, version ){
		// console.log( 'version' );
		if( infeedTail['version'] != version )
			return false;

		// console.log( 'bb', widthmm, infeedTail['minBB'], infeedTail['maxBB'] );
		if( infeedTail['minBB'] > widthmm || infeedTail['maxBB'] < widthmm )
			return false;

		// console.log( 'oal', lengthmm, infeedTail['minOAL'], infeedTail['maxOAL'] );
		if( infeedTail['minOAL'] > lengthmm || infeedTail['maxOAL'] < lengthmm )
			return false;

		return true;
	}

	function testOutfeedTail( outfeedTail, widthmm, lengthmm, version ){
		isTestMode && console.log('test outfeed tail:', [
			[outfeedTail['version'], version],
			outfeedTail['version'] != version,
			outfeedTail['minBB'] > widthmm || outfeedTail['maxBB'] < widthmm,
			outfeedTail['minOAL'] > lengthmm || outfeedTail['maxOAL'] < lengthmm
		]);

		if( outfeedTail['version'] != version )
			return false;

		if( outfeedTail['minBB'] > widthmm || outfeedTail['maxBB'] < widthmm )
			return false;

		if( outfeedTail['minOAL'] > lengthmm || outfeedTail['maxOAL'] < lengthmm )
			return false;

		return true;
	}
	function testInfeedWidthVars( infeedWidthVars, widthmm, version ){
		if( infeedWidthVars['version'] != version )
			return false;

		if( infeedWidthVars['minBB'] > widthmm || infeedWidthVars['maxBB'] < widthmm )
			return false;

		return true;
	}

	function testOutfeedWidthVars( outfeedWidthVars, widthmm, version ){
		if( outfeedWidthVars['version'] != version )
			return false;

		if( outfeedWidthVars['minBB'] > widthmm || outfeedWidthVars['maxBB'] < widthmm )
			return false;

		return true;
	}



	// Formulas
	function getCPT( label, isCPT, widthmm ){
		if( isCPT )
			return label;

		var widthmm = Math.round( widthmm );

		if( widthmm > 99 )
			return label + '.0' + widthmm;

		return label + '.00' + widthmm;
	}


	function getBeltWidthMm( width ){

		if( width > 600 )
			return width - 15;

		return width - 10;
	}

	function getBeltLengthMm( drive, length ){

		if( drive == 'head' ){
			return length * 2 + 60;
		}

		return length * 2 + 194;
	}

	/**
	 * TODO: Transfer to backend
	 */
	function getBeltPrice( drive, piw, width, length ){
		var belt = data['belt'];

		var beltWidth = getBeltWidthMm( width ) / IN_TO_MM;
		var beltLength = getBeltLengthMm( drive, length ) / FT_TO_MM;


		var listPrice = ( ( ( beltLength + 9.5 ) * beltWidth ) * piw ) + belt['splice'];

		var cost = listPrice * ( 1 - belt['discount'] );

		// console.log( 'belt', beltWidth, getBeltLengthMm( drive, length ), beltLength, listPrice );

		return cost * belt['markup'];
		// return length + 9.5;
	}

	function getMotorPrice( motor ){
		motor['price'] = {
			'motor': getPart( motor['modelOur'] )['price'],
			'adapterPlate': getPart( motor['adapterPlateOur'] )['price'],
			'terminalBox': getPart( motor['terminalBox'] )['price'],
			'capacitor': getPart( motor['capacitor'] )['price'],
			'speedControl': getPart( motor['speedControlOur'] )['price'],
			'hpResistor': getPart( motor['hpResistor'] )['price'],
			'armatureFuse': getPart( motor['armatureFuse'] )['price'] 
		};

		return motor;
	}

	function getDrivePrice( drive ){
		drive['price'] = {
			'drive': getPart( drive['labelBOM'] )['price'],
			'driveWidthVars' : getPart( drive['labelWidthVars'] )['price']
		};

		return drive;
	}

	function getDriveDrumPrice( driveDrum ){
		driveDrum['price'] = getPart( driveDrum['labelBOM'] )['price']

		return driveDrum;
	}

	function getInfeedTailPrice( infeedTail ){
		infeedTail['price'] = getPart( infeedTail['labelBOM'] )['price'];

		return infeedTail;
	}

	function getDriveTrainPrice( speedMode ){
		if( speedMode == '' || speedMode == 0 )
			return 0

		return 60;
	}

	function getProperties( data, index ){
		var properties = Object.getOwnPropertyNames( data );
		var obj = {};

		for( var i=0; i < properties.length; i++ ){
			obj[properties[i]] = data[properties[i]][index];
		}

		return obj;
	}


	function getPart( part ){
		var parts = data['parts'];

		if( part == 0 || part == '' ){
			return {
				'part' : 0,
				'price': 0
			}
		}

		for( var i=0; i < parts['part'].length; i++ ){
			if( part == parts['part'][i] ){
				return {
					'part': part,
					'description': parts['description'][i],
					'price': parts['price'][i]
				};
			}	
		}

		return undefined;
	}


	// Calculate Prices
	function calculateFramePrice( width, length, slider ){
		var frame = data['frame'];
		var i, j;


		for( i=0; i < frame['conveyorWidth'].length - 1 
			&& width > frame['conveyorWidth'][i]; i++ );



		for( j=0; j < frame['conveyorLength'].length - 1 && length > frame['conveyorLength'][j]; j++ );

		var response = frame['values'][slider][ j*frame['conveyorWidth'].length + i ];

		
		isTestMode && console.log(
			'frame price', 
			width, 
			length, 
			slider, 
			response
		);

		return response;
	}

	function calculateSupportRollsPrice( drive, width, length, speed ){
		var supportRolls = data['supportRolls'];
		var prices;
		var material = 'steel';
		var number;
		var i;

		var speedmpm = speed / MPM_TO_FPM;

		// mm values
		var mmWidth = Math.round( width * IN_TO_MM );
		var mmLength = Math.round( length * FT_TO_MM );

		// Material
		// Spreadsheet v1.20 update - support roll material would
		// only be steel

		// if( speedmpm < 30.5 ){
		// 	if( mmWidth >= 100 && mmWidth <= 300 )
		// 		material = 'plastic';
		// }
		prices = supportRolls['values'][material];

		// Number
		if( drive == 'head' )
			number = Math.floor( ( mmLength - 1 ) / 3000 );
		else
			number = Math.floor( ( mmLength - 1 ) / 6000 ) * 2;


		// Price
		for( i=0; i < supportRolls['conveyorWidth'].length - 1 && width > supportRolls['conveyorWidth'][i]; i++ );

		var response = {
			"number": number,
			"price": prices[i]
		};

		
		isTestMode && console.log(
			'support rolls',
			drive,
			width,
			length,
			speed,
			response
		);

		return response;
	}

	

	function calculateDriveVersion( drive, driveVersion, driveLocation, voltage, widthmm, adapterPlate, motorManufacturer ){ 
		var driveVersions = data['driveVersion'];
		var n = data['calculations']['BOM'];

		var isPlateHeavy = getIsPlateHeavy( driveVersion, n['quote16'] );
		var isBodine = getIsBodine( motorManufacturer, adapterPlate );

		isTestMode && console.log(
			'drive version params', 

			isPlateHeavy, isBodine, n['isASAbove'], n['isStainlessSteelDrums'], n['isVGuidedDrums'], widthmm, driveVersion, n['driveShafts'], driveLocation
		);

		for( var i=0; i < driveVersions['BOM'].length; i++ ){
			var driveObj = getProperties( driveVersions, i );

			if( testDrive( driveObj, isPlateHeavy, isBodine, n['isASAbove'], n['isStainlessSteelDrums'], n['isVGuidedDrums'], widthmm, driveVersion, n['driveShafts'], driveLocation ) ){

				driveObj['labelBOM'] = getCPT( driveObj['BOM'], driveObj['cptBOM'], widthmm );

				driveObj['labelWidthVars'] = getCPT( driveObj['widthVars'], driveObj['cptWidthVars'], widthmm );

				var response = getDrivePrice( driveObj );

				isTestMode && console.log(
					'drive version',
					drive, driveVersion, driveLocation, voltage, widthmm, adapterPlate, motorManufacturer,
					response
				);
		
				return response;
			}
		}

		var response = {
			'price': {
				'drive': 0,
				'widthVars': 0
			}
		};
		

		isTestMode && console.log(
			'drive version',
			drive, driveVersion, driveLocation, voltage, widthmm, adapterPlate, motorManufacturer,
			response
		);

		return response;

	}


	function calculateDriveDrum( drive, driveVersion, widthmm, load, speed ){
		var driveDrums = data['driveDrum'];
		var n = data['calculations']['BOM'];

		var driveDrumOption = getDriveDrumOption( drive, driveVersion );
		var isSteelDriveDrum = getIsSteelDriveDrum( drive, load, speed );
		var isLaggedDriveDrum = getIsLaggedDriveDrum( isSteelDriveDrum );

		isTestMode && console.log(
			'drive drum params:',
			driveDrumOption, isSteelDriveDrum, isLaggedDriveDrum, n['isStainlessSteelDrums'], n['isVGuidedDrums'], widthmm
		)


		for( var i=0; i < driveDrums['BOM'].length; i++ ){
			var driveDrum = getProperties( driveDrums, i );

			if( testDriveDrum( driveDrum, driveDrumOption, isSteelDriveDrum, isLaggedDriveDrum, n['isStainlessSteelDrums'], n['isVGuidedDrums'], widthmm ) ){

				driveDrum['labelBOM'] = getCPT( driveDrum['BOM'], driveDrum['cptBOM'], widthmm );

				var response = getDriveDrumPrice( driveDrum );

				isTestMode && console.log(
					'drive drum:',
					drive, driveVersion, widthmm, load, speed,
					response
				)
				return response;

			}
		}

		var response = {
			'price': 0
		}

		isTestMode && console.log(
			'drive drum',
			drive, driveVersion, widthmm, load, speed,
			response
		)

		return response;
	}

	function calculateDriveDrumSurface( drive, load, speed ){
		var steel = 'steel';
		var rubber = 'rubber coated';

		var loadKg = load / KG_TO_LBS;

		var response;

		if( ( drive == 'head' && loadKg > 75 )
			|| ( drive == 'center' && loadKg > 30 ) 
			|| ( speed > 80 ) ){

				response = rubber;
		}
		else{
			response = steel;
		}

		
		isTestMode && console.log(
			'drive drum surface:',
			drive, load, speed,
			response
		)

		return response;
	}


	function calculateInfeedTail( widthmm, lengthmm, version ){
		var infeedTails = data['infeedTail'];

		for( var i=0; i < infeedTails['BOM'].length; i++ ){
			var infeedTail = getProperties( infeedTails, i );

			if( testInfeedTail( infeedTail, widthmm, lengthmm, version ) ){
				infeedTail['labelBOM'] = getCPT( infeedTail['BOM'], infeedTail['cptBOM'], widthmm );

				var response = getInfeedTailPrice( infeedTail );

				isTestMode && console.log(
					'infeed tail:',
					widthmm, lengthmm, version,
					response
				);

				return response;
			}

		}


		var response = {
			'labelBOM': 'No Infeed Tail',
			'price': 0
		};

		isTestMode && console.log(
			'infeed tail:',
			widthmm, lengthmm, version,
			response
		);

		return response;
	}


	function calculateInfeedWidthVars( widthmm, version ){
		var infeedWidthVars = data['infeedWidthVars'];
		
		for( var i=0; i < infeedWidthVars['BOM'].length; i++ ){
			var infeedWidthVar = getProperties( infeedWidthVars, i );

			if( testInfeedWidthVars( infeedWidthVar, widthmm, version ) ){
				infeedWidthVar['labelBOM'] = getCPT( infeedWidthVar['BOM'], infeedWidthVar['cptBOM'], widthmm );

				response = getInfeedTailPrice( infeedWidthVar );

				isTestMode && console.log(
					'infeed width vars',
					widthmm, version,
					response
				);

				return response;
			}


		}

		response = {
			'price': 0
		};

		isTestMode && console.log(
			'infeed width vars',
			widthmm, version,
			response
		);

		return response;
	}

	function calculateOutfeedWidthVars( widthmm, version ){
		var outfeedWidthVars = data['outfeedWidthVars'];
		
		for( var i=0; i < outfeedWidthVars['BOM'].length; i++ ){
			var outfeedWidthVar = getProperties( outfeedWidthVars, i );

			if( testOutfeedWidthVars( outfeedWidthVar, widthmm, version ) ){
				outfeedWidthVar['labelBOM'] = getCPT( outfeedWidthVar['BOM'], outfeedWidthVar['cptBOM'], widthmm );

				response = getInfeedTailPrice( outfeedWidthVar );
				
				isTestMode && console.log(
					'outfeed width vars',
					widthmm, version,
					response
				);

				return response;
			}

		}

		response = {
			'price': 0
		};

		isTestMode && console.log(
			'outfeed width vars',
			widthmm, version,
			response
		);

		return response;
	}


	function calculateOutfeedTail( widthmm, lengthmm, version ){
		var outfeedTails = data['outfeedTail'];

		for( var i=0; i < outfeedTails['BOM'].length; i++ ){
			var outfeedTail = getProperties( outfeedTails, i );

			if( testOutfeedTail( outfeedTail, widthmm, lengthmm, version ) ){
				outfeedTail['labelBOM'] = getCPT( outfeedTail['BOM'], outfeedTail['cptBOM'], widthmm );

				response = getInfeedTailPrice( outfeedTail );

				isTestMode && console.log(
					'outfeed tail',
					widthmm,lengthmm, version,
					response
				);

				return response;
			}
		}

		response = {
			'price': 0
		};

		isTestMode && console.log(
			'outfeed tail',
			widthmm,lengthmm, version,
			response
		);

		return response;
	}



	function calculateMotors( drive, voltage, opsMode, speedMode, speed, load, width, length, angle ){

		var motors = data['motors'];
		var n = data['calculations']['motor'];


		var speedmpm = speed / MPM_TO_FPM;
		var loadkg = load / KG_TO_LBS;

		
		var motorDriveDrum = getMotorDriveDrum( drive );


		var beltWeightkg = getWeightOfBelt( length, width, n['beltWeight'] );
		var frictionFactor = getFriction( drive );
		var totalForce = getTotalForce( beltWeightkg, frictionFactor, loadkg, angle, opsMode );

		
		var motorSpeed = getMotorSpeed( motorDriveDrum, speedmpm );

		var motorTorque = getMotorTorque( n['drumEfficiency'], n['motorEfficiency'], n['safetyFactor'], totalForce, motorDriveDrum );

		var motorPower = getMotorPower( n['drumEfficiency'], n['motorEfficiency'], n['safetyFactor'], totalForce, speedmpm );



		var speedRange = getSpeedRange( motorSpeed, speedMode );


		var test2 = undefined;
		var test3 = undefined;

		for( var i=0; i < motors['modelOur'].length; i++ ){
			var motor = getProperties( motors, i );

			var test = testMotor( motor, speedRange, speedMode, n['motorManufacturer'], motorSpeed, motorTorque, motorPower );


			if( test == 1 ){
				var response = getMotorPrice( motor );

				isTestMode && console.log(
					'motors',
					drive, voltage, opsMode, speedMode, speed, load, width, length, angle,
					response
				);

				return response;
			}else if( test == 2 && test2 == undefined ){
				test2 = getMotorPrice( motor );
			}else if( test == 3 && test3 == undefined ){
				test3 = getMotorPrice( motor );
			}
		}

		var response;

		if( test2 != undefined )
			response = test2;

		else if( test3 != undefined )
			response = test3;

		else 
			response = {
				'price': 0,
				'note': 'Calculated horse power is invalid'
			};

		isTestMode && console.log(
			'motors',
			drive, voltage, opsMode, speedMode, speed, load, width, length, angle,
			response
		);

		return response;
		

	}

	function calculateSideRails( sideRail, length, railSystem, railHeight, hasUHMW, width, sliderDeduct ){

		var sideRails = data['sideRails'][sideRail];
		var i, j;

		var lengthmm = length * FT_TO_MM;

		var price = 0;
		var oal;
		var desc1 = '';
		var desc2 = '';

		var widthmm = Math.round( width * IN_TO_MM );
		var laneWidth = widthmm;


		// Fixed Rails
		if( sideRail == 'fixed' ){
			sideRails = sideRails[railSystem];

			// SF1.3
			if( railSystem == 'sf13' ){
				price = lengthmm / 1000 * 30

				oal = lengthmm - sliderDeduct;
				laneWidth -= 2;

			// SF7.1
			}else if( railSystem == 'sf71' ){

				for( i=0; i < sideRails['conveyorLength'].length - 1 && length > sideRails['conveyorLength'][i]; i++ );

				for( j=0; j < sideRails['railHeight'].length - 1 && railHeight > sideRails['railHeight'][j]; j++ );

				price = 2 * sideRails['price'][ i * sideRails['railHeight'].length + j ]

				oal = lengthmm;
			}

			desc1 = 'H=' + railHeight + ' mm';
			desc2 = 'Effective Lane Width: ' + laneWidth + ' mm';


		// Adjustable Rails
		}else if( sideRail == 'adjustable' ){

			var from = 0;
			var to = widthmm + 60;

			var umhw = 'no';


			desc1 = 'Aluminum Side Rails';

			if( hasUHMW ){
				umhw = 'yes';
				desc1 = 'UHMW backed Aluminum Side Rails';
			}

			if( widthmm > 140 )
				from = widthmm - 140;

			for( i=0; i < sideRails['conveyorLength'].length - 1 && length > sideRails['conveyorLength'][i]; i++ );


			price = 2 * sideRails['price'][umhw][i];
			oal = lengthmm;
			desc2 = 'Lane width adjustable from ' + from + ' mm to ' + to + ' mm';

		}else{
			sideRails = {
				'name': 'None Requested.'
			};
		}

		
		var response = {
			'name'	: sideRails['name'],
			'price' : price,
			'OALmm' : oal,
			'desc1' : desc1,
			'desc2' : desc2
		}

		isTestMode && console.log(
			'side rails:',
			sideRail, length, railSystem, railHeight, hasUHMW, width, $length.data( 'slider-deduct' ),
			response
		);

		return response;
	}


	function calculateStands( standType, standHeight, standQuantity, width ){

		var stands = data['stands'][standType];
		var j, k;

		console.log(stands, standType);

		if( standType == 'none' ){
			var response = {
				'name'		: 'No Stand',
				'basePrice' : 0,
				'price'		: 0,
				'quantity'	: 0
			}

			isTestMode && console.log(
				'stands:',
				standType, standHeight, standQuantity, width,
				response
			);
	
			return response;
		}


		// Price
		for( j=0; j < stands['standsHeight'].length - 1 && standHeight > stands['standsHeight'][j]; j++ );
		for( k=0; k < stands['conveyorWidth'].length && width > stands['conveyorWidth'][k]; k++ );

		var price = stands['price'][ stands['conveyorWidth'].length * j + k ];


		var response = {
			'name'		: stands['name'],
			'basePrice'	: price,
			'quantity'	: standQuantity,
			'price'		: standQuantity * price
		};

		isTestMode && console.log(
			'stands:',
			standType, standHeight, standQuantity, width,
			response
		);

		return response;

	}

	function calculateStandsCaster( standQuantity ){
		var response = {
			'basePrice'	: data['standsCaster']['price'],
			'quantity'	: standQuantity,
			'price'		: data['standsCaster']['price'] * standQuantity
		};

		isTestMode && console.log(
			'stands caster',
			standQuantity,
			response
		);

		return response;
	}	

	function calculateStandLeveling( standQuantity ){
		var response = {
			'basePrice'	: data['standsLeveling']['price'],
			'quantity'	: standQuantity,
			'price'		: data['standsLeveling']['price'] * standQuantity
		};

		isTestMode && console.log(
			'stand leveling',
			standQuantity,
			response
		);

		return response;
	}


	function calculateHasStringers( stand, standQuantity ){
		var response = standQuantity > 1 && stand != 'none';

		isTestMode && console.log(
			'has stringers',
			stand, standQuantity,
			response
		);

		return response;
	}


	function calculateStringers( stand, length, standQuantity ){
		var hasStringers = calculateHasStringers( stand, standQuantity );

		var response = 0;

		if( hasStringers ){
			var stringers = data['stringers'];
			var i;

			for( i=0; i < stringers['conveyorLength'].length - 1 && length > stringers['conveyorLength'][i]; i++ );

			response = {
				'basePrice'	: stringers['price'][i],
				'mtgPrice'	: stringers['mtgAngles'],
				'quantity'	: standQuantity,
				'price'		: stringers['price'][i] + ( standQuantity * stringers['mtgAngles'] )
			};

		}

		isTestMode && console.log(
			'stringers',
			stand, length, standQuantity,
			response
		);

		return response;


	}

	function calculateControl( control1, control2, control3 ){
		var controls = data['controls'];
		var n = data['calculations']['pricing'];

		var total = 0;

		var controlPrice = {...controls};


		// Add control markup
		controlPrice['control1'] *= n['option1Markup'];
		controlPrice['control2'] *= n['option2Markup'];
		controlPrice['control3'] *= n['option3Markup'];

		if( control1 )
			total += controlPrice['control1'];

		if( control2 )
			total += controlPrice['control2'];

		if( control3 )
			total += controlPrice['control3'];


		var response = {
			'control1': controlPrice['control1'],
			'control2': controlPrice['control2'],
			'control3': controlPrice['control3'],
			'price': total
		};

		isTestMode && console.log(
			'control',
			control1, control2, control3,
			response
		);

		return response;
	}

	function calculatePricing( basePrice ){
		var n = data['calculations']['pricing'];


		var priceInc1 = Math.ceil( basePrice * ( 1 + n['priceIncrease1'] ) );

		var priceInc2 = Math.ceil( priceInc1 * ( 1 + n['priceIncrease2'] ) );

		var packagingPrice = Math.ceil( priceInc2 * n['packaging'] );

		var listPrice = priceInc2 + packagingPrice;

		var yushinNet = Math.ceil( listPrice * ( 1 - n['discount'] ) ) * n['mkMarkup'];

		var price = yushinNet * n['yushinMarkup'];

		var response = {
			'priceInc1': priceInc1,
			'priceInc2': priceInc2,
			'packagingPrice': packagingPrice,
			'listPrice': listPrice,
			'yushinNet': yushinNet,
			'price': price
		};

		isTestMode && console.log(
			'pricing',
			basePrice,
			response
		);

		return response;

		
	}

	


	// Updates
	function updateBeltPrices(  ){
		$( '#belt-step .belt-row' ).each( function(  ){
			var beltPrice = getBeltPrice( 
				$drive.filter( ':checked' ).val(  ), 
				$( '.belt-price', this ).data( 'piw' ), 
				$width.val(  ) , 
				$length.data( 'mm-val' ) 
			);

			$( '.belt-price', this ).text( priceFormat( beltPrice ) );
			$( this ).data( 'price', beltPrice );

		} );
	}

	function updateFramePrice( framePrice ){

		$( '#pricing-step .frame-price' ).text( priceFormat( framePrice ) );
		$( '#pricing-step .frame-width' ).text( ($width.val(  ) / IN_TO_MM).toFixed(2) + '" / ' + $width.val(  ) + 'mm' );
		$( '#pricing-step .frame-length' ).text( ( $length.data( 'mm-val' ) / FT_TO_MM ).toFixed(2) + '\' / ' + $length.data( 'mm-val' ) + 'mm' );


		// Table
		$( '#pricing-step .frame-width-mm' ).text( $width.val(  ) );
		$( '#pricing-step .frame-width-in' ).text( Math.round( $width.val(  ) / IN_TO_MM ) );
		$( '#pricing-step .frame-length-mm' ).text( Math.round( $length.data( 'mm-val' ) ) );
		$( '#pricing-step .frame-length-in' ).text( Math.round( $length.data( 'mm-val' ) / IN_TO_MM ) );

		if( $angle.val(  ) == 0 ){
			$( '#pricing-step .incline-label' ).text( 'Conveyor is horizontal' );
		}else{
			$( '#pricing-step .incline-label' ).text( 'Conveyor will be running at an angle of ' + $angle.val(  ) + ' degrees' );
		}

	}


	function updateSupportRolls( supportRolls ){

		$( '#pricing-step .support-roll-number' ).text( supportRolls['number'] );	
		$( '#pricing-step .support-roll-price' ).text( priceFormat( supportRolls['price'] ) );	
		$( '#pricing-step .support-roll-total-price' ).text( priceFormat( supportRolls['total'] ) );	

		// Table
		$( '#pricing-step .support-rolls-number' ).text( supportRolls['number'] );

	}


	function updateDrive( driveVersion, driveDrum, driveDrumSurface ){
		// Drive Version
		$( '#pricing-step .drive-version' ).text( $( ':selected', $driveVersion ).data( 'label' ) );
		$( '#pricing-step .drive-location' ).text( $( ':selected', $driveLocation ).text(  ) );
		$( '#pricing-step .drive-part-num' ).text( driveVersion['labelBOM'] );

		$( '#pricing-step .drive-version-total-price' ).text( priceFormat( driveVersion['price']['drive'] ) );


		// // Drive Width Vars
		if( driveVersion['price']['driveWidthVars'] != 0 ){

			$( '#pricing-step .drive-width-vars-part' ).text( driveVersion['labelWidthVars'] );
			$( '#pricing-step .drive-width-vars-total-price' ).text( priceFormat( driveVersion['price']['driveWidthVars'] ) );

			$( '#pricing-step .drive-width-vars' ).removeClass( 'd-none' );

		}else if( $drive.filter( ':checked' ).val(  ) == 'head' ){
			$( '#pricing-step .drive-width-vars-part' ).text( '' );
			$( '#pricing-step .drive-width-vars-total-price' ).text( priceFormat( 0 ) );
			
			$( '#pricing-step .drive-width-vars' ).addClass( 'd-none' );

		}



		// // Drive Drum
		if( driveDrum['price'] != 0 ){

			$( '#pricing-step .drive-drum-part' ).text( driveDrum['labelBOM'] );
			$( '#pricing-step .drive-drum-total-price' ).text( priceFormat( driveDrum['price'] ) );

			$( '#pricing-step .drive-drum-container' ).removeClass( 'd-none' );
		}else{
			$( '#pricing-step .drive-drum-part' ).text( '' );
			$( '#pricing-step .drive-drum-total-price' ).text( priceFormat( 0 ) );

			$( '#pricing-step .drive-drum-container' ).addClass( 'd-none' );
		}



		// // Table
		$( '#pricing-step .drive-version-code' ).text( $driveVersion.find( ':selected' ).data( 'code' ) );
		$( '#pricing-step .drive-type-label' ).text( $drive.filter( ':checked' ).data( 'label' ) );
		$( '#pricing-step .drive-version-label' ).text( $driveVersion.find( ':selected' ).data( 'label' ) );
		$( '#pricing-step .drive-location-label' ).text( $driveLocation.find( ':selected' ).data( 'label' ) );
		$( '#pricing-step .drive-drum-surface-label' ).text( driveDrumSurface );
		
	}

	function updateInfeedOutfeed( infeedTail, infeedWidthVars, outfeedTail, outfeedWidthVars, driveTrainPrice ){

		// Infeed Tail
		$( '#pricing-step .infeed-tail-part' ).text( infeedTail['labelBOM'] );
		$( '#pricing-step .infeed-tail-total-price' ).text( priceFormat( infeedTail['price'] ) );


		// Infeed Tail Width Vars
		$( '#pricing-step .infeed-width-vars-part' ).text( infeedWidthVars['labelBOM'] );
		$( '#pricing-step .infeed-width-vars-total-price' ).text( priceFormat( infeedWidthVars['price'] ) );



		if( outfeedTail['price'] != 0 ){

			$( '#pricing-step .outfeed-tail-part' ).text( outfeedTail['labelBOM'] );
			$( '#pricing-step .outfeed-tail-total-price' ).text( priceFormat( outfeedTail['price'] ) );



			// Outfeed Tail Width Vars
			$( '#pricing-step .outfeed-width-vars-part' ).text( outfeedWidthVars['labelBOM'] );
			$( '#pricing-step .outfeed-width-vars-total-price' ).text( priceFormat( outfeedWidthVars['price'] ) );



			$( '#pricing-step .pdf-table.outfeed' ).removeClass( 'd-none' );

		}else{
			$( '#pricing-step .outfeed-tail-part' ).text( '' );
			$( '#pricing-step .outfeed-tail-total-price' ).text( priceFormat( 0 ) );

			$( '#pricing-step .outfeed-width-vars-part' ).text( '' );
			$( '#pricing-step .outfeed-width-vars-total-price' ).text( priceFormat( 0 ) );

			$( '#pricing-step .pdf-table.outfeed' ).addClass( 'd-none' );
		}

		// Drive Train
		$( '#pricing-step .drive-train-price' ).text( priceFormat( driveTrainPrice ) );



		// Table
		// $( '#pricing-step .infeed-tail-label' ).text( $( ':selected', $infeed ).text(  ) );
		$( '#pricing-step .infeed-tail-label' ).text( infeedTail['infeedVersion'] );


		if( $drive.filter( ':checked' ).val(  ) == 'head' )
			$( '#pricing-step .discharge-tail-label' ).text( 'N/A' );
		else
			$( '#pricing-step .discharge-tail-label' ).text( outfeedTail['outfeedVersion'] );


	}

	function updateMotors( motors ){

		// Input
		$( '#pricing-step .motor-load' ).text( $load.val(  ) + ' lbs' );
		$( '#pricing-step .motor-max-speed' ).text( $speed.val(  ) + ' fpm' );
		$( '#pricing-step .motor-speed-mode' ).text( $( ':selected', $speedMode ).text(  ) );
		$( '#pricing-step .motor-ops-mode' ).text( $( ':selected', $opsMode ).text(  ) );
		$( '#pricing-step .motor-voltage' ).text( $( ':selected', $voltage ).text(  ) );

		// Motors
		$( '#pricing-step .motor-model' ).text( motors['modelOur'] );
		$( '#pricing-step .motor-manufacturer' ).text( motors['modelManufacturer'] );
		$( '#pricing-step .motor-hp' ).text( motors['power'] );
		$( '#pricing-step .motor-speed' ).text( motors['speed'] );
		$( '#pricing-step .motor-torque' ).text( motors['torque'] );
		$( '#pricing-step .motor-price' ).text( priceFormat( motors['price']['motor'] ) );

		// Adapter Plate
		if( motors['price']['adapterPlate'] != 0 ){
			$( '.motor-adapter-plate-container' ).removeClass( 'd-none' );

			$( '#pricing-step .motor-adapter-plate' ).text( motors['adapterPlateOur'] );
			$( '#pricing-step .motor-adapter-plate-price' ).text( priceFormat( motors['price']['adapterPlate'] ) );
		}else{
			$( '.motor-adapter-plate-container' ).addClass( 'd-none' );

			$( '#pricing-step .motor-adapter-plate' ).text( '' );
			$( '#pricing-step .motor-adapter-plate-price' ).text( priceFormat( 0 ) );
		}

		// Terminal Box
		if( motors['price']['terminalBox'] != 0 ){
			$( '.motor-terminal-box-container' ).removeClass( 'd-none' );

			$( '#pricing-step .motor-terminal-box' ).text( motors['terminalBox'] );
			$( '#pricing-step .motor-terminal-box-price' ).text( priceFormat( motors['price']['terminalBox'] ) );
		}else{
			$( '.motor-terminal-box-container' ).addClass( 'd-none' );

			$( '#pricing-step .motor-terminal-box' ).text( '' );
			$( '#pricing-step .motor-terminal-box-price' ).text( priceFormat( 0 ) );
		}


		// Capacitor
		if( motors['price']['capacitor'] != 0 ){
			$( '.motor-capacitor-container' ).removeClass( 'd-none' );

			$( '#pricing-step .motor-capacitor' ).text( motors['capacitor'] );
			$( '#pricing-step .motor-capacitor-price' ).text( priceFormat( motors['price']['capacitor'] ) );
		}else{
			$( '.motor-capacitor-container' ).addClass( 'd-none' );

			$( '#pricing-step .motor-capacitor' ).text( '' );
			$( '#pricing-step .motor-capacitor-price' ).text( priceFormat( 0 ) );
		}

		// Speed Control
		if( motors['price']['speedControl'] != 0 ){
			$( '.motor-speed-control-container' ).removeClass( 'd-none' );

			$( '#pricing-step .motor-speed-control' ).text( motors['speedControlOur'] );
			$( '#pricing-step .motor-speed-control-price' ).text( priceFormat( motors['price']['speedControl'] ) );
		}else{
			$( '.motor-speed-control-container' ).addClass( 'd-none' );

			$( '#pricing-step .motor-speed-control' ).text( '' );
			$( '#pricing-step .motor-speed-control-price' ).text( priceFormat( 0 ) );
		}

		// HP Resistor
		if( motors['price']['hpResistor'] != 0 ){
			$( '.motor-hp-resistor-container' ).removeClass( 'd-none' );

			$( '#pricing-step .motor-hp-resistor' ).text( motors['hpResistor'] );
			$( '#pricing-step .motor-hp-resistor-price' ).text( priceFormat( motors['price']['hpResistor'] ) );
		}else{
			$( '.motor-hp-resistor-container' ).addClass( 'd-none' );

			$( '#pricing-step .motor-hp-resistor' ).text( '' );
			$( '#pricing-step .motor-hp-resistor-price' ).text( priceFormat( 0 ) );
		}

		// Armature Fuse
		if( motors['price']['armatureFuse'] != 0 ){
			$( '.motor-arm-fuse-container' ).removeClass( 'd-none' );

			$( '#pricing-step .motor-arm-fuse' ).text( motors['armatureFuse'] );
			$( '#pricing-step .motor-arm-fuse-price' ).text( priceFormat( motors['price']['armatureFuse'] ) );
		}else{
			$( '.motor-arm-fuse-container' ).addClass( 'd-none' );

			$( '#pricing-step .motor-arm-fuse' ).text( '' );
			$( '#pricing-step .motor-arm-fuse-price' ).text( priceFormat( 0 ) );
		}
		




		if( motors['note'] != undefined ){
			$( '#pricing-step .motor-note' ).text( motors['note'] );
		}else{
			$( '#pricing-step .motor-note' ).text( '' );
		}



		



		// // Table
		var motorDescription = '115 VAC, 60Hz, 1Ph';

		if( $speedMode.val(  ) == 'variable' )
			motorDescription = motors['voltageOutput'];

		var motorCordControl = 'Control shipped loose';

		if( motors['modelManufacturer'] == 'Bodine' )
			motorCordControl = 'Control includes 3\' cord';
		else
			motorCordControl = 'Wiring terminates at control';




		$( '#pricing-step .load-label' ).text( $( ':selected', $load ).text(  ) );
		$( '#pricing-step' ).attr( 'data-opsMode', $opsMode.val(  ) );
		$( '#pricing-step .speed-label' ).text( $( ':selected', $speed ).text(  ) );
		$( '#pricing-step .speed-mode-label' ).text( $( ':selected', $speedMode ).text(  ) );

		$( '#pricing-step .motor-manufacturer-label' ).text( motors['modelManufacturer'] );
		$( '#pricing-step .motor-description' ).text( motorDescription );

		$( '#pricing-step .motor-cord-control' ).text( motorCordControl );

		
	}

	/**
	 * TODO: Move to backend
	 */
	function updateBelt(  ){
		var $selected = $( '#belt-step .belt-row.selected' );

		if( $selected.length > 0 ){

			$( '#pricing-step .belt-total-price' ).text( $( '.belt-price', $selected ).text(  ) );
			$( '#pricing-step .belt-surface-material' ).text( $( '.belt-material', $selected ).text(  ) );
			$( '#pricing-step .belt-surface-desc' ).text( $( '.belt-desc', $selected ).text(  ) );
			$( '#pricing-step .belt-surface-color' ).text( $( '.belt-color', $selected ).text(  ) );
			$( '#pricing-step .belt-max-temp' ).text( $( '.belt-max-temp', $selected ).text(  ) );
			$( '#pricing-step .belt-notes' ).text( $( '.belt-notes', $selected ).text(  ) );


			$( '#pricing-step .no-belt-selected' ).addClass( 'd-none' );
		}else{
			$( '#pricing-step .belt-values' ).text( '' );
			$( '#pricing-step .belt-total-price' ).text( priceFormat( 0 ) );
			$( '#pricing-step .no-belt-selected' ).removeClass( 'd-none' );

		}


		// Table
		if( $selected.length > 0 ){

			/**
			 * TODO: Move to backend
			 */
			var beltWidthmm = getBeltWidthMm( $width.val(  ) );
			var beltLengthmm = getBeltLengthMm( $drive.filter( ':checked' ).val(  ), $length.data('mm-val') );

			$( '#pricing-step .belt-number' ).text( $( '.belt-num', $selected ).text(  ) );
			$( '#pricing-step .belt-color' ).text( $( '.belt-color', $selected ).text(  ) );
			$( '#pricing-step .belt-material' ).text( $( '.belt-material', $selected ).text(  ) );

			$( '#pricing-step .belt-width-mm' ).text( beltWidthmm );
			$( '#pricing-step .belt-width-in' ).text( Math.round( beltWidthmm / IN_TO_MM ) );

			$( '#pricing-step .belt-length-mm' ).text( beltLengthmm );
			$( '#pricing-step .belt-length-in' ).text( Math.round( beltLengthmm / IN_TO_MM ) );


			$( '#pricing-step .belt-label' ).removeClass( 'd-none' );
			$( '#pricing-step .belt-na' ).addClass( 'd-none' );



		}else{
			$( '#pricing-step .belt-na' ).removeClass( 'd-none' );
			$( '#pricing-step .belt-label' ).addClass( 'd-none' );
		}

		$( '#pricing-step .slider-label' ).text( $( ':selected', $slider ).text(  ) );

	}

	function updateSideRails( sideRails ){

		if( $sideRail.val(  ) != 'none' ){

			$( '#pricing-step .side-rails-note' ).text( sideRails['name'] );
			$( '#pricing-step .side-rails-total-price' ).text( priceFormat( sideRails['price'] ) );
		}else{
			$( '#pricing-step .side-rails-note' ).text( 'No Rails' );
			$( '#pricing-step .side-rails-total-price' ).text( priceFormat( 0 ) );
		}

		// Table
		if( sideRails['price'] != 0 ){
			$( '#pricing-step .rail-system' ).text( sideRails['name'] );
			$( '#pricing-step .side-rail-oal' ).text( sideRails['OALmm'] );

			$( '#pricing-step .side-rail-oal-container' ).removeClass( 'd-none' );
			$( '#pricing-step .side-rail-desc-1' ).removeClass( 'd-none' );
			$( '#pricing-step .side-rail-desc-2' ).removeClass( 'd-none' );

			$( '#pricing-step .side-rail-desc-1' ).text( sideRails['desc1'] );
			$( '#pricing-step .side-rail-desc-2' ).text( sideRails['desc2'] );



		}else{
			$( '#pricing-step .rail-system' ).text( 'No Rails' );
			$( '#pricing-step .side-rail-oal-container' ).addClass( 'd-none' );
			$( '#pricing-step .side-rail-desc-1' ).addClass( 'd-none' );
			$( '#pricing-step .side-rail-desc-2' ).addClass( 'd-none' );
		}

	}

	function updateStands( stands, levelingPrice, casterPrice, stringerPrice ){

		$( '#pricing-step .stand-type' ).text( stands['name'] );
		$( '#pricing-step .stand-height' ).text( $standHeight.val(  ) + "\"" );
		$( '#pricing-step .stand-quantity' ).text( stands['quantity'] );
		$( '#pricing-step .stand-price' ).text( priceFormat( stands['basePrice'] ) );
		$( '#pricing-step .stand-total-price' ).text( priceFormat( stands['price'] ) );


		// Leveling
			$( '#pricing-step .stand-leveling-price' ).text( priceFormat( levelingPrice['basePrice'] ) );


			$( '#pricing-step .stand-leveling-quantity' ).text( levelingPrice['quantity'] );
			$( '#pricing-step .stand-leveling-total-price' ).text( priceFormat( levelingPrice['price'] ) );

		if( levelingPrice['price'] ){
			$( '#pricing-step .leveling' ).removeClass( 'd-none' );

		}else{
			$( '#pricing-step .leveling' ).addClass( 'd-none' );
		}


		// Casters
			$( '#pricing-step .stand-caster-price' ).text( priceFormat( casterPrice['basePrice'] ) );

			$( '#pricing-step .stand-caster-quantity' ).text( casterPrice['quantity'] );
			$( '#pricing-step .stand-caster-total-price' ).text( priceFormat( casterPrice['price'] ) );

		if( casterPrice['price'] ){
			$( '#pricing-step .casters' ).removeClass( 'd-none' );

		}else{
			$( '#pricing-step .casters' ).addClass( 'd-none' );

		}


		// Stringers
			$( '#pricing-step .stand-stringers-price' ).text( priceFormat( stringerPrice['basePrice'] ) );

			$( '#pricing-step .stand-stringers-mtg-price' ).text( priceFormat( stringerPrice['mtgPrice'] ) );
			$( '#pricing-step .stand-stringers-total-price' ).text( priceFormat( stringerPrice['price'] ) );


		if( stringerPrice['price'] ){
			$( '#pricing-step .pdf-container.stringers' ).removeClass( 'd-none' );
		}else{
			$( '#pricing-step .pdf-container.stringers' ).addClass( 'd-none' );
		}


		// Table
		var standHeightmm = Math.round( $standHeight.val(  ) * IN_TO_MM );

		if( stands['price'] != 0 ){
			$( '#pricing-step .stand-none' ).addClass( 'd-none' );
			$( '#pricing-step .stand-quantity-container' ).removeClass( 'd-none' );

			$( '#pricing-step .stand-height-label' ).text( 'System: 55.1, height H=' + standHeightmm + ' mm' );

			// Leveling
			if( levelingPrice['price'] ){
				$( '#pricing-step .stand-extras-desc' ).text( 'Includes Leveling Pads and Floor Mounting Brackets' );			

			// Casters
			}else if( casterPrice['price'] ){
				$( '#pricing-step .stand-extras-desc' ).text( 'With Swivel-Lock Casters' );			
			}else{
				$( '#pricing-step .stand-extras-desc' ).text( 'With Leveling Pads' );			
			}

			// Stringers
			if( stringerPrice['price'] ){
				$( '#pricing-step .stand-stringers-desc' ).text( 'Includes stringer to tie stands together.' );
			}else{
				$( '#pricing-step .stand-stringers-desc' ).text( '' );
			}

		}else{
			$( '#pricing-step .stand-none' ).removeClass( 'd-none' );
			$( '#pricing-step .stand-quantity-container' ).addClass( 'd-none' );
			$( '#pricing-step .stand-height-label' ).text( '' );
			$( '#pricing-step .stand-extras-desc' ).text( '' )			
			$( '#pricing-step .stand-stringers-desc' ).text( '' );

		}

	}

	function updateControls( prices ){
		// var prices = calculateControl( $control1.prop( 'checked' ), $control2.prop( 'checked' ), $control3.prop( 'checked' ) )

		var controlCount = 0

		if( $control1.prop( 'checked' ) ){
			$( '#pricing-step .control-container-1' ).removeClass( 'd-none' );
			$( '#pricing-step .control-1-price' ).text( priceFormat( prices['control1'] ) );
			controlCount++;
		}else{
			$( '#pricing-step .control-container-1' ).addClass( 'd-none' );
			$( '#pricing-step .control-1-price' ).text( priceFormat( 0 ) );

		}

		if( $control2.prop( 'checked' ) ){
			$( '#pricing-step .control-container-2' ).removeClass( 'd-none' );
			$( '#pricing-step .control-2-price' ).text( priceFormat( prices['control2'] ) );
			controlCount++;

		}else{
			$( '#pricing-step .control-container-2' ).addClass( 'd-none' );
			$( '#pricing-step .control-2-price' ).text( priceFormat( 0 ) );

		}

		if( $control3.prop( 'checked' ) ){
			$( '#pricing-step .control-container-3' ).removeClass( 'd-none' );
			$( '#pricing-step .control-3-price' ).text( priceFormat( prices['control3'] ) );
			controlCount++;

		}else{
			$( '#pricing-step .control-container-3' ).addClass( 'd-none' );
			$( '#pricing-step .control-3-price' ).text( priceFormat( 0 ) );

		}


		if( controlCount != 0 ){
			$( '#pricing-step .no-control-options' ).addClass( 'd-none' );
		}else{
			$( '#pricing-step .no-control-options' ).removeClass( 'd-none' );

		}




		// Table
		controlCount = 0;

		if( $control1.prop( 'checked' ) ){
			$( '#pricing-step .control-1' ).removeClass( 'd-none' );
			$( '#pricing-step .none-1' ).addClass( 'd-none' );
			controlCount++;
			
		}else{
			$( '#pricing-step .control-1' ).addClass( 'd-none' );
			$( '#pricing-step .none-1' ).removeClass( 'd-none' );
		}

		if( $control2.prop( 'checked' ) ){
			$( '#pricing-step .control-2' ).removeClass( 'd-none' );
			controlCount++;
		}else{
			$( '#pricing-step .control-2' ).addClass( 'd-none' );
		}

		if( $control3.prop( 'checked' ) ){
			$( '#pricing-step .control-3' ).removeClass( 'd-none' );
			controlCount++;
		}else{
			$( '#pricing-step .control-3' ).addClass( 'd-none' );
		}

		if( controlCount != 0 ){
			$( '#pricing-step .none-2' ).addClass( 'd-none' );
		}else{
			$( '#pricing-step .none-2' ).removeClass( 'd-none' );

		}
		
	}

	/**
	 * TODO: Move to backend
	 */
	function updateAccessories(  ){
		var $template = $( '#pricing-step .accessories .template' );
		var total = 0;

		$container = $( '#pricing-step .accessories' );

		$container.children(  ).each( function(  ){
			if( !$( this ).hasClass( 'template' ) ){
				$( this ).remove(  );
			}
		} )

		$( '#accessories-step .accessories-quantity' ).each( function(  ){
			if( $( this ).val(  ) > 0 ){
				var $new = $template.clone(  );
				$new.removeClass( 'template' );

				var $row = $( this ).parents( 'tr' );
				var price = $( '.accessories-price', $row ).text(  );
				price = price.slice( 1, price.length );
				price = parseFloat( price );

				$( '.accessories-part', $new ).text( $( '.accessories-part', $row ).text(  ) );
				$( '.accessories-description', $new ).text( $( '.accessories-desc', $row ).text(  ) );
				$( '.accessories-price', $new ).text( priceFormat( price ) );
				$( '.accessories-quantity', $new ).text( $( this ).val(  ) );

				$container.append( $new );

				total += price * $( this ).val(  );
			}
		} )

		$( '#pricing-step .accessories-total-price' ).text( priceFormat( total ) );


		if( total == 0 ){
			$( '#pricing-step .accessories-container' ).addClass( 'd-none' );	
		}else{
			$( '#pricing-step .accessories-container' ).removeClass( 'd-none' );
		}

		return total;

	}


	function updatePricing( basePrice, prices ){

		$( '#pricing-step .base-price' ).text( priceFormat( Math.round( basePrice ) ) );
		$( '#pricing-step .price-inc1' ).text( prices['priceInc1Percent'] );

		$( '#pricing-step .price-inc1-price' ).text( priceFormat( prices['priceInc1'] ) );


		$( '#pricing-step .price-inc2' ).text( prices['priceInc2Percent'] );

		$( '#pricing-step .price-inc2-price' ).text( priceFormat( prices['priceInc2'] ) );


		$( '#pricing-step .price-packaging' ).text( priceFormat( prices['packagingPrice'] ) );

		$( '#pricing-step .price-list-price' ).text( priceFormat( prices['listPrice'] ) );


		$( '#pricing-step .price-discount' ).text( prices['discount'] );

		$( '#pricing-step .price-yushin-net' ).text( priceFormat( prices['yushinNet'] ) );

		$( '#pricing-step .price-markup' ).text( prices['yushinMarkup'] );

		$( '#pricing-step .price-total' ).text( priceFormat( prices['price'] ) );

	}

	function updateCustomerInformation(  ){
		$( '#pricing-step .customer-notes' ).text( $notes.val(  ) );

		if( $notes.val(  ) === '' ){
			$( '#pricing-step .customer-notes' ).text( 'N/A' );
		}
	}


	async function validateAllForms(  ){
		var isValid = true;

		$( '.step-form' ).each( function(  ){
			if( !this.checkValidity(  ) ){
				isValid = false;
				gotoStep( $( this ).parents( '.step' ).index(  ) );

				return false;
			}

		} )

		if( $beltRows.filter( '.selected' ).length == 0 ){
			isValid = false;
			gotoStep( $( '#sidebar li.belting-step' ).index(  ) );

			return false;
		}

		var motors = await getMotor();



		if( motors == 0 ){
			// var weightOfBelt = getWeightOfBelt( $width.val(  ), $length.data( 'ft-val' ) );
			// var totalForce = getTotalForce( $drive.filter( ':checked' ).val(  ), $opsMode.val(  ), $load.val(  ), $width.val(  ), $length.data( 'ft-val' ) );
			// var horsePower = getHorsePower( $drive.filter( ':checked' ).val(  ), $opsMode.val(  ), $speed.val(  ), $load.val(  ), $width.val(  ), $length.data( 'ft-val' ) );


			alert( 'Your configuration has an invalid motor. Please change the general and drive settings.' );




			gotoStep( 1 );
			isValid = false;
		}

		return isValid;

	}


	function __deprecatedSubmitForm(  ){


		var total = 0;

		$length.data( 'slider-deduct', 0 );

		
		total += updateFramePrice(  );
		
		total += updateSupportRolls(  );

		total += updateMotors(  );
		
		total += updateDrive(  );
		
		total += updateInfeedOutfeed(  );
				
		total += updateBelt(  );
		
		total += updateSideRails(  );
		
		total += updateStands(  );

		
		total += updateAccessories(  );

		total = updatePricing( total );

		total += updateControls(  );

		updateCustomerInformation(  );


		$( '#pricing-step .total-price' ).text( priceFormat( total ) );
	}

	function getMotor(){
		return new Promise(function(resolve, reject){
			$.ajax({
				url: URL_CALCULATE,
				method: 'POST',
				dataType: 'json',
				data: {
					'action'		: 'calculate_motors',
					'drive'			: $width.val(  ),
					'voltage'		: $voltage.val(  ),
					'opsMode'		: $opsMode.val(  ),
					'speedMode'		: $speedMode.val(  ),
					'speed'			: $speed.val(  ),
					'load'			: $load.val(  ),
					'width'			: $width.val(  ),
					'length'		: Math.round($length.data( 'mm-val' ) ),
					'angle'			: $angle.val(  )
				},
				success: resolve,
				error: function(test){
					alert('Woops! There was an error in your request. Please try again or contact our sales team.');
				}
			})

		});
	}

	function getFormData(){
		return {
				'width'					: $width.val(  ),
				'length'				: $length.data( 'mm-val' ),
				'slider'				: $slider.val(  ),
				'drive'					: $drive.filter( ':checked' ).val(  ),
				'speed'					: $speed.val(  ),
				'voltage'				: $voltage.val(  ),
				'opsMode'				: $opsMode.val(  ),
				'speedMode'				: $speedMode.val(  ),
				'load'					: $load.val(  ),
				'angle'					: $angle.val(  ),
				'driveVersion'			: $( ':selected', $driveVersion ).val(  ),
				'driveLocation'			: $driveLocation.val(  ),

				'belt'					: $( '#belt-step .belt-row.selected' ).attr('data-belt-num'),


				'sideRail'				: $sideRail.val(  ),
				'railSystem'			: $sideRailSystem.filter( ':checked' ).val(  ),
				'railHeight'			: $sideRailHeight.val(  ),
				'hasUHMW'				: $sideRailUHMW.prop( 'checked' ),

				'standType'				: $standType.filter( ':checked' ).val(  ),
				'standHeight'			: $standHeight.data( 'mm-val' ),
				'standQuantity'			: $standQuantity.val(  ),
				'hasBrackets'			: $hasLeveling.prop( 'checked' ) ? 1 : 0,
				'hasCasters'			: $hasCasters.prop( 'checked' ) ? 1 : 0,


				'control1'				: $control1.prop( 'checked' ) ? 1 : 0,
				'control2'				: $control2.prop( 'checked' ) ? 1 : 0,
				'control3'				: $control3.prop( 'checked' ) ? 1 : 0,

		};
	}

	function submitForm(  ){
		
		$.ajax({
			url: URL_CALCULATE,
			method: 'POST',
			dataType: 'json',
			data: getFormData(),
			success: function( json ){
				var parts = json['parts'];

				updateFramePrice( parts['frame_price'] );
		
				updateSupportRolls( parts['support_rolls'] );

				updateMotors( parts['motors'] );
				
				updateDrive( parts['drive_version'], parts['drive_drum'], parts['drive_drum_surface'] );
				
				updateInfeedOutfeed( parts['infeed_tail'], parts['infeed_width_vars'], parts['outfeed_tail'], parts['outfeed_tail_vars'], parts['drive_train'] );
						
				updateBelt(  );
				
				updateSideRails( parts['side_rails'] );
				
				updateStands( parts['stands'], parts['stands_leveling'], parts['stands_caster'], parts['stringers'] );

				// NOT AVAILABLE FOR YUSHIN
				// TODO: Migrate to backend
				// updateAccessories(  );

				updatePricing( json['base_price'], json['pricing'] );

				updateControls( json['controls'] );

				updateAccessories(  );

				updateCustomerInformation(  );

				$( '#pricing-step .total-price' ).text( priceFormat( json['total'] ) );
			},
			error: function( json ){
				alert('Woops! There was an error in your request. Please try again or contact our sales team.');

				throw json;
			}
		});
	}

	function fillDefault(  ){
		if( confirm( 'Would you like to fill the fields with default values?' ) ){

			$.ajax({
				url: URL_TEST,
				dataType: 'json',
				success: function(json){

					var {
						lengthUnit = 'in'
					} = json;
					
					// Defaults
					$acceptTerms.prop( 'checked', true );

					$width.val( json.width );
					$length.val( json.length );
					$lengthUnit.val( lengthUnit );

					$slider.val( json.slider );
					$angle.val( json.angle );
					$load.val( json.load );
					$opsMode.val( json.accumulation );


					$( '#conveyor-drive-' + json.drive ).click(  );
					$driveLocation.val( json.driveLocation );
					$driveVersion.val( json.driveVersion );

					
					$beltRows.filter( '[data-belt-num=' + json.belt + ']' ).addClass( 'selected' );



					/**
					 * Not in yushin configurator
					 */

					// $voltage.val( '115' );
					// $speed.val( 60 );
					// $speedMode.val( 'variable' );
					$infeed.val( '1' );


					$sideRail.val( json.sideRails );
					if(json.sideRails != 'none'){
					$( '#conveyor-side-rails-system-' + json.railSystem ).click(  );

						if(json.railSystem == 'sf13')
					$sideRailHeight.val( json.railsHeight ); 

						if(json.sideRails == 'adjustable')
							$sideRailUHMW.prop( 'checked', json.hasUHMW );

					}


					$( '#conveyor-stand-' + json.stands ).click(  );
					if(json.stands == 'leveling'){
						$standHeightUnit.val( json.standsHeightUnit );
						$standHeightUnit.trigger( 'change' );
	
					$standHeight.val( json.standsHeight );
						$standHeight.trigger( 'change' );
	
					$standQuantity.val( json.standsQuantity );

					$hasCasters.prop( 'checked', json.hasCasters );
					$hasLeveling.prop( 'checked', json.hasBrackets );
					}


					// Controls
					$control1.prop( 'checked', json.control1 );
					$control2.prop( 'checked', json.control2 );
					$control3.prop( 'checked', json.control3 );
					

					$width.trigger( 'change' );
					$length.trigger( 'change' );
					$sideRail.trigger( 'change' );


					// Contact
					$contactPref.val( 'Ms.' );
					$contactFirst.val( 'Candice' );
					$contactLast.val( 'Canoso' );
					$company.val( 'Freelancer.com' );
					$address1.val( 'Cartagena Street' );
					$address3.val( 'Las Pinas' );
					$address4.val( 'Metro Manila' );
					$address5.val( '1740' );
					$phone.val( '111 111 1111' );
					$email.val( 'mail@cndce.me' );


					// Menu
					$( '#sidebar li' ).addClass( 'visited finished' );


					updateBeltPrices(  );
				}

			})
		}
	}



	// Ajax
	$.ajax( {
		dataType: 'json',
		url: URL_META,
		success: function( json ){
			data = json;
			console.log( json );
			// Width
			for( var i=0; i<data['conveyorWidth'].length; i++ ){
				var width = data['conveyorWidth'][i];
				var inch = ( width / IN_TO_MM ).toFixed(2);

				$width.append( '<option value="' + width + '">' + width + ' mm / ' + inch + '\"</option>' )
			}
			
			// Length Unit
			$lengthUnit.trigger( 'change' );

			// Stand Height Unit
			$standHeight.trigger( 'change' );
			$standHeightUnit.trigger( 'change' );

			// Belting
			var $beltStep = $( '#belt-step tbody' );
			var $beltTemplate = $( '.template', $beltStep );
			var belt = data['belt'];

			for( var i=0; i < belt['beltNumber'].length; i++ ){
				var $new = $beltTemplate.clone(  );
				$new.removeClass( 'template' );

				// Default Belt
				if( belt['beltNumber'][i] == "460445" )
					$new.addClass( 'input-standard' );


				$( '.belt-num', $new ).text( belt['beltNumber'][i] );
				$( '.belt-material', $new ).text( belt['surfaceMaterial'][i] );
				$( '.belt-color', $new ).text( belt['color'][i] );
				$( '.belt-max-temp', $new ).text( belt['maxTemp'][i] );
				$( '.belt-price-indicator', $new ).text( belt['priceIndicator'][i] );
				$( '.belt-notes', $new ).text( belt['notes'][i] );

				$( '.belt-price', $new ).data( 'piw', belt['piw'][i] );

				if( belt['antistatic'][i] == 'no' )
					$new.addClass( 'antistatic-hidden' );

				if( belt['conductive'][i] == 'no' )
					$new.addClass( 'conductive-hidden' );

				if( belt['fda'][i] == 'no' )
					$new.addClass( 'fda-hidden' );

				if( belt['sharp'][i] == 'no' )
					$new.addClass( 'sharp-hidden' );


				$new.attr( 'data-belt-num', belt['beltNumber'][i] );
				$new.attr( 'data-min-temp', belt['minTemp'][i] );
				$new.attr( 'data-max-temp', belt['maxTemp'][i] );

				$new.attr( 'data-max-angle', belt['maxAngle'][i] );
				$new.attr( 'data-bflex', belt['backFlex'][i] );

				$new.attr( 'data-accumulation', belt['accumulation'][i] );



				$beltStep.append( $new );
			}

			updateBeltPrices(  );

			$beltRows = $( '.belt-row', $beltStep );



			// Accessories
			// NOTE: Accessories eprecated on Yushin
			// var $accessoriesStep = $( '#accessories-step tbody' );
			// var $accessoriesTemplate = $( '.template', $accessoriesStep );
			// var accessories = data['accessories'];

			// for( var i=0; i < accessories['part'].length; i++ ){
			// 	var $new = $accessoriesTemplate.clone(  );
			// 	$new.removeClass( 'template' );

			// 	$( '.accessories-part', $new ).text( accessories['part'][i] );
			// 	$( '.accessories-desc', $new ).text( accessories['description'][i] );
			// 	$( '.accessories-price', $new ).text( priceFormat( accessories['price'][i] ) );

			// 	$accessoriesStep.append( $new );
			// }

			if( isTestMode ){
				console.log( 'TEST MODE' );
				fillDefault(  );
			}




		}
	} )


	// Listeners
	$( 'input, select, textarea', '#steps-container' ).change( function(  ){
		// Error Messages
		if( this.validity.rangeOverflow ){
			$( this ).next( '.invalid-feedback' ).text( 'Please enter a value less than ' + $( this ).attr( 'max' ) );
		}else if( this.validity.rangeUnderflow ){
			$( this ).next( '.invalid-feedback' ).text( 'Please enter a value more than ' + $( this ).attr( 'min' ) );
		}else if( this.validity.valueMissing ){
			$( this ).next( '.invalid-feedback' ).text( 'This is a required field' );
		}
	} )



	$( '#belt-form' ).submit( function( e ){
		if( $( '#belt-step .belt-row.selected' ).length == 0 ){
			alert( 'Select a belt to continue' );

			e.preventDefault(  );
			e.stopPropagation(  );
			e.stopImmediatePropagation(  );

			return false;
		}
	} )

	$( '.step-form' ).submit( function( e ){

		var $this = $( this );

		e.preventDefault(  );
		e.stopPropagation(  );


		if( this.checkValidity(  ) ){
			var $step = $this.parents( '.step' );
			var i = $step.index(  );

			$step.addClass( 'finished' );
			$( $( '#sidebar li' )[i] ).addClass( 'finished' );

			gotoNextStep(  );


		}else{
			alert( 'Please correct errors to continue' );
		}

		$this.addClass( 'was-validated' );
		console.log( 'submitted' );

		
		
	} )


	$( '#restart-btn' ).click( function(  ){
		 $( 'input:not([type="radio"]):not([type="checkbox"]):not(:disabled), select:not(:disabled)' ).val( '' );
		 $lengthUnit.val( 'in' );

		 $( '#belt-step .belt-row.selected' ).removeClass( 'selected' );


		 $( 'input[type="checkbox"]' ).prop( 'checked', false );
		 $( 'input[type="radio"]' ).prop( 'checked', false );

		 // Disabled Input
		 // $voltage.val( '115' );

		 gotoStep( 0 );
		 $( '.step-form' ).removeClass( 'was-validated' );
		 $( '.step' ).removeClass( 'visited finished' );
		 $( '#sidebar li' ).removeClass( 'visited finished' );

		 $( '#sidebar li.active' ).addClass( 'visited' );


	} )

	// $( '.btn-next' ).click( function( e ){

	// 	gotoNextStep(  );

	// } );

	$( '.btn-prev' ).click( function(  ){

		var $step = $( this ).parents( '.step' );


		if( $step.hasClass( 'finished' ) ){
			if( $( '.step-form', $step )[0].checkValidity(  ) ){
				gotoPreviousStep(  );
			}else{
				alert( 'Please correct errors to continue' );
			}
		}else{
			gotoPreviousStep(  );

		}

	} );


	$( '#sidebar li' ).click( function(  ){

		$activeStep = $( '#steps-container .step.active' );
		if( $activeStep.hasClass( 'finished' ) ){
			if( !$( '.step-form', $activeStep )[0].checkValidity(  ) ){
				
				alert( 'Please correct errors to continue' );
						
				return;
			}
		}


		if( $( this ).hasClass( 'visited' ) ){
			var iClick = $( this ).index(  );
			var iActive = $( '#sidebar .active' ).index(  );

			gotoStep( iClick );
		}
		

	} )


	$( '#belt-step' ).on( 'click', '.belt-row', function(  ){
		$( '.belt-row.selected' ).removeClass( 'selected' );
		$( this ).addClass( 'selected' );
	} )

	function updateLengthMinMax(  ){
		var $selectedUnit = $( ':selected', $lengthUnit );
		var $lengthLabel = $( 'label[for="conveyor-length"]' );

		var widthmm = $width.val(  );

		// TODO: Confirm no more absolute minimum width
		// var minmm = Math.max( widthmm * 2, $length.data( 'abs-min-ft' )	);
		var minmm = widthmm * 2;

		var min = minmm / $selectedUnit.data( 'to-mm' );


		var maxmm = $length.data( 'max-mm' );
		var max = maxmm / $selectedUnit.data( 'to-mm' );

		$length.data( 'min-mm', minmm );
		$length.attr( 'min', min );
		$length.attr( 'max', max );

		$( '.min-value', $lengthLabel ).text( 'Min Value: ' + min.toFixed( $selectedUnit.data( 'decimal' ) ) + ' ' + $selectedUnit.val(  ) );
		$( '.max-value', $lengthLabel ).text( 'Max Value: ' + max.toFixed( $selectedUnit.data( 'decimal' ) ) + ' ' + $selectedUnit.val(  ) );
	}


	$width.change( function(  ){
		// Belt
		// updateBeltPrices(  );

		if( $width.val(  ) <= 100 ){
			$( '#steps-container' ).addClass( 'no-telescoping-stand' );
			$standType.prop( 'checked', false );
		}else{
			$( '#steps-container' ).removeClass( 'no-telescoping-stand' );
		}

		updateLengthMinMax(  );
		$length.trigger( 'change' );
	} )

	$length.change( function(  ){
		


		// Update mm-val
		$length.data( 'mm-val', Math.round($length.val(  ) * $( ':selected', $lengthUnit ).data( 'to-mm' )) );


		// Update recommended stand quantity
		$( '#stand-quantity-input .stand-recommended-quantity' ).text( Math.ceil(  $length.data( 'mm-val' )  / 2500 ) + 1 );


		// Belt
		updateBeltPrices(  );


	} )

	$lengthUnit.change( function( e ){
		$selectedUnit = $(':selected', $lengthUnit);
		var tomm = $selectedUnit.data( 'to-mm' );
		var mmVal = $length.data( 'mm-val' );

		var val = mmVal / tomm;


		$length.val( val.toFixed( $selectedUnit.data( 'decimal' ) ) );
		$length.data( 'mm-val', mmVal );

		updateLengthMinMax(  );
		$length.trigger( 'change' );
	} )



	$drive.change( function(  ){
		if( $( this ).val(  ) == 'center' ){
			$( '#steps-container' ).addClass( 'center-drive' );
			$( '#steps-container' ).removeClass( 'head-drive' );

			$outfeed.prop( 'required', true );

			$( '.center-drive-hidden', $driveVersion ).prop( 'disabled', true );
			$( '.head-drive-hidden', $driveVersion ).prop( 'disabled', false );

		}else{
			$( '#steps-container' ).addClass( 'head-drive' );
			$( '#steps-container' ).removeClass( 'center-drive' );

			$outfeed.prop( 'required', false );

			$( '.center-drive-hidden', $driveVersion ).prop( 'disabled', false );
			$( '.head-drive-hidden', $driveVersion ).prop( 'disabled', true );


		}


		$driveVersion.val( '' );
		$outfeed.val( '' );

	} );

	$driveVersion.change( function(  ){

		if( $( this ).data( 'drive-value' ) == 'standard' && $drive.filter( ':checked' ).val(  ) == 'head' ){
			$( '#steps-container' ).addClass( 'head-standard' );
		}else{
			$( '#steps-container' ).removeClass( 'head-standard' );
		}

		updateBeltPrices();

		$voltage.val( '115' );
	} )


	$standType.change( function(  ){
		if( $( this ).val(  ) == 'telescoping' ){
			$( '#steps-container' ).addClass( 'telescoping-selected' );
			$hasCasters.prop( 'checked', false );
		}else{
			$( '#steps-container' ).removeClass( 'telescoping-selected' );
		}


		if( $( this ).val(  ) == 'none' ){
			$( '#steps-container' ).addClass( 'no-stands' );
			$standHeight.prop( 'required', false );
			$standHeight.val( '' );
			$standQuantity.prop( 'required', false );
			$standHeightUnit.prop( 'required', false );
		}else{
			$( '#steps-container' ).removeClass( 'no-stands' );
			$standHeight.prop( 'required', true );
			$standQuantity.prop( 'required', true );

		}

	} )

	$standHeight.change( function(  ){
		$selectedUnit = $( ':selected', $standHeightUnit );


		$standHeight.data( 'mm-val', Math.round($standHeight.val(  ) * $selectedUnit.data( 'to-mm' )) );
	} )

	$standHeightUnit.change( function(  ){
		$selectedUnit = $(':selected', this);
		
		// Update min/max of stand height
		$standHeight.attr( 'min', $selectedUnit.data( 'min' )  );
		$standHeight.attr( 'max', $selectedUnit.data('max') );

		$( '#stand-height-min-value' ).text( $selectedUnit.data( 'min-label' ) );
		$( '#stand-height-max-value' ).text( $selectedUnit.data( 'max-label' ) );

		// Update value of stand height input
		$standHeight.val( ($standHeight.data( 'mm-val' ) / $selectedUnit.data( 'to-mm' )).toFixed( $selectedUnit.data( 'decimal' ) ) );
	} )


	$sideRail.change( function(  ){
		var $this = $( this );
		var $container;

		// Reset required
		$( '.sub-required', '#side-rails-step .side-rail-options' ).prop( 'required', false );

		// Update classes
		if( $this.val(  ) == 'fixed' ){
			$( '#steps-container' ).addClass( 'fixed-rails-selected' );
			$( '#steps-container' ).removeClass( 'adjustable-rails-selected' );
			$container = $( '#fixed-rails-options' );

		}else if( $this.val(  ) == 'adjustable' ){
			$( '#steps-container' ).addClass( 'adjustable-rails-selected' );
			$( '#steps-container' ).removeClass( 'fixed-rails-selected' );
			$container = $( '#adjustable-rails-options' );

		}else{
			$( '#steps-container' ).removeClass( 'fixed-rails-selected' );
			$( '#steps-container' ).removeClass( 'adjustable-rails-selected' );
		}


		// Add required
		if( $container != undefined ){
			$( '.sub-required', $container ).prop( 'required', true );
		}
	} )

	$sideRailSystem.change( function(  ){
		var $this = $( this );

		if( $this.val(  ) == 'sf71' ){
			$sideRailHeight.val( 50 );
			$sideRailHeight.prop( 'disabled', true );

			$( '.form-text', '#conveyor-side-rails-height-container' ).addClass( 'd-none' );
		}else if( $this.val(  ) == 'sf13' ){
			$sideRailHeight.val( '' );
			$sideRailHeight.prop( 'disabled', false );

			$( '.form-text', '#conveyor-side-rails-height-container' ).removeClass( 'd-none' );

		}
	} )



	// Belt - Duplicate change call
	$drive.change( function(  ){

		$beltRows.removeClass( 'bflex-hidden' )
		if( $( this ).val(  ) == 'center' ){

			$hide = $beltRows.filter( function(  ){
				var $belt = $( this );
				if( $belt.data( 'bflex' ) <= 40 )
					return false;

				return true;
			} )

			$hide.addClass( 'bflex-hidden' );

		}



		$beltRows.removeClass( 'selected' );

	} )

	$angle.change( function(  ){

		var val = $angle.val(  );

		$beltRows.removeClass( 'selected' );

		if( val == '' )
			return;

		var $hide = $beltRows.filter( function(  ){
			var $belt = $( this );

			if( val <= $belt.data( 'max-angle' ) )
				return false;

			return true;
		} )

		$beltRows.removeClass( 'angle-hidden' );
		$hide.addClass( 'angle-hidden' )

	} )


	$beltFilters.change( function(  ){
		var $this = $( this );

		$beltRows.removeClass( 'selected' );

		// ID filter
		if( $this.attr( 'id' ) == 'conveyor-belt-temp' ){
			if( $this.is( ':checked' ) ){
				$( '#belt-step .max-temp-hidden' ).removeClass( 'd-none' );
			}else{
				$( '#belt-step .max-temp-hidden' ).addClass( 'd-none' );
			}

			$beltMaxTemp.val( '' );
			$beltMaxTemp.trigger( 'change' );

		}else{

			var filter = $this.data( 'belt-filter' );

			if( $this.is( ':checked' ) ){
				$( '#belt-step' ).addClass( filter );
			}else{
				$( '#belt-step' ).removeClass( filter );
			}
		}
	} )

	$beltMaxTemp.change( function(  ){

		var val = $beltMaxTemp.val(  );

		$beltRows.removeClass( 'temp-hidden' );


		if( val == '' ){
			return;
		}

		var $hide = $beltRows.filter( function(  ){
			var $belt = $( this );

			if( $belt.data( 'max-temp' ) >= val && $belt.data( 'min-temp' ) <= val )
				return false;

			return true;
		} );


		$hide.addClass( 'temp-hidden' );
	} )



	// Belt Accumulation
	$opsMode.change( function(  ){
		$beltRows.removeClass( 'accumulation-hidden' );

		if( $opsMode.val(  ) == 'accumulating' ){
			var loadkg = $load.val(  ) / KG_TO_LBS;


			$hide = $beltRows.filter( function(  ){
				var $belt = $( this );

				if( $belt.data( 'accumulation' ) == 'no' )
					return true;

				if( $belt.data( 'accumulation' ) == 'light' && loadkg > 5 )
					return true;

				return false;
			} );

			$hide.addClass( 'accumulation-hidden' );
		}

		
	} )
	$load.change( function(  ){
		if( $opsMode.val(  ) == 'accumulating' ){
			$opsMode.trigger( 'change' );
		}
	} )




	$hasCasters.change( function(  ){
		if( $hasCasters.is( ':checked' ) )
			$hasLeveling.prop( 'checked', false );
	} )

	$hasLeveling.change( function(  ){
		if( $hasLeveling.is( ':checked' ) )
			$hasCasters.prop( 'checked', false );
	} )



	// UI
	$( window ).scroll( function(  ){

		if( $( window ).scrollTop(  ) >= $( '#content' ).offset(  ).top ){
			$aboutContainer.css( {
				top: 0,
				left: $aboutContainer.offset(  ).left + 'px',
				width: $aboutContainer.outerWidth(  )
			} )
			$( 'body' ).addClass( 'past-header' );
		}else{
			$aboutContainer.css( {
				top: '',
				left: '',
				width: ''
			} )
			$( 'body' ).removeClass( 'past-header' );
		}
	} )


	// PDF
	function preGeneratePDF(  ){

		// GENERATE PDF RIGHT AWAY
		// generatePDF( '00' );


		// GET QUOTE NUMBER FIRST
		var dateNow = new Date(  );

		var formatQuoteNum = 'CON'
			+ ( dateNow.getFullYear(  ) % 100 )
			+ ( '0' + ( dateNow.getMonth(  ) +　1 ) ).slice( -2 )
			+ ( '0' + dateNow.getDate(  ) ).slice( -2 )
			+ '-';


		var data = {
			'format_quote_num': formatQuoteNum,
			'first_name': $contactFirst.val(  ),
			'last_name': $contactLast.val(  ),
			'phone': $phone.val(  ),
			'email': $email.val(  )
		}


		$.ajax( {
			url: URL_API,
			data: data,
			method: 'POST',
			success: function( num ){
				generatePDF( num );
			},
			error: function(  ){
				generatePDF( formatQuoteNum + '00' );
			}
		} )

		$('body').addClass('cndce-waiting');

	}

	function generatePDF( quoteNum ){
		var dateNow = new Date(  );
		var dateNowString = dateNow.toLocaleDateString( 'en-us', {month: 'long', day:'numeric', year:'numeric'} );
		dateNowString = dateNowString.replace(/[^ -~]/g,'');
		
		if( !quoteNum )
			quoteNum = '00';


		var formatQuoteNum = quoteNum;

		var headerTableLayout = {
			paddingLeft: function(){return 0;},
			paddingBottom: function(){return 0;}
		}

		var pdf = {
			header:[
				{
					image: logoData,
					width: 612,
					margin: [0, 17]
				}
			],
			footer: [
				{
					text: 'Yushin America, Inc. 35 Kenney Drive, Cranston, RI 02920 | Tel: (401) 463-1800 | Email: SalesInfo@yushin.com',
					style: 'footer'
				}
			],
			content: [

				{
					columnGap: 30,
					noWrap: true,
					columns: [
						/* Left Column */
						{
							fontSize: 11,
							width: '63%',
							stack: [
								{
									text: 'Customer Information',
									style: 'h4',
									decoration: 'underline'
								},
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '*'],
										body: [[
											{
												text: 'Name: ',
												border: [false]
											},
											{
												text: $contactFirst.val() + ' ' + $contactLast.val(),
												border: [false, false, false, true]
											}
										]]
									}
								},
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '*'],
										body: [[
											{
												text: 'Company: ',
												border: [false]
											},
											{
												text: $company.val(),
												border: [false, false, false, true]
											}
										]]
									}
								},
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '*'],
										body: [[
											{
												text: 'Address Line 1: ',
												border: [false]
											},
											{
												text: $address1.val(),
												border: [false, false, false, true]
											}
										]]
									}
								},
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '*'],
										body: [[
											{
												text: 'Address Line 2: ',
												border: [false]
											},
											{
												text: $address2.val(),
												border: [false, false, false, true]
											}
										]]
									}
								},
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '30%', 'auto', '*', 'auto', '10%'],
										body: [[
											{
												text: 'City: ',
												border: [false]
											},
											{
												text: $address3.val(),
												border: [false, false, false, true]
											},
											{
												text: 'State: ',
												border: [false]
											},
											{
												text: $address4.val(),
												border: [false, false, false, true]
											},
											{
												text: 'Zip Code: ',
												border: [false]
											},
											{
												text: $address5.val(),
												border: [false, false, false, true]
											}
										]]
									}
								},
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '*'],
										body: [[
											{
												text: 'Phone: ',
												border: [false]
											},
											{
												text: $phone.val(),
												border: [false, false, false, true]
											}
										]]
									}
								},
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '*'],
										body: [[
											{
												text: 'Email: ',
												border: [false]
											},
											{
												text: $email.val(),
												border: [false, false, false, true]
											}
										]]
									}
								}
							]
						},


						/* Right Column */
						{
							stack: [
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '*'],
										body: [[
											{
												text: 'Date: ',
												style: 'b',
												border: [false]
											},
											{
												text: dateNowString,
												border: [false, false, false, true]
											}
										]]
									}
								},
								{
									layout: headerTableLayout,
									table: {
										widths: ['auto', '*'],
										body: [[
											{
												text: 'Quote#: ',
												style: 'b',
												border: [false]
											},
											{
												text: formatQuoteNum,
												border: [false, false, false, true]
											}
										]]
									}
								}
							]
						},


						/* Right Space */
						{
							width: '6%',
							text: ''
						}
					]
				},
				{
					text: '\n\n',
				},
			    {
			    	text: [
			    		'Dear ' + $contactPref.val(  ) + ' ',
			    		{
			    			text: $contactLast.val(  ) + ',\n\n',
			    			style: 'b'
			    		},
			    		'Thank you for your interest in our Belt Conveyors. As per your request, we are pleased to submit the following proposal:\n\n\n',
			    		{
			    			text:
			    				'GUF-P2000 '
			    				+ (($control1.is(':checked')) ? 'Indexing Conveyor' : 'Continuous Run Conveyor')
			    			,
			    			style: 'h4',
			    			decoration: 'underline'
			    		},
			    		{
			    			text: '\n\n'
			    		}
			    	]
			    }
			],
			styles: {
				h1: {
			        fontSize: 22,
			        bold: true
			    },
			    h2: {
			    	fontSize: 16,
			    	bold: true
			    },
			    h3: {
			        fontSize: 14,
			        bold: true
			    },
			    h4: {
			    	fontSize: 12,
			    	bold: true
			    },
			    b: {
			        bold: true
			    },
			    desc: {
			        margin: [30, 0, 0, 0]
			    },
			    footer: {
			    	alignment: 'center',
			    	fontSize: 9,
					color: '#041e42',
					bold: true
			    },
			    pageNum: {
			    	bold: true,
			    	fontSize: 10
			    },
			    endTitle: {
			    	decoration: 'underline',
			    	fontSize: 10,
			    	lineHeight: 1,
			    	bold: true
			    },
			    endText: {
			    	fontSize: 10,
			    	lineHeight: 1
			    }
			},
			pageMargins: [35, 80, 35, 35],
			pageSize: 'LETTER'
		};


		// Add Table
		var isHiddenPrices = $( 'body' ).hasClass( 'hidden-prices' );

		var $tables;

		if( isHiddenPrices ){
			$tables = $( '#pricing-step table.pdf-table tbody' );
		}else{
			$tables = $( '#pricing-step div.pdf-table:not(.d-none)' );
		}

		for( var i=0; i < $tables.length; i++ ){
			var $table = $( $tables[i] );
			var $children = $table.children(  );

			var table = {
				widths: ['*', 100],
				body: []
			}

			if( isHiddenPrices ){
				table.widths = [ 150, '*' ];
			}

			var body = table.body;

			for( var j=0; j < $children.length; j++ ){
				var $child = $( $children[j] );


				parseText( $child, body );				
			}

			var hLineWidth, vLineWidth;
			if( $table.parent( 'table' ).hasClass( 'end-price' ) ){
				hLineWidth = function( j, node ){
		    		return ( j === node.table.body.length ) ? 1 : 0;
				},

				vLineWidth = function( j, node ){
					return 0;
				}
			}else if( $table.parent( 'table' ).hasClass( 'spacer' ) ){
				hLineWidth = function( j, node ){
					return 0;
				}

				vLineWidth = function( j, node ){
					return 0;
				}


			}else{
				hLineWidth = function( j, node ){
		    		return ( j === 0 || j === node.table.body.length ) ? 1 : 0;
				},

				vLineWidth = function( j, node ){
					return ( j === 0 || j === node.table.widths.length ) ? 1 : 0;
				}
			}

			pdf.content.push( {
				table: table, 
				margin: [0, 0, 0, ($table.data('margin-bottom')) ? $table.data('margin-bottom') : 15],
				layout: {
				    hLineWidth: hLineWidth,
				    vLineWidth: vLineWidth
				}
			} );
		}

		// Add End Letter
		pdf.content.push({
			stack: [
				'\n',
				'Thank you for the opportunity to provide your company with our proposal.\n\n',
				'A Yushin representative will contact you to discuss your project and answer any questions you may have. You can also contact our Sales Department at Salesinfo@yushin.com.\n\n',
				'If you would like to place an order, submit your purchase order by e-mail to orderinfo@yushin.com or fax to 1-877-RI-Robot (1-877-747-6268).\n\n',
				'We look forward to working with you and your company.\n\n',
				
				'Sincerely,',
				'Yushin America, Inc.'
			],
			lineHeight: 1.1,
			margin: [0, 0, 0, 75]
		})



		// Add End Contents
		pdf.content.push({
			text: 'TERMS AND CONDITIONS OF SALE',
			style: 'h3',
			alignment: 'center',
			color: '#041e42',
			margin: [0, 0, 0, 10]
		})

		pdf.content.push( {
			text: 'General Shipping Terms and Conditions',
			style: 'endTitle'
		} );


		pdf.content.push( {
			ul: [
				'Standard delivery 2 to 3 weeks ARO.',
				'Delivery lead times do not include transit time.',
				'Conveyors are shipped via best way truck (freight charges prepaid and added) unless otherwise specified by the customer on the Purchase Order.',
				'Conveyors are shipped assembled, in most compact position, unless otherwise specified.',
				'Approval drawings may be required or requested. Stated lead times do not begin until after receipt of approved prints by Yushin.',
				'Shipping lead times are subject to quantity and/or production capacity at time of order.'
			],
			style: 'endText',
			margin: [40, 0, 0, 0]
		} );

		pdf.content.push( {
			text: '\nGeneral Notes',
			style: 'endTitle'
		} );


		pdf.content.push( {
			ul: [
				'All items not specifically called out as included in this proposal are NOT included.',
				'Any changes to this quotation (i.e. belt material, length, motor type, speed, etc.) will require a revised quotation prior to ordering.'
			],
			style: 'endText',
			margin: [40, 0, 0, 0]
		} );

		pdf.content.push( {
			text: '\nPayment Terms (U.S. and PR): ', 
			style: 'endTitle'
		} )

		pdf.content.push( {
			text: 'Under $10,000 - Net 30. Over $10,000 - 50% upon receipt of order, 50% Net 30\n',
			style: 'endText',
			margin: [40, 0, 0, 0]
		} )

		pdf.content.push( {
			text: 'Payment Terms (International): ', 
			style: 'endTitle'
		} )


		pdf.content.push( {
			text: '50% upon receipt of order, 50% prior to shipping\n',
			style: 'endText',
			margin: [40, 0, 0, 0]
		} );

		pdf.content.push( {
			text: '\nPayment Conditions',
			style: 'endTitle'
		} );

		pdf.content.push( {
			ul: [
				'Purchase Orders must be issued to Yushin America, Inc. All remittances must be paid in U.S. currency.\n',
				'If funds are to be drawing from a foreign source (outside the U.S.), payments must be wired to our banking institution by electronic wire transfer.\n',
				'Invoices not paid within terms may be subject to a 1.5% interest retroactive from the  date (18% annually) and any collection and legal fees incurred.\n',
				'Payment terms are based on approved credit.\n',
				'Prices are firm for 30 days.\n',
				'Prices do not include any provision for state or local taxes unless otherwise stated.\n',
				'Cancellation of purchase order(s) is subject to cancellation fees.\n'
			],
			style: 'endText',
			margin: [40, 0, 0, 0]
		} );

		pdf.content.push( {
			text: '\nPurchase Money Security Interest:',
			style: 'endTitle'
		} );

		pdf.content.push( {
			text: 'Yushin America, Inc. (Seller) hereby reserves the right to file a UCC-01 Financing Statement in order to secure an interest in the Machinery hereafter aquired by the Buyer for which payment in full has not yet been received. Buyer shall join with Seller in excecuting one or more financing statements pursuant to the Uniform Commercial Code in force in the Buyer\'s principal place of business in form satisfactory to the Seller to evidence the Seller\'s security interest in the Machinery. The security interest in the Machinery shall terminate upon receipt of payment in full of the purchase price of the order.\n',
			style: 'endText'
		} );

		pdf.content.push( {
			text: '\nF.O.B. Cranston RI, or Shipping Point (as described within)',
			style: 'endTitle'
		} );

		pdf.content.push( {
			text: [
				'\n',
				'Actual deliveries will be determined when an order is received and will be based on current work load and after receipt of full information required as stated in the body of this quote.\n\n',
				'An air-ride carrier must be used for all equipment shipments from the point of origin to the customer\'s facility (this includes all transfers made at a shipping company\'s terminal. If a customer-specified carrier does not provide this service, Yushin America will reroute the equipment as necessary.\n\n',
				'If a customer-specified carrier does not arrive at YAI within 24 hours of being contacted for equipment pickup, a $40 storage fee per day, per robot may be assesed.\n\n',
				'Unless customer specifies and/or has included freight in their Purchase Order, freight will be added to the shipping invoice and must be paid in accordance with the terms of that invoice. Freight terms are stated on the Order Acknowledgement.'
			],
			style: 'endText',
			italics: true
		} );



		var pdfFile = pdfMake.createPdf( pdf );

		pdfFile.getBlob( function( blob ){
			// isRebound - if quoteNum had an error and has a value of 00
			sendMail( blob, pdfFile, quoteNum == '00' );

		} )


	}


	/**
	 * TODO!!!!
	 * Clean up. Transfer PDF generation to PHP with 
	 * one server call only.
	 * 
	 * Currenly, system calls generateQuoteNum before
	 * generating PDF on the client side, then calling
	 * mail endpoint with PDF attachment. (2 server calls)
	 */
	function sendMail( pdf, pdfFile, isRebound ){
		var formData = new FormData(  );
		formData.append( 'file', pdf, 'GUF-P2000_Price_Quote.pdf' );

		if( !isRebound )
			formData.append( 'email_to', $email.val(  ) );

		$.ajax( {
			url: URL_MAIL,
			data: formData,
			processData: false,
			contentType: false,
			type: 'POST',
			success: function( data ){

				// alert(isRebound);
				if( isRebound ){
					alert( 'Thank you for your request. Our Sales Team will contact you shortly with your Quote information' );

					if( isTestMode ){
						pdfFile.download( 'GUF-P2000_Price_Quote.pdf' );
					}

				}else{
					pdfFile.download( 'GUF-P2000_Price_Quote.pdf' );
				}


			},
			error: function(){
				alert("Oops! Something went wrong. Please try again.");
			},
			complete: function(){
				$('body').removeClass('cndce-waiting');
			}
		} )
	}

function parseText( $child, body ){
	if( $child.hasClass( 'd-none' ) || $child.hasClass( 'template' ) || $child.css( 'display' ) === 'none' )
		return;

	if( $child.is( '.end-price-tr' ) ){

		var row = [];

		row.push( {
			text: $( 'th', $child ).text(  ),
			style: 'b'
		} );

		row.push( {
			text: $( 'td > span', $child ).text(  ),
			style: 'b',
			alignment: 'right',
			margin: [0, 0, 20, 0]
		} )

		body.push( row );


	}else if( $child.is( 'tr' ) ){

		var row = [];

		row.push( {
			text: $( 'th', $child ).text(  ),
			style: 'b'
		} );

		row.push( {
			text: $( 'td > :visible', $child ).text(  ),
			style: 'desc'
		} )

		// console.log( 'tset', $( 'td :visible', $child ) );

		body.push( row );

	}else if( $child.is( 'h3' ) ){
		var row = [];

		var isPriceHidden = $( 'body' ).hasClass( 'hidden-prices' );
		var text = $child.text(  );

		if( isPriceHidden && $child.hasClass( 'show-price' ) ){
			// row.push( {text: $child.siblings( '.price-top' ).find( 'span' ).text(  ), style: 'h3'} );
			text += ": ";
			text += $child.siblings( '.price-top' ).find( 'span' ).text(  );
		}


		row.push( {text: text, style: 'h3'} );

		if( !isPriceHidden ){
			row.push( {text: $child.siblings( '.price-top' ).find( 'span' ).text(  ), style: 'h3'} );

		}

		body.push( row );


	}else if( $child.is( '.pdf-subtext' ) ){
		if( $child.text(  ) != '' ){
			var row = [];
			row.push( {text: $child.text(  ), style: 'desc'} );

			if( !$( 'body' ).hasClass( 'hidden-prices' ) )
				row.push( '' );

			body.push( row );	
		}
		
	}else if( $child.is( 'h6' ) ){
		var row = [];
		row.push( {text: $child.text(  ), style: 'b'} );

		if( !$( 'body' ).hasClass( 'hidden-prices' ) ){
			row.push( {text: $child.siblings( '.price-second' ).find( 'span' ).text(  ), style: 'h3'} );
		}else{
			// row.push( {text: ''} );
		}

		body.push( row );
	}else if( $child.is( '.pdf-container' ) ){
		var $grandchildren = $child.children(  );

		for( var i=0; i < $grandchildren.length; i++ ){
			parseText( $( $grandchildren[i] ), body );
		}
	}

	}
	
	window.generatePDF = preGeneratePDF;

} )



