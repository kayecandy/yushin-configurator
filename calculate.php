<?php

    define('FT_TO_M', 0.3048);
    define('FT_TO_MM', 304.8);
    define('FT_TO_IN', 12);

    define('IN_TO_MM', 25.4);

    define('KG_TO_LBS', 2.2);

    define('DEG_TO_RAD', M_PI / 180);

    define('MPM_TO_FPM', 3.2808);


    $DATA = json_decode(file_get_contents('data.json'), true);


    function validate_isset($paramArray = [], $request = []){
        if(empty($request))
            $request = $_POST;

        // print_r($request);

        foreach ($paramArray as $paramKey) {
            if(!isset($request[$paramKey])){
                header('HTTP/1.1 400 Bad Request');
                header('Content-Type: application/json; charset=UTF-8');
                die(json_encode(array('message' => 'Invalid parameters', 'code' => 400)));
            }
        }

    }

    // GET FUNCTIONS
    function __get_cpt( $label, $isCPT, $widthmm ){
		if( $isCPT )
			return $label;

		$widthmm = round( $widthmm );

		if( $widthmm > 99 )
			return $label . '.0' . $widthmm;

		return $label . '.00' . $widthmm;
	}

    function __get_drive_drum_option( $drive, $driveVersion ){

		if( $drive == 'head' && $driveVersion != 'AW' )
			return 1;

		if( $drive == 'head' && $driveVersion == 'AW' )
			return 2;

		if( $drive == 'center' )
			return 3;
	}

    function __get_drive_drum_price( $driveDrum ){
		$driveDrum['price'] = __get_part( $driveDrum['labelBOM'] )['price'];

		return $driveDrum;
	}

    function __get_drive_price( $drive ){
		$drive['price'] = [
			'drive'             => __get_part( $drive['labelBOM'] )['price'],
			'driveWidthVars'    => __get_part( $drive['labelWidthVars'] )['price']
        ];

		return $drive;
	}

	function __get_friction( $drive ){
		if( $drive == 'head' )
			return 0.3;

		return 0.7;
	}

    function __get_infeed_tail_price( $infeedTail ){
		$infeedTail['price'] = __get_part( $infeedTail['labelBOM'] )['price'];

		return $infeedTail;
	}


    function __get_is_plate_heavy( $driveVersion, $quote16 ){
		return $driveVersion == 'AC' && $quote16 == 3;
	}

    function __get_is_bodine( $driveManufacturer, $adapterPlate ){
		return ( $driveManufacturer == 'Bodine' || $driveManufacturer == 'Baldor' )
			&& ( $adapterPlate === 0 || $adapterPlate == '' );
	}

    function __get_is_lagged_drive_drum( $isSteelDriveDrum ){
		return !$isSteelDriveDrum;
	}

    function __get_is_steel_drive_drum( $drive, $load, $speed ){
		$loadkg = $load /= KG_TO_LBS;
		$speedmpm = $speed /= MPM_TO_FPM;

		if( $drive == 'head' && $loadkg > 75 )
			return false;

		if( $drive == 'center' && $loadkg > 30 )
			return false;

		if( $speedmpm > 80 )
			return false;

		return true;
	}

    function __get_motor_drive_drum( $drive ){
		if( $drive == 'head' )
			return 52;

		return 62;
	}
	function __get_motor_speed( $driveDrum, $speedmpm ){
		return $speedmpm / ( ( $driveDrum/1000 ) * M_PI );
	}
	function __get_motor_power( $drumEfficiency, $motorEfficiency, $safetyFactor, $totalForce, $speedmpm ){

		// Motor Power Requirement
		$power = $totalForce * $speedmpm / 60;


		// Multiply for drum efficacy
		$power /= $drumEfficiency;


		// Multiply for motor efficiency
		$power /= $motorEfficiency;


		// Multiply for safety factor
		$power *= $safetyFactor;


		return $power * 0.001341022;
	}
	function __get_motor_price( $motor ){
		$motor['price'] = [
			'motor'			=> __get_part( $motor['modelOur'] )['price'],
			'adapterPlate'	=> __get_part( $motor['adapterPlateOur'] )['price'],
			'terminalBox'	=> __get_part( $motor['terminalBox'] )['price'],
			'capacitor'		=> __get_part( $motor['capacitor'] )['price'],
			'speedControl'	=> __get_part( $motor['speedControlOur'] )['price'],
			'hpResistor'	=> __get_part( $motor['hpResistor'] )['price'],
			'armatureFuse'	=> __get_part( $motor['armatureFuse'] )['price'] 
		];

		return $motor;
	}
	function __get_motor_torque( $drumEfficiency, $motorEfficiency, $safetyFactor, $totalForce, $driveDrum ){
		// Multiply by drum radius
		$torque = $totalForce * $driveDrum / 2000;

		// Multiply for drum efficacy
		$torque /= $drumEfficiency;

		// Multiply for motor efficiency
		$torque /= $motorEfficiency;

		// Multiply for safety factor
		$torque *= $safetyFactor;

		return $torque * 8.850748;
	}

    function __get_part( $part ){
        global $DATA;

		$parts = $DATA['parts'];

		if( $part === 0 || $part == '' ){
			return [
				'part'  => 0,
				'price' => 0
            ];
		}

		for( $i=0; $i < sizeof($parts['part']); $i++ ){
			if( $part == $parts['part'][$i] ){
				return [
					'part'          => $part,
					'description'   => $parts['description'][$i],
					'price'         => $parts['price'][$i]
                ];
			}	
		}

		return null;
	}

    function __get_properties( $data, $index ){
		$properties = array_keys( $data );
		$obj = [];

		for( $i=0; $i < sizeof($properties); $i++ ){
			$obj[$properties[$i]] = $data[$properties[$i]][$index];
		}

		return $obj;
	}

	function __get_speed_range( $motorSpeed, $speedMode ){
		global $DATA;

		$speedRange = $DATA['calculations']['speedRange'][$speedMode];

		$returnRange = [];

		for( $i=0; $i < sizeof($speedRange); $i++ ){
			array_push($returnRange, [
				'min'	=> $motorSpeed * $speedRange[$i]['min'], 
				'max'	=> $motorSpeed * $speedRange[$i]['max']
			]);
		}

		return $returnRange;
	}

	function __get_total_force( $beltWeight, $frictionFactor, $loadkg, $angle, $opsMode ){
		$angleRad = $angle * DEG_TO_RAD;

		$totalForce = 0;

		// Force due to friction
		$totalForce += ( $loadkg + $beltWeight ) * 9.81 * cos( $angleRad ) * $frictionFactor;

		// Force due to incline
		$totalForce += $loadkg * 9.81 * sin( $angleRad );


		if( $opsMode == 'accumulating' ){
			// Force due to accumulation
			$totalForce= $loadkg * 9.81 * cos( $angleRad ) * 0.5;
		}


		return $totalForce;
	}

	function __get_weight_of_belt( $length, $width, $beltWeight ){
		$lengthm = $length * FT_TO_M;
		$widthmm = round( $width * IN_TO_MM );


		return ( ( $lengthm * 2 ) + 0.14 ) * ( $widthmm/1000 ) * $beltWeight;
	}

    // TEST FUNCTIONS
    function __test_drive( $drive, $isPlateHeavy, $isBodine, $isASAbove, $isStainlessSteelDrums, $isVGuidedDrums, $widthmm, $driveVersion, $driveShafts, $driveLocation ){


		if( $drive['version'] != $driveVersion )
			return false;

		if( $drive['maxShafts'] < $driveShafts )
			return false;

		if( $drive['minBB'] > $widthmm || $drive['maxBB'] < $widthmm )
			return false;
		
		if( $drive['plateHeavy'] != $isPlateHeavy )
			return false;

		if( $drive['location'] != '' && $drive['location'] != 0 )
			if( $drive['location'] != $driveLocation )
				return false;

		if( $drive['bodine'] != $isBodine && $driveVersion != 'AA')
			return false;
		
		if( $drive['above'] != $isASAbove )
			return false;

		if( $drive['SS'] != $isStainlessSteelDrums )
			return false;

		if( $drive['V'] != $isVGuidedDrums )
			return false;


		return true;
	}

    function __test_drive_drum( $driveDrum, $driveDrumOption, $isSteelDriveDrum, $isLaggedDriveDrum, $isStainlessSteelDrums, $isVGuidedDrums, $widthmm ){

		if( $driveDrum['drumOptions'] != $driveDrumOption )
			return false;

		if( $driveDrum['minBB'] > $widthmm || $driveDrum['maxBB'] < $widthmm )
			return false;

		if( $driveDrum['steel'] != $isSteelDriveDrum )
			return false;

		if( $driveDrum['lagged'] != $isLaggedDriveDrum )
			return false;

		if( $driveDrum['SS'] != $isStainlessSteelDrums )
			return false;

		if( $driveDrum['V'] != $isVGuidedDrums )
			return false;

		return true;
	}

    function __test_infeed_tail( $infeedTail, $widthmm, $lengthmm, $version ){
		if( $infeedTail['version'] != $version )
			return false;

		if( $infeedTail['minBB'] > $widthmm || $infeedTail['maxBB'] < $widthmm )
			return false;

		if( $infeedTail['minOAL'] > $lengthmm || $infeedTail['maxOAL'] < $lengthmm )
			return false;

		return true;
	}

	function __test_outfeed_tail( $outfeedTail, $widthmm, $lengthmm, $version ){

		if( $outfeedTail['version'] != $version )
			return false;

		if( $outfeedTail['minBB'] > $widthmm || $outfeedTail['maxBB'] < $widthmm )
			return false;

		if( $outfeedTail['minOAL'] > $lengthmm || $outfeedTail['maxOAL'] < $lengthmm )
			return false;

		return true;
	}

	function __test_infeed_width_vars( $infeedWidthVars, $widthmm, $version ){

		if( $infeedWidthVars['version'] != $version )
			return false;

		if( $infeedWidthVars['minBB'] > $widthmm || $infeedWidthVars['maxBB'] < $widthmm )
			return false;

		return true;
	}

	function __test_motor( $motor, $speedRange, $speedMode, $motorManufacturer, $motorSpeed, $motorTorque, $motorPower ){

		if( $motor['speedMode'] != $speedMode )
			return false;

		if( $motor['modelManufacturer'] != $motorManufacturer )
			return false;

		if( ( $motor['speed'] / $motorSpeed ) * $motor['torque'] < $motorTorque )
			return false;

		if( $motor['power'] < $motorPower )
			return false;

		return __test_speed_range( $speedRange, $motor['speed'] );

	}

	function __test_outfeed_width_vars( $outfeedWidthVars, $widthmm, $version ){

		if( $outfeedWidthVars['version'] != $version )
			return false;

		if( $outfeedWidthVars['minBB'] > $widthmm || $outfeedWidthVars['maxBB'] < $widthmm )
			return false;

		return true;
	}

	function __test_speed_range( $speedRange, $motorSpeed ){
		for( $i=0; $i < sizeof($speedRange); $i++ ){
			if( $motorSpeed >= $speedRange[$i]['min'] && $motorSpeed <= $speedRange[$i]['max'] )
				return $i + 1;
		}

		return false;
	}


    // CALCULATE FUNCTIONS
    function calculate_frame_price(){
        global $DATA;

        validate_isset(['width', 'length', 'slider']);


        $frame = $DATA['frame'];
        $i = 0; $j = 0;



        for($i; $i < sizeof($frame['conveyorWidth']) - 1 
            && $_POST['width'] > $frame['conveyorWidth'][$i]; $i++);


        for($j; $j < sizeof($frame['conveyorLength']) - 1 
            && $_POST['length'] > $frame['conveyorLength'][$j]; $j++);

        die(json_encode($frame['values'][$_POST['slider']][
            $j * sizeof($frame['conveyorWidth']) + $i
        ]));

    }

    function calculate_support_rolls_price(){
        global $DATA;

        validate_isset(['drive', 'width', 'length', 'speed']);


        $supportRolls = $DATA['supportRolls'];
        $material = 'steel';
        $i = 0;

        $$speedmpm = $_POST['speed'] / MPM_TO_FPM;

        //mm values
        $mmWidth = round($_POST['width'] * IN_TO_MM);
        $mmLength = round($_POST['length'] * FT_TO_MM);

        // Material
		// Spreadsheet v1.20 update - support roll material would
		// only be steel

		// if( $speedmpm < 30.5 ){
		// 	if( $mmWidth >= 100 && $mmWidth <= 300 )
		// 		$material = 'plastic';
		// }

        $prices = $supportRolls['values'][$material];

        //Number
        if($_POST['drive'] == 'head')
            $number = floor( ( $mmLength - 1  ) / 3000);
        else
            $number = floor( ( $mmLength - 1) / 6000 ) * 2;

        
        //Price
        for( $i; $i < sizeof($supportRolls['conveyorWidth']) - 1 && $_POST['width'] > $supportRolls['conveyorWidth'][$i]; $i++);

        die(json_encode([
            'number'        => $number,
            'price'         => $prices[$i]
        ]));
    }


    function calculate_drive_version(  ){
        global $DATA;

        validate_isset(['drive', 'driveVersion', 'driveLocation', 'voltage', 'widthmm', 'adapterPlate', 'motorManufacturer']);

		$driveVersions = $DATA['driveVersion'];
		$n = $DATA['calculations']['BOM'];

		$isPlateHeavy = __get_is_plate_heavy( $_POST['driveVersion'], $n['quote16'] );
		$isBodine = __get_is_bodine( $_POST['motorManufacturer'], $_POST['adapterPlate'] );


		for( $i=0; $i < sizeof($driveVersions['BOM']); $i++ ){
			$driveObj = __get_properties( $driveVersions, $i );


			if( __test_drive( $driveObj, $isPlateHeavy, $isBodine, $n['isASAbove'], $n['isStainlessSteelDrums'], $n['isVGuidedDrums'], $_POST['widthmm'], $_POST['driveVersion'], $n['driveShafts'], $_POST['driveLocation'] ) ){



				$driveObj['labelBOM'] = __get_cpt( $driveObj['BOM'], $driveObj['cptBOM'], $_POST['widthmm'] );

				$driveObj['labelWidthVars'] = __get_cpt( $driveObj['widthVars'], $driveObj['cptWidthVars'], $_POST['widthmm'] );

				die(json_encode(__get_drive_price( $driveObj )));
			}
		}

		die(json_encode([
			'price'             => [
				'drive'         => 0,
				'widthVars'     => 0
            ]
		]));

	}

    function calculate_drive_drum(  ){
        global $DATA;

        validate_isset(['drive', 'driveVersion', 'widthmm', 'load', 'speed']);

		$driveDrums = $DATA['driveDrum'];
		$n = $DATA['calculations']['BOM'];

		$driveDrumOption = __get_drive_drum_option( $_POST['drive'], $_POST['driveVersion'] );
		$isSteelDriveDrum = __get_is_steel_drive_drum( $_POST['drive'], $_POST['load'], $_POST['speed'] );
		$isLaggedDriveDrum = __get_is_lagged_drive_drum( $isSteelDriveDrum );


		for( $i=0; $i < sizeof($driveDrums['BOM']); $i++ ){
			$driveDrum = __get_properties( $driveDrums, $i );

			if( __test_drive_drum( $driveDrum, $driveDrumOption, $isSteelDriveDrum, $isLaggedDriveDrum, $n['isStainlessSteelDrums'], $n['isVGuidedDrums'], $_POST['widthmm'] ) ){

				$driveDrum['labelBOM'] = __get_cpt( $driveDrum['BOM'], $driveDrum['cptBOM'], $_POST['widthmm'] );

				die(json_encode(__get_drive_drum_price( $driveDrum )));

			}
		}

		die(json_encode([
			'price' => 0
		]));
	}

    function calculate_drive_drum_surface(  ){
        validate_isset(['drive', 'load', 'speed']);

		$steel = 'steel';
		$rubber = 'rubber coated';

		$loadKg = $_POST['load'] / KG_TO_LBS;

		if( ( $_POST['drive'] == 'head' && $loadKg > 75 )
			|| ( $_POST['drive'] == 'center' && $loadKg > 30 ) 
			|| ( $_POST['speed'] > 80 ) )
			die(json_encode($rubber));

		die(json_encode($steel));
	}

    function calculate_infeed_tail(  ){
        global $DATA;

        validate_isset(['widthmm', 'lengthmm', 'version']);

		$infeedTails = $DATA['infeedTail'];

		for( $i=0; $i < sizeof($infeedTails['BOM']); $i++ ){
			$infeedTail = __get_properties( $infeedTails, $i );

			if( __test_infeed_tail( $infeedTail, $_POST['widthmm'], $_POST['lengthmm'], $_POST['version'] ) ){
				$infeedTail['labelBOM'] = __get_cpt( $infeedTail['BOM'], $infeedTail['cptBOM'], $_POST['widthmm'] );

				die(json_encode(__get_infeed_tail_price( $infeedTail )));
			}

		}


		die(json_encode([
			'labelBOM'  => 'No Infeed Tail',
			'price'     => 0
		]));
	}

    function calculate_infeed_width_vars(  ){
        global $DATA;

        validate_isset(['widthmm', 'version']);

		$infeedWidthVars = $DATA['infeedWidthVars'];
		
		for( $i=0; $i < sizeof($infeedWidthVars['BOM']); $i++ ){
			$infeedWidthVar = __get_properties( $infeedWidthVars, $i );

			if( __test_infeed_width_vars( $infeedWidthVar, $_POST['widthmm'], $_POST['version'] ) ){
				$infeedWidthVar['labelBOM'] = __get_cpt( $infeedWidthVar['BOM'],$ $infeedWidthVar['cptBOM'], $_POST['widthmm'] );

				die(json_encode(__get_infeed_tail_price( $infeedWidthVar )));
			}

		}

		die(json_encode([
			'price'     => 0
		]));
	}

    function calculate_outfeed_tail(  ){
		global $DATA;

        validate_isset(['widthmm', 'lengthmm', 'version']);

		$outfeedTails = $DATA['outfeedTail'];

		for( $i=0; $i < sizeof( $outfeedTails['BOM'] ); $i++ ){
			$outfeedTail = __get_properties( $outfeedTails, $i );

			if( __test_outfeed_tail( $outfeedTail, $_POST['widthmm'], $_POST['lengthmm'], $_POST['version'] ) ){
				$outfeedTail['labelBOM'] = __get_cpt( $outfeedTail['BOM'], $outfeedTail['cptBOM'], $_POST['widthmm'] );

				die(json_encode(__get_infeed_tail_price( $outfeedTail )));
			}
		}

		die(json_encode([
			'price'     => 0
		]));
	}

	function calculate_outfeed_width_vars(  ){
		global $DATA;

		validate_isset(['widthmm', 'version']);

		$outfeedWidthVars = $DATA['outfeedWidthVars'];
		
		for( $i=0; $i < sizeof($outfeedWidthVars['BOM']); $i++ ){
			$outfeedWidthVar = __get_properties( $outfeedWidthVars, $i );

			if( __test_outfeed_width_vars( $outfeedWidthVar, $_POST['widthmm'], $_POST['version'] ) ){
				$outfeedWidthVar['labelBOM'] = __get_cpt($outfeedWidthVar['BOM'], $outfeedWidthVar['cptBOM'], $_POST['widthmm'] );

				die(json_encode(__get_infeed_tail_price( $outfeedWidthVar )));
				
			}

		}

		die(json_encode([
			'price'	=> 0
		]));
	}



	function calculate_motors(  ){
        global $DATA;

        validate_isset(['drive', 'voltage', 'opsMode','speedMode', 'speed', 'load', 'width', 'length', 'angle']);

		$motors = $DATA['motors'];
		$n = $DATA['calculations']['motor'];


		$speedmpm = $_POST['speed'] / MPM_TO_FPM;
		$loadkg = $_POST['load'] / KG_TO_LBS;

		
		$motorDriveDrum = __get_motor_drive_drum( $_POST['drive'] );


		$beltWeightkg = __get_weight_of_belt( $_POST['length'], $_POST['width'], $n['beltWeight'] );
		$frictionFactor = __get_friction( $_POST['drive'] );
		$totalForce = __get_total_force( $beltWeightkg, $frictionFactor, $loadkg, $_POST['angle'], $_POST['opsMode'] );

		
		$motorSpeed = __get_motor_speed( $motorDriveDrum, $speedmpm );

		$motorTorque = __get_motor_torque( $n['drumEfficiency'], $n['motorEfficiency'], $n['safetyFactor'], $totalForce, $motorDriveDrum );

		$motorPower = __get_motor_power( $n['drumEfficiency'], $n['motorEfficiency'], $n['safetyFactor'], $totalForce, $speedmpm );



		$speedRange = __get_speed_range( $motorSpeed, $_POST['speedMode'] );


		$test2 = null;
		$test3 = null;

		for( $i=0; $i < sizeof($motors['modelOur']); $i++ ){
			$motor = __get_properties( $motors, $i );

			$test = __test_motor( $motor, $speedRange, $_POST['speedMode'], $n['motorManufacturer'], $motorSpeed, $motorTorque, $motorPower );


			if( $test == 1 ){
				die(json_encode(__get_motor_price( $motor )));
			}else if( $test == 2 && $test2 == null ){
				$test2 = __get_motor_price( $motor );
			}else if( $test == 3 && $test3 == null ){
				$test3 = __get_motor_price( $motor );
			}
		}

		if( $test2 != null )
			die(json_encode($test2));

		if( $test3 != null )
			die(json_encode($test3));


		die(json_encode([
			'price'     => 0,
			'note'      => 'Calculated horse power is invalid'
		]));
		

	}

	function calculate_side_rails(  ){
		global $DATA;

        validate_isset(['sideRail', 'length', 'railSystem', 'railHeight', 'hasUHMW', 'width', 'sliderDeduct']);

		$sideRails = $DATA['sideRails'][$_POST['sideRail']];
		$i=0; $j=0;

		$lengthmm = $_POST['length'] * FT_TO_MM;

		$price = 0;
		$oal = '';
		$desc1 = '';
		$desc2 = '';

		$widthmm = round( $_POST['width'] * IN_TO_MM );
		$laneWidth = $widthmm;


		// Fixed Rails
		if( $_POST['sideRail'] == 'fixed' ){
			$sideRails = $sideRails[$_POST['railSystem']];

			// SF1.3
			if( $_POST['railSystem'] == 'sf13' ){
				$price = $lengthmm / 1000 * 30;

				$oal = $lengthmm - $_POST['sliderDeduct'];
				$laneWidth -= 2;

			// SF7.1
			}else if( $_POST['railSystem'] == 'sf71' ){

				for( $i=0; $i < sizeof($sideRails['conveyorLength']) - 1 && $_POST['length'] > $sideRails['conveyorLength'][$i]; $i++ );

				for( $j=0; $j < sizeof($sideRails['railHeight']) - 1 && $_POST['railHeight'] > $sideRails['railHeight'][$j]; $j++ );

				$price = 2 * $sideRails['price'][ $i * sizeof($sideRails['railHeight']) + $j ];

				$oal = $lengthmm;
			}

			$desc1 = 'H=' . $_POST['railHeight'] . ' mm';
			$desc2 = 'Effective Lane Width: ' . $laneWidth . ' mm';


		// Adjustable Rails
		}else if( $_POST['sideRail'] == 'adjustable' ){

			$from = 0;
			$to = $widthmm + 60;

			$umhw = 'no';


			$desc1 = 'Aluminum Side Rails';

			if( $_POST['hasUHMW'] ){
				$umhw = 'yes';
				$desc1 = 'UHMW backed Aluminum Side Rails';
			}

			if( $widthmm > 140 )
				$from = $widthmm - 140;

			for( $i=0; $i < sizeof($sideRails['conveyorLength']) - 1 && $_POST['length'] > $sideRails['conveyorLength'][$i]; $i++ );


			$price = 2 * $sideRails['price'][$umhw][$i];
			$oal = $lengthmm;
			$desc2 = 'Lane width adjustable from ' + $from + ' mm to ' + $to + ' mm';

		}else{
			$sideRails = [
				'name'=> 'None Requested.'
			];
		}

		
		die(json_encode([
			'name'	=> $sideRails['name'],
			'price' => $price,
			'OALmm' => $oal,
			'desc1' => $desc1,
			'desc2' => $desc2
		]));
	}


	function calculate_stands(  ){
		global $DATA;

        validate_isset(['standType', 'standHeight', 'standQuantity', 'width']);

		$stands = $DATA['stands'][$_POST['standType']];
		$j=0; $k=0;


		if( $_POST['standType'] == 'none' ){
			die(json_encode([
				'name'		=> 'No Stand',
				'basePrice' => 0,
				'price'		=> 0,
				'quantity'	=> 0
			]));
		}


		// Price
		for( $j=0; $j < sizeof($stands['standsHeight']) - 1 && $_POST['standHeight'] > $stands['standsHeight'][$j]; $j++ );
		for( $k=0; $k < sizeof($stands['conveyorWidth']) && $_POST['width'] > $stands['conveyorWidth'][$k]; $k++ );

		$price = $stands['price'][ sizeof($stands['conveyorWidth']) * $j + $k ];


		die(json_encode([
			'name'		=> $stands['name'],
			'basePrice'	=> $price,
			'quantity'	=> $_POST['standQuantity'],
			'price'		=> $_POST['standQuantity'] * $price
		]));

	}

	function calculate_stands_caster(  ){
		global $DATA;

        validate_isset(['standQuantity']);

		die(json_encode([
			'basePrice'	=> $DATA['standsCaster']['price'],
			'quantity'	=> $_POST['standQuantity'],
			'price'		=> $DATA['standsCaster']['price'] * $_POST['standQuantity']
		]));
	}	

	function calculate_stand_leveling(  ){
		global $DATA;

        validate_isset(['standQuantity']);

		die(json_encode([
			'basePrice'	=> $DATA['standsLeveling']['price'],
			'quantity'	=> $_POST['standQuantity'],
			'price'		=> $DATA['standsLeveling']['price'] * $_POST['standQuantity']
		]));
	}


	function calculate_has_stringers(  ){

        validate_isset(['stand', 'standQuantity']);

		die(json_encode($_POST['standQuantity'] > 1 && $_POST['stand'] != 'none'));
	}


	function calculate_stringers(  ){
		global $DATA;

        validate_isset(['stand', 'length', 'standQuantity']);

		$hasStringers = calculate_has_stringers( $_POST['stand'], $_POST['standQuantity'] );

		if( $hasStringers ){
			$stringers = $DATA['stringers'];
			$i=0;

			for( $i=0; $i < sizeof($stringers['conveyorLength']) - 1 && $_POST['length'] > $stringers['conveyorLength'][$i]; $i++ );

			die(json_encode([
				'basePrice'	=> $stringers['price'][$i],
				'mtgPrice'	=> $stringers['mtgAngles'],
				'quantity'	=> $_POST['standQuantity'],
				'price'		=> $stringers['price'][$i] + ( $_POST['standQuantity'] * $stringers['mtgAngles'] )
			]));

		}

		die(json_encode(0));


	}

	function calculate_control(  ){
		global $DATA;

        validate_isset(['control1', 'control2', 'control3']);

		$controls = $DATA['controls'];
		$n = $DATA['calculations']['pricing'];

		$total = 0;

		$controlPrice = $controls;


		// Add control markup
		$controlPrice['control1'] *= $n['option1Markup'];
		$controlPrice['control2'] *= $n['option2Markup'];
		$controlPrice['control3'] *= $n['option3Markup'];

		if( $_POST['control1'] )
			$total += $controlPrice['control1'];

		if( $_POST['control2'] )
			$total += $controlPrice['control2'];

		if( $_POST['control3'] )
			$total += $controlPrice['control3'];


		die(json_encode([
			'control1'=> $controlPrice['control1'],
			'control2'=> $controlPrice['control2'],
			'control3'=> $controlPrice['control3'],
			'price'=> $total
		]));
	}

	function calculate_pricing(  ){
		global $DATA;

        validate_isset(['basePrice']);

		$n = $DATA['calculations']['pricing'];


		$priceInc1 = ceil( $_POST['basePrice'] * ( 1 + $n['priceIncrease1'] ) );

		$priceInc2 = ceil( $priceInc1 * ( 1 + $n['priceIncrease2'] ) );

		$packagingPrice = ceil( $priceInc2 * $n['packaging'] );

		$listPrice = $priceInc2 + $packagingPrice;

		$yushinNet = ceil( $listPrice * ( 1 - $n['discount'] ) ) * $n['mkMarkup'];

		$price = $yushinNet * $n['yushinMarkup'];

		die(json_encode([
			'priceInc1'			=> $priceInc1,
			'priceInc2'			=> $priceInc2,
			'packagingPrice'	=> $packagingPrice,
			'listPrice'			=> $listPrice,
			'yushinNet'			=> $yushinNet,
			'price'				=> $price
		]));

		
	}


    if(!empty($_POST['action'])){
        call_user_func($_POST['action']);

    }else{
        echo 'no action parameter';
    }


    
?>