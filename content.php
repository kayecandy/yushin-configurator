<div id="content" class="container-fluid p-0">
	<div id="iframe-container" class="container p-0">
		<div class="row m-0 flex-nowrap">
			<div id="sidebar-spacer" class="col logo-column m-0 p-0"></div>
			<div id="sidebar" class="col logo-column m-0 p-0">
				<div>
					<ul class="p-0 m-0">
						<li>Standards</li>
						<li>Specifications</li>
						<li>Drive</li>
						<?php if( $hasInfeedOutfeed ): ?>
							<li>Infeed/Outfeed</li>
						<?php endif; ?>
						<li class="belting-step">Belting</li>
						<li>Side Rails</li>
						<li>Stands</li>
						<li>Controls</li>
						<?php if( $hasAccessories ): ?>
							<li class="">Accessories</li>
						<?php endif; ?>
						<li>Customer Information</li>
						<li id="pricing-menu">Pricing</li>
					</ul>
					<br>

					<div class="text-center mb-5">
						<span>
							Want to start again?
						</span>
						<button id="restart-btn" type="button" class="btn btn-primary btn-red btn-wide">Reset Form</button>
						
					</div>
				
				</div>
			</div>
			<div id="steps-container" class="col px-0 px-md-4 py-5">



				<!-- <form id="steps-form"  novalidate> -->


					<!-- Start -->
					<div class="step pl-0 pl-md-4">

						<form class="step-form" novalidate>

							<div class="row justify-content-center">
								<div class="col-7 col-lg-5 mb-5">
									<img class="w-100" src="./assets/yushin_standard.png">
								</div>

								<div class="col" style="min-width: 400px;">
									<div class="text-center"><i>Our conveyor standards</i></div>
									<br>

									<table class="table w-100">
										<tr>
											<th>Slider:</th>
											<td>Galvanized</td>
										</tr>
										<tr>
											<th>Speed Mode:</th>
											<td>Variable</td>
										</tr>
										<tr>
											<th>Drive Type: </th>
											<td>Head Drive</td>
										</tr>
										<tr>
											<th>Drive Location: </th>
											<td>Left</td>
										</tr>
										<tr>
											<th>Drive Version: </th>
											<td>Version AC (below)</td>
										</tr>
										<tr>
											<th>Infeed:</th>
											<td>Standard</td>
										</tr>
										<tr>
											<th>Belting: </th>
											<td>Blue Belt (460445)</td>
										</tr>
										<tr>
											<th>Side Rails: </th>
											<td>No Side Rails</td>
										</tr>
										<tr>
											<th>Stands: </th>
											<td>Stands with leveling pads</td>
										</tr>
									</table>

									<div class="text-right">
										<small><i>These standards will be highlighted/bold on the form</i></small>
									</div>
									

									<br><br>

									<div class="form-group text-right">



										<label class="custom-control custom-checkbox">
											<input id="accept-terms-checkbox" type="checkbox" class="custom-control-input" required>
											<span class="custom-control-indicator"></span>
											<span class="custom-control-description">I have read and accepted the <span class="help-text no-style text-info" data-field="termsOfUse"><u>Terms of Use</u></span></span>

											<div class="invalid-feedback">
										    	Please check the checkbox to proceed.
										    </div>

										</label>

									</div>

								</div>
							</div>
							
							

							
							<div class="help-text-dialog container" data-field="termsOfUse" title="Terms of Use">
								I understand that this software is provided by Yushin America, Inc. "as is" and any express or implied warranties, including, but not limited to, the implied warranties or merchantability and suitability for a particular purpose are disclaimed. 
								<br><br>

								In no event shall Yushin America, Inc. be liable for any direct, indirect, incidental, special, examplary,
								or consequential damages (including, but not limited to, procurement of substitute goods or service;
								loss of use, data, or profits; or business interruption) however caused and on any theory of liability,
								whether in contract, strict liability, or tort (including negligence or otherwise) arising in any way out of
								the use of this software, even if advised of the possibility of such damage.
								<br><br>

								All applications must be reviewed and confirmed Yushin America, Inc.
								<br><br>


								This software is designed to be used for budgetary pricing information only.
								<br><br>
							</div>

							<br><br>



							<div class="form-group row">
								<div class="col">
									<button type="submit" class="btn btn-primary btn-next float-right">Next</button>
								</div>
							</div>

						</form>
					</div>

					<!-- Specifications -->
					<div class="step pl-0 pl-md-4">

						<div class="note-standard">* Items in bold are Yushin Standards and recommended values.</div>

						<form class="step-form" novalidate>
							<div class="form-group row">
								<label for="conveyor-width" class="col-4 col-form-label">Frame Width</label>
								<div class="col">
									<select id="conveyor-width" class="form-control" required>
										<option value="" selected disabled>Choose...</option>
									</select>

									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
							</div>
							

							<div class="form-group row">
								<label for="conveyor-length" class="col-4 col-form-label">
									Overall Length
									<small class="form-text text-info min-value"></small>
									<small class="form-text text-info max-value"></small>


								</label>
								<div class="col">
									<input 
										id="conveyor-length" type="number" class="form-control" step="any" value="0" data-mm-val="0" data-min-mm="0"  data-max-mm="10000" data-abs-min-ft="1.34514" required>
									<div class="invalid-feedback">
								    	This is a required field.
								    </div>

								    <small class="form-text text-muted">Longer belt options are available, but must be quoted on a case by case basis. Please inquire for a quotation if a longer conveyor is needed.</small>
								</div>
								<div class="col-2 pl-0">
									<select id="length-unit" class="form-control" data-old-val="in" required>
										<option 
											value="in" 
											data-to-mm="25.4" 
											data-decimal="2"
											selected
										>	in.
										</option>
										<option 
											value="ft" 
											data-to-mm="304.8"
											data-decimal="2"
										>
											ft.
										</option>
										<option 
											value="mm" 
											data-to-mm="1"
											data-decimal="0"
										>
											mm
										</option>
									</select>
								</div>
							</div>
						
							

							<div class="form-group row">
								<label for="conveyor-slider" class="col-4 col-form-label">Slider</label>
								<div class="col">
									<select id="conveyor-slider" class="form-control" required>
										<option value="" selected disabled>Choose...</option>
										<option class="input-standard" value="galvanized">Galvanized</option>
										<option value="stainless">Stainless</option>
									</select>

									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
							</div>

							

							<div class="form-group row">
								<label for="conveyor-angle" class="col-4 col-form-label">Incline Angle<small class="form-text text-info">Enter negative value for declined angles</small></label>
								<div class="col">
									<input id="conveyor-angle" type="number" class="form-control" step="any" required>
									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
							</div>

							<div class="form-group row">
								<label for="conveyor-load" class="col-4 col-form-label">Total Load <small>of product</small></label>
								<div class="col">
									<select id="conveyor-load" class="form-control" required>
										<option value="" selected disabled>Choose...</option>
										<option value="20">0 - 20</option>
										<option value="40">21 - 40</option>
										<option value="60">41 - 60</option>
									</select>
									<!-- <input id="conveyor-load" type="number" class="form-control" max="250" step="any" required> -->
									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
								<div class="col-2">
									<span class="py-3">lbs</span>
								</div>
							</div>

							<div class="form-group row">
								<label for="conveyor-speed" class="col-4 col-form-label">Speed Range</label>
								<div class="col">
									<select id="conveyor-speed" class="form-control" required disabled>
										<option value="" disabled>Choose...</option>
										<option value="60" selected>6 - 60</option>
									</select>
									<!-- <input id="conveyor-speed" type="number" class="form-control" max="260" required> -->
									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
								<div class="col-2">
									<span class="py-3">fpm</span>
								</div>
							</div>

							<div class="form-group row">
								<label for="conveyor-speed-mode" class="col-4 col-form-label">Speed Mode</label>
								<div class="col">
									<select id="conveyor-speed-mode" class="form-control" required disabled>
										<option value="" disabled>Choose...</option>
										<option class="input-standard" value="variable" selected>Variable</option>
										<option value="constant">Constant</option>
									</select>
									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
							</div>

							<div class="form-group row">
								<label for="conveyor-operations-mode" class="col-4 col-form-label"><small>Will product ever</small> Accumulate?<span class="help-text btn" data-field="opsMode">?</span></label>
								<div class="col">
									<select id="conveyor-operations-mode" class="form-control" required>
										<option value="" selected disabled>Choose...</option>
										<option value="accumulating">Yes (Accumulating)</option>
										<option value="continuous">No (Continuous)</option>
									</select>
									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
							</div>
							<div class="help-text-dialog container" data-field="opsMode" title="Product Accumulation">
								If the application calls for holding product back while the conveyor is still running, please indicate this by selecting <i>"Yes"</i> in the accumulation box.
								<br><br>

								This information is required in order to properly size the motor.


								<br><br><br><br>

								<div class="row">
									<div class="col-6">
										<img class="w-100" src="./assets/opsmode-continuous.jpg">
										<br><br>
										<h6>Continuous</h6>
										Product is not stopped on a moving belt. 
									</div>
									<div class="col-6">
										<img class="w-100" src="./assets/opsmode-accumulating.jpg">
										<br><br>
										<h6>Accumulating</h6>
										Product hits a dead stop and the belt continues to run under it.
									</div>
								</div>

								<br>

							</div>

							<br>
							<br>
							<div class="form-group row">
								<div class="col">
									<button type="submit" class="btn btn-primary btn-next float-right">Next</button>
								</div>
							</div>

						</form>
					</div>


					<!-- Drive -->
					<div class="step pl-0 pl-md-4">

						<div class="note-standard">* Items in bold are Yushin Standards and recommended values.</div>

						<form class="step-form" novalidate>


							<label  class="col-form-label">Drive Type</label>
							<!-- <br> -->

							<div class="form-group row">
								<div class="col-6">
									<label for="conveyor-drive-head" class="w-100"><img class="w-100" src="./assets/drive_type-head.jpg"></label>

									<label class="custom-control custom-radio m-0 input-standard">
										<input id="conveyor-drive-head" name="conveyor-drive-type" type="radio" class="custom-control-input" value="head" data-label="Head Drive" required>
										<span class="custom-control-indicator"></span>
										<span class="custom-control-description">Head <b class="pricing-indicator">($)</b></span>
									</label>

									<div class="mt-3">
										<small class="form-text text-muted">Standard head drive conveyors do <b>NOT</b> allow for reverse operation. If reverse operation is required, please inquire for a quotation.</small>
									</div>
								</div>

								<div class="col-6">
									<label for="conveyor-drive-center" class="w-100"><img class="w-100" src="./assets/drive_type-center.jpg"></label>

									<label class="custom-control custom-radio m-0">
										<input id="conveyor-drive-center" name="conveyor-drive-type" type="radio" class="custom-control-input" data-label="Center Drive" value="center">
										<span class="custom-control-indicator"></span>
										<span class="custom-control-description">Center <b class="pricing-indicator">($$$)</b></span>
									</label>

									<div class="mt-3">
										<small class="form-text text-muted">Allows reverse operation</small>
									</div>

									
								</div>

							</div>

							<br><br>

							<div class="form-group row">
								<label for="conveyor-drive-location" class="col-3 col-form-label">Drive Location <span class="help-text btn" data-field="drive-location">?</span></label>
								<div class="col">
									<select id="conveyor-drive-location" class="form-control" required>
										<option value="" selected disabled>Choose...</option>
										<option value="left" class="input-standard" data-label="Left">Left</option>
										<option value="right" data-label="Right">Right</option>
									</select>
									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
							</div>
							<div class="help-text-dialog container" data-field="drive-location" title="Drive Location">
								The drive location is where the motor mount is located. Left and right are defined as if you are standing behind the conveyor and the product is moving away from you.
								<br><br><br>

								<div class="row">
									<div class="col-6">
										<img class="w-100" src="./assets/drive_location-left.png">
										<br><br>
										Example shown above is <b>Left Below, Discharge</b>.

									</div>
									<div class="col-6">
										<img class="w-100" src="./assets/drive_location-right.png">
										<br><br>
										Example shown above is <b>Right Above, Discharge</b>.
										
									</div>
								</div>

								<br>
							</div>



							<div class="form-group row">
								<label for="conveyor-drive-version" class="col-3 col-form-label">Drive Version <span class="help-text btn" data-field="drive-version">?</span></label>
								<div class="col">
									<select id="conveyor-drive-version" class="form-control" required>

										<option value="" selected disabled>Choose...</option>

										<option value="ac-below" data-drive-value="standard" class="input-standard center-drive-hidden" data-version="AC" data-code="AC-01" data-label="Version AC, mounted below">Version AC (below) <b class="pricing-indicator">($)</b></option>

										<option value="ac-above" class="center-drive-hidden" data-drive-value="remote" data-version="AC" data-code="AC-01" data-label="Version AC, mounted above">Version AC (above) <b class="pricing-indicator">($)</b></option>

										<option value="am" data-drive-value="side" class="center-drive-hidden" data-version="AM" data-code="AM-01" data-label="Version AM">Version AM <b class="pricing-indicator">($$$)</b></option>

										<option value="au-below" data-drive-value="top" class="center-drive-hidden" data-version="AU" data-code="AU-01" data-label="Version AU, mounted below">Version AU (below) <b class="pricing-indicator">($$)</b></option>

										<option value="au-above" data-drive-value="standard" class="center-drive-hidden" data-version="AU" data-code="AU-01" data-label="Version AU, mounted above">Version AU (above) <b class="pricing-indicator">($$)</b></option>

										<option value="bc" data-drive-value="standard" class="head-drive-hidden" data-version="BC" data-code="BC-01-01" data-label="Version BC">Version BC</option>

									</select>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>

								<div class="help-text-dialog container" data-field="drive-version" title="Drive Version">

								<br>
								<div class="container">
									<div class="row">
										<div class="col-6">
											<img class="w-100" src="./assets/drive_version-acb.png">
											<b>Version AC (below)</b><br>
											<li>Standard end drive</li>
											<li>Min Length: 310 mm</li>
										</div>
										<div class="col-6">
											<img class="w-100" src="./assets/drive_version-aca.png">
											<b>Version AC (above)</b><br>
											<li>Maximum 1.5" clearance between motor and belt</li>
										</div>
									</div>
									<br>
									<div class="row">
										<div class="col-6">
											<img class="w-100" src="./assets/drive_version-am.png">
											<b>Version AM</b><br>
											<li>Standard offset 325mm from end</li>
											<li>Min Length: 670 mm</li>
										</div>
										<div class="col-6">
											<img class="w-100" src="./assets/drive_version-au.png">
											<b>Version AU</b><br>
											<li>Motor outside of frame</li>
											<li>Can be mounted below</li>
											<li>Min Length: 310 mm</li>
										</div>
									</div>
									<br>
									<div class="row">
										<div class="col-6">
											<img class="w-100" src="./assets/drive_version-bc.png">
											<b>Version BC</b><br>
											<li>Available for Center Drive only</li>
										</div>
										
									</div>
								</div>

								<br>
							</div>




							</div>

							<div class="form-group row">
								<label for="conveyor-voltage" class="col-3 col-form-label">Voltage <small class="text-info form-text"><i>Please inquire if 230 VAC is needed</i></small></label>
								<div class="col">
									<select id="conveyor-voltage" class="form-control" required disabled>
										<option value="" disabled>Choose...</option>
										<option value="115" selected>115 VAC / 1 PH</option>
										<option value="230">230 VAC / 3 PH</option>
										<option value="460" class="head-standard-hidden">460 VAC / 3 PH</option>
									</select>
									<div class="invalid-feedback">
								    	This is a required field.
								    </div>
								</div>
							</div>

							<br>
							<br>

							<div class="form-group row">
								<div class="col">
									<button type="button" class="btn btn-primary btn-prev">Previous</button>
									<button type="submit" class="btn btn-primary float-right btn-next">Next</button>
								</div>
							</div>

						</form>

					</div>


					<!-- Infeed/Outfeed -->
					<?php if( $hasInfeedOutfeed ): ?>
						<div class="step pl-0 pl-md-4">
							<div class="note-standard">* Items in bold are Yushin Standards and recommended values.</div>

							<form class="step-form" novalidate>
								<div class="form-group row">
									<label for="conveyor-infeed" class="col-3 col-form-label">Infeed<span class="help-text btn" data-field="infeed-outfeed">?</span></label>
									<div class="col">
										<select id="conveyor-infeed" class="form-control" required>
											<option value="" selected disabled>Choose...</option>
											<option class="input-standard" value="1">Standard</option>
											<option value="9">Flush Mount</option>
											<option value="13">Rolling Nosebar</option>
											<option value="19">Additional Output Shaft</option>
										</select>
										<div class="invalid-feedback">
											This is a required field.
										</div>
									</div>
								</div>

								<div id="conveyor-outfeed-container" class="form-group row">
									<label for="conveyor-outfeed" class="col-3 col-form-label">Outfeed<span class="help-text btn" data-field="infeed-outfeed">?</span></label>
									<div class="col">
										<select id="conveyor-outfeed" class="form-control" required>
											<option value="" selected disabled>Choose...</option>
											<option value="1">Standard</option>
											<option value="9">Flush Mount</option>
											<option value="13">Rolling Nosebar</option>
											<option value="19">Additional Output Shaft</option>
										</select>
										<div class="invalid-feedback">
											This is a required field.
										</div>
									</div>
								</div>
								<div class="help-text-dialog container" data-field="infeed-outfeed" title="Infeed/Outfeed">
									A wide range of tails are available for selection. The details of each tail are given below.<br><br><br>

									<div class="row">
										<div class="col-6">
											<img class="w-100" src="./assets/infeed-outfeed-1.png">
											<br><br>
											<h6>01 - Standard Idler, &oslash;  52 mm</h6>
											<ul>
												<li>Crowned roll &oslash; 52mm</li>
												<li>Belt tension and tracking on the side using alignment block</li>
											</ul>
										</div>
										<div class="col-6">
											<img class="w-100" src="./assets/infeed-outfeed-13.png">
											<br><br>
											<h6>13 - Rolling Nosebar Idler, &oslash; 19 mm</h6>
											<ul>
												<li>Rolling knife edge &oslash; 19mm</li>
												<li>Belt tension and tracking on the side using alignment blocks, adjustment by idler roller from the front</li>
											</ul>
										</div>
									</div>

									<br>

								</div>

								<br>
								<br>

								<div class="form-group row">
									<div class="col">
										<button type="button" class="btn btn-primary btn-prev">Previous</button>
										<button type="submit" class="btn btn-primary float-right btn-next">Next</button>
									</div>
								</div>
							</form>
						</div>
					<?php endif; ?>


					<!-- Belting -->
					<div id="belt-step" class="step pl-0 pl-md-4">
						<div class="note-standard">* Items in bold are Yushin Standards and recommended values.</div>

						<form id="belt-form" class="step-form" novalidate>

							<h3>Filters</h3>
							<hr>

							<div class="row flex-wrap">
								<label class="col custom-control custom-checkbox text-nowrap belt-filter">
									<input id="conveyor-belt-antistatic" type="checkbox" class="custom-control-input" data-belt-filter="antistatic">
									<span class="custom-control-indicator"></span>
									<span class="custom-control-description">Antistatic</span>

								</label>

								<label class="col custom-control custom-checkbox text-nowrap belt-filter">
									<input id="conveyor-belt-conductive" type="checkbox" class="custom-control-input" data-belt-filter="conductive">
									<span class="custom-control-indicator"></span>
									<span class="custom-control-description">Highly Conductive</span>

								</label>

								<label class="col custom-control custom-checkbox text-nowrap belt-filter">
									<input id="conveyor-belt-fda" type="checkbox" class="custom-control-input" data-belt-filter="fda">
									<span class="custom-control-indicator"></span>
									<span class="custom-control-description">FDA Suitable</span>

								</label>

								<label class="col custom-control custom-checkbox text-nowrap belt-filter">
									<input id="conveyor-belt-sharp" type="checkbox" class="custom-control-input" data-belt-filter="sharp">
									<span class="custom-control-indicator"></span>
									<span class="custom-control-description">Sharp products</span>

								</label>

								<label class="col custom-control custom-checkbox text-nowrap belt-filter">
									<input id="conveyor-belt-temp" type="checkbox" class="custom-control-input" val="temp" data-belt-filter="max-temp">
									<span class="custom-control-indicator"></span>
									<span class="custom-control-description">Product temp. above <tt>140&deg;F</tt></span>

								</label>
							</div>

							<div class="max-temp-hidden d-none">
								<hr>

								<div class="form-group row">
									<label for="" class="col-3 col-form-label">Max Temp</label>
									<div class="col">
										<input id="belt-max-temp" type="number" class="form-control">
										<div class="invalid-feedback">
											This is a required field.
										</div>
									</div>
								</div>
							</div>
							


							<br><br>

							<h3>Belts</h3>

							<table class="table table-striped table-hover">
								<thead>
									<tr>
										<th></th>
										<th colspan="2" class="text-center" style="border-left: solid 1px #e9ecef;border-right: solid 1px #e9ecef;">Surface</th>
										<th colspan="2"></th>
									</tr>
									<tr>
										<th class="belt-num" scope="col">Belt#</th>
										<th class="belt-material" scope="col">Material</th>
										<th class="belt-color" scope="col">Color</th>
										<th class="belt-max-temp" scope="col">Max Temp[&#176;F]</th>
										<th class="belt-price-indicator">Price</th>
										<th class="belt-price" scope="col">Price</th>
										<th class="belt-notes" scope="col">Notes</th>
									</tr>
								</thead>
							</table>

							<div class="belt-table-body">
								<table class="table table-striped table-hover">
									<tbody>
										<tr class="template belt-row ">
											<td class="belt-num"></td>
											<td class="belt-material"></td>
											<td class="belt-color"></td>
											<td class="belt-max-temp">&#176;</td>
											<td class="belt-price-indicator font-weight-bold"></td>
											<td class="belt-price"></td>
											<td class="belt-notes"></td>
										</tr>

									</tbody>
								</table>
							</div>
							

							<br>
							<br>

							<div class="form-group row">
								<div class="col">
									<button type="button" class="btn btn-primary btn-prev">Previous</button>
									<button type="submit" class="btn btn-primary float-right btn-next">Next</button>
								</div>
							</div>
						</form>
					</div>


					<!-- Side Rails -->
					<div id="side-rails-step" class="step pl-0 pl-md-4">
						<div class="note-standard">* Items in bold are Yushin Standards and recommended values.</div>

						<form class="step-form" novalidate>
							<div class="form-group row">
								<label for="conveyor-side-rails" class="col-3 col-form-label">Side Rails <span class="help-text btn" data-field="side-rails">?</span></label>
								<div class="col">
									<select id="conveyor-side-rails" class="form-control" required>
										<option value="" selected disabled>Choose...</option>
										<option class="input-standard" value="none">No Rails</option>
										<option value="fixed">Fixed Rails</option>
										<option value="adjustable">Adjustable Rails</option>
									</select>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>

							</div>

							<!-- Fixed Rails Suboption -->
							<div id="fixed-rails-options" class="side-rail-options">

								<label  class="col-form-label">Rail System</label>

								<div class="form-group row">
									<div class="col">
										<label for="conveyor-side-rails-system-sf13" class="w-100"><img class="w-100" src="./assets/side_rail-sf13.jpg"></label>

										<label class="custom-control custom-radio m-0">
											<input id="conveyor-side-rails-system-sf13" name="conveyor-side-rails-system" type="radio" class="custom-control-input sub-required" value="sf13">
											<span class="custom-control-indicator"></span>
											<span class="custom-control-description">SF 1.3 <b class="pricing-indicator">($)</b></span>


										</label>
									</div>

									<div class="col">
										<label for="conveyor-side-rails-system-sf71" class="w-100"><img class="w-100" src="./assets/side_rail-sf71.jpg"></label>

										<label class="custom-control custom-radio m-0">
											<input id="conveyor-side-rails-system-sf71" name="conveyor-side-rails-system" type="radio" class="custom-control-input sub-required" value="sf71">
											<span class="custom-control-indicator"></span>
											<span class="custom-control-description">SF 7.1 <b class="pricing-indicator">($$)</b></span>


										</label>
									</div>

								</div>
								<br>
								
								<div id="conveyor-side-rails-height-container" class="form-group row">
									<label for="conveyor-side-rails-height" class="col-3 col-form-label">
										Rails Height

										<small class="form-text text-info">Min Value: 10 mm<br></small>

										<small class="form-text text-info">Max Value: 50 mm</small>

									</label>
									<div class="col">
										<input id="conveyor-side-rails-height" type="number" class="form-control sub-required" min="10" max="50">
										<div class="invalid-feedback">
											This is a required field.
										</div>
									</div>

									<div class="col-2">
										<span class="py-3">mm</span>
									</div>
								</div>

							</div>


							<!-- Adjustable Rails Suboption -->
							<div id="adjustable-rails-options" class="side-rail-options">
								<br>
								<label class="custom-control custom-checkbox">
									<input id="conveyor-side-rails-uhmw" type="checkbox" class="custom-control-input">
									<span class="custom-control-indicator"></span>
									<span class="custom-control-description">With UHMW baking</span>

								</label>
							</div>

							<div class="help-text-dialog container" data-field="side-rails" title="Side Rails">
								<br><br>

								<div class="row">
									<div class="col-6">
										<img class="w-100" src="./assets/side_rail-fixed.jpg">
										<br><br>
										<h6>Fixed Side Rail</h6>
										Fixed side rails are non-adjustable rails that result in a fixed width between the rails.
									</div>
									<div class="col-6">
										<img class="w-100" src="./assets/side_rail-adjustable.jpg">
										<br><br>
										<h6>Adjustable Side Rail</h6>
										With an adjustable side rail, the usable width and the height can be varied. The following adjustable side rails are available in the next choice box.
									</div>
								</div>

								<br>

							</div>

							<br>
							<br>

							<div class="form-group row">
								<div class="col">
									<button type="button" class="btn btn-primary btn-prev">Previous</button>
									<button type="submit" class="btn btn-primary float-right btn-next">Next</button>
								</div>
							</div>
						</form>
					</div>


					<!-- Stands -->
					<div class="step pl-0 pl-md-4">
						<div class="note-standard">* Items in bold are Yushin Standards and recommended values.</div>

						<form class="step-form" novalidate>

							<label  class="col-form-label">Stand Options</label>
							<!-- <br> -->

							<div class="form-group row">
								<!-- <div class="col-3">
									<label for="conveyor-stand-pedestal" class="w-100"><img class="w-100" src="./assets/stand-pedestal.jpg"></label>

									<label class="custom-control custom-radio m-0">
										<input id="conveyor-stand-pedestal" name="conveyor-stand" type="radio" class="custom-control-input" value="pedestal" required>
										<span class="custom-control-indicator"></span>
										<span class="custom-control-description">Pedestal Stand</span>


									</label>
								</div> -->

								<div class="col">
									<label for="conveyor-stand-leveling" class="w-100"><img class="w-100" src="./assets/stand-leveling.jpg"></label>

									<label class="custom-control custom-radio m-0">
										<input id="conveyor-stand-leveling" name="conveyor-stand" type="radio" class="custom-control-input" value="leveling">
										<span class="custom-control-indicator"></span>
										<span class="custom-control-description input-standard">Leveling Stand</span>
									</label>
								</div>

								<!-- <div id="telescoping-stand-col" class="col-3">
									<label for="conveyor-stand-telescoping" class="w-100"><img class="w-100" src="./assets/stand-telescoping.jpg"></label>

									<label class="custom-control custom-radio m-0">
										<input id="conveyor-stand-telescoping" name="conveyor-stand" type="radio" class="custom-control-input" value="telescoping">
										<span class="custom-control-indicator"></span>
										<span class="custom-control-description">Telescoping Stand</span>
									</label>
								</div> -->

								<div class="col">
									<label for="conveyor-stand-none" class="w-100"><img class="w-100" src="./assets/stand-none.jpg"></label>
									
									<label class="custom-control custom-radio m-0">
										<input id="conveyor-stand-none" name="conveyor-stand" type="radio" class="custom-control-input" value="none">
										<span class="custom-control-indicator"></span>
										<span class="custom-control-description">No Stands</span>
									</label>
								</div>
							</div>
							<br><br>


							<div id="stand-height-input" class="form-group row">
								<label for="conveyor-stand-height" class="col-3 col-form-label">
									Stand Height
									<small class="form-text text-info">Min Value: <span id="stand-height-min-value"></span><br></small>

									<small class="form-text text-info">Max Value: <span id="stand-height-max-value"></span></small>
								</label>
								<div class="col">
									<input id="conveyor-stand-height" type="number" class="form-control" step="any" required>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>

								<div class="col-2 pl-0">
									<select
										id="stand-height-unit"
										class="form-control"	
										required
									>
										<option
											value="mm"
											data-min="355"
											data-min-label="355 mm"
											data-max="2540"
											data-max-label="2540 mm"
											data-to-mm="1"
											data-decimal="0"
											selected
										>
											mm
										</option>
										<option
											value="in"
											data-min="14"
											data-min-label="14&quot;"
											data-max="100"
											data-max-label="100&quot;"
											data-to-mm="25.4"
											data-decimal="2"
										>in.</option>
									</select>
								</div>
							</div>

							<br>

							<div id="stand-quantity-input" class="form-group row no-stand-hidden">
								<label for="conveyor-stand-quantity" class="col-3 col-form-label">
									Quantity
									<small class="form-text text-info">Recommended value: <span class="stand-recommended-quantity"></span></small>
								</label>
								<div class="col">
									<input id="conveyor-stand-quantity" type="number" class="form-control" required>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>

								<div class="col-2">
									<span class="py-3"></span>
								</div>
							</div>

							<br>
							<br>

							<label class="custom-control custom-checkbox has-brackets-label no-stand-hidden">
								<input id="conveyor-has-bracket" type="checkbox" class="custom-control-input">
								<span class="custom-control-indicator"></span>
								<span class="custom-control-description input-standard">Has Floor Mounting Brackets</span>

							</label>

							<label class="custom-control custom-checkbox has-casters-label no-stand-hidden">
								<input id="conveyor-has-caster" type="checkbox" class="custom-control-input">
								<span class="custom-control-indicator"></span>
								<span class="custom-control-description">Has Casters</span>

							</label>

							<br><br><br><br>

							

							


							<div class="form-group row">
								<div class="col">
									<button type="button" class="btn btn-primary btn-prev">Previous</button>
									<button type="submit" class="btn btn-primary float-right btn-next">Next</button>
								</div>
							</div>
						</form>
					</div>



					<!-- Controls -->
					<div id="controls-step" class="step pl-0 pl-md-4">
						<form class="step-form" novalidate>
							<div class="container">
								<h2>Controls</h2>
								<div class="row">
									<div class="col-5">
										<img class="w-100" src="./assets/controls.png">
									</div>
									<div class="col small-85">
										Standard control with variable speed capability (included with conveyor)
										<br><br>

										<ul class="p-0">
											<li>Operates off 115 Volt AC line</li>
											<li>Filtered DC output for cooler motor operation, longer brush life, lower audible noise, and wider speed range</li>
											<li>NEMA 1 enclosure for environmental protection</li>
											<li>Trimpots on PC board to adjust torque limit, minimum speed limit, maximum speed limit, acceleration time, and voltage regulation</li>
											<li>Speed can be adjusted  manually using speed pot mounted on enclosure.</li>
											<li>Toggle switch on enclosure indicates AC power on.</li>
											<li>Factory installed AC line cable.</li>
										</ul>
										

									</div>
								</div>

								<br>

								<div class="form-group text-right">
									<div class="form-check">

										<label class="custom-control custom-checkbox">
											<input id="conveyor-controls" type="checkbox" class="custom-control-input form-check-input">
											<span class="custom-control-indicator"></span>
											<span class="custom-control-description">Addition of robot interface cable and indexing option to above control box</span>

										</label>

										<br>
										<small class="font-italic text-danger">Applicable for Yushin Servo Robots only. If another robot model or robot supplier is used, special quotation is required.</small>

									</div>
								</div>

								<br>

								<h2>Conveyor Detection Options</h2>
								<div class="row">
									<div class="col-5">
										<img class="w-100" src="./assets/controls-cdo.png">
									</div>
									<div class="col">
										<br>
										<ul class="p-0 small-85">
											<li>5"x7" Electrical enclosure to mount on conveyor side rail.</li>
											<li>Keyence sensors inclusive of leads and wiring.</li>
										</ul>

										<br>

										<div class="form-group mb-0">
											<div class="form-check mb-0">

												<label class="custom-control custom-checkbox form-check-label">
													<input id="conveyor-controls-cdo-1" type="checkbox" class="custom-control-input form-check-input">
													<span class="custom-control-indicator"></span>
													<span class="custom-control-description">Sensor set for "drop-zone clear" detection</span>

												</label>

											</div>
										</div>


										<div class="form-group mb-0">
											<div class="form-check mb-0">

												<label class="custom-control custom-checkbox form-check-label">
													<input id="conveyor-controls-cdo-2" type="checkbox" class="custom-control-input form-check-input">
													<span class="custom-control-indicator"></span>
													<span class="custom-control-description">Additional sensor set for "conveyor full" detection</span>

												</label>

											</div>
										</div>

										

									</div>
								</div>
							</div>

							<br><br>

							<div class="form-group row">
								<div class="col">
									<button type="button" class="btn btn-primary btn-prev">Previous</button>
									<button type="submit" class="btn btn-primary float-right btn-next">Next</button>
								</div>
							</div>

						</form>
					</div>


					<!-- Accessories -->
					<?php if( $hasAccessories ): ?>
						<div id="accessories-step" class="step pl-0 pl-md-4">
							<form class="step-form" novalidate>
								<div style="height: 350px; overflow-y: auto">
									<table class="table table-striped table-hover">
										<thead>
											<tr>
												<th scope="col">Part#</th>
												<th scope="col">Description</th>
												<th scope="col">Price</th>
												<th scope="col">Quantity</th>
											</tr>
										</thead>
										<tbody>
											<tr class="template">
												<td class="accessories-part"></td>
												<td class="accessories-desc"></td>
												<td class="accessories-price"></td>
												<td class="accessories-quantity"><input class="accessories-quantity form-control" type="number" name="" value="0" style="width: 100px; text-align: center;"></td>
											</tr>
										</tbody>
									</table>
								</div>
								

								<br>
								<br>

								<div class="form-group row">
									<div class="col">
										<button type="button" class="btn btn-primary btn-prev">Previous</button>
										<button type="submit" class="btn btn-primary float-right btn-next">Next</button>
									</div>
								</div>
							</form>
						</div>
					<?php endif; ?>


					<!-- Customer Information -->
					<div id="customer-info-step" class="step pl-0 pl-md-4">
						<form class="step-form" novalidate>

							<div class="form-group row">
								<label for="customer-contact" class="col-3 col-form-label">Contact</label>
								<div class="col">
									<div class="container">
										<div class="row">
											<select id="customer-contact-prefix" class="col-3 mr-1 form-control" required>
												<option>Choose...</option>
												<option>Mr.</option>
												<option>Ms.</option>
												<option>Mrs.</option>
											</select>

											<input id="customer-contact-first" type="text" class="form-control col mr-1" placeholder="First Name" required>

											<input id="customer-contact-last" type="text" class="form-control col" placeholder="Last Name" required>

											
										</div>
									</div>
									

									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>
							</div>


							<div class="form-group row">
								<label for="customer-company" class="col-3 col-form-label">Company</label>
								<div class="col">
									<input id="customer-company" type="text" class="form-control" required>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>
							</div>

							<div class="form-group row">
								<label for="customer-address-1" class="col-3 col-form-label">Address</label>
								<div class="col">
									<input id="customer-address-1" type="text" class="form-control mb-2" placeholder="Address Line 1" required>
									<input id="customer-address-2" placeholder="Address Line 2" type="text" class="form-control mb-2">
									<input id="customer-address-3" type="text" class="form-control mb-2" placeholder="City" required>
									<input id="customer-address-4" type="text" class="form-control mb-2" placeholder="State" required>
									<input id="customer-address-5" type="number" class="form-control mb-2" placeholder="Postal Code" required>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>
							</div>

							<div class="form-group row">
								<label for="customer-phone" class="col-3 col-form-label">Phone</label>
								<div class="col">
									<input id="customer-phone" type="tel" class="form-control" pattern="^\d{3}[ -]*\d{3}[ -]*\d{4}$" required>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>
							</div>

							<div class="form-group row">
								<label for="customer-email" class="col-3 col-form-label">Email</label>
								<div class="col">
									<input id="customer-email" type="text" class="form-control"  pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$" required>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>
							</div>

							<div class="form-group row">
								<label for="customer-notes" class="col-3 col-form-label">Notes</label>
								<div class="col">
									<textarea id="customer-notes" rows="4" class="form-control"></textarea>
									<div class="invalid-feedback">
										This is a required field.
									</div>
								</div>
							</div>


							<div class="form-group row">
								<div class="col">
									<button type="button" class="btn btn-primary btn-prev">Previous</button>
									<button id="finish-btn" type="submit" class="btn btn-primary float-right btn-submit">View Summary</button>
								</div>
							</div>

						</form>


					</div>


					<!-- Pricing -->
					<div id="pricing-step" class="step pl-0 pl-md-4">

						<div class="hidden-prices-show">
							
							<table class="pdf-table">
								<tr>
									<th>Quantity</th>
									<td><span>1</span></td>
								</tr>
								<tr>
									<th>Type</th>
									<td><span class="drive-type-label"></span></td>
								</tr>
								<tr>
									<th>Drive Version</th>
									<td><span class="drive-version-label"></span></td>
								</tr>
								<tr>
									<th>Drive Location</th>
									<td><span class="drive-location-label"></span><span>-hand side (as product travels along belt)<span></td>
								</tr>
								<tr>
									<th>Drive Drum</th>
									<td><span>Drive drum surface is </span><span class="drive-drum-surface-label"></span></td>
								</tr>
								<tr>
									<th>Infeed Tail</th>
									<td><span class="infeed-tail-label"></span></td>
								</tr>
								<tr>
									<th>Discharge Tail</th>
									<td><span class="discharge-tail-label"></span></td>
								</tr>
							</table>

							<br>

							<table class="pdf-table">
								<tr>
									<th>Overall Length</th>
									<td>
										<span class="frame-length-mm"></span>
										<span> mm ( </span>
										<span class="frame-length-in"></span>
										<span> in )</span>
									</td>
								</tr>

								<tr>
									<th>Overall Width</th>
									<td>
										<span class="frame-width-mm"></span>
										<span> mm ( </span>
										<span class="frame-width-in"></span><span> in )</span>
									</td>
								</tr>
								<tr>
									<th>Support Rolls</th>
									<td>
										<span>Conveyor requires </span>
										<span class="support-rolls-number"></span>
										<span> belt support roll(s)</span>
									</td>
								</tr>
								<tr>
									<th>Incline</th>
									<td><span class="incline-label"></span></td>

								</tr>
							</table>
							<br>

							<table class="pdf-table">
								<tr>
									<th>Belt</th>
									<td>

										<span class="belt-na">N/A</span>

										<span class="belt-label">Belt# <span class="belt-number"></span><br>
										This is a <span class="belt-color"></span>, <span class="belt-material"></span> belt.</span>

									</td>
								</tr>
								<tr>
									<th>Belt Width</th>
									<td>
										<span class="belt-na">n.a.</span>

										<span class="belt-label"><span class="belt-width-mm"></span> mm ( <span class="belt-width-in"></span> in )</span>
									</td>
									</tr>
								<tr>
									<th>Slider Bed</th>
									<td>
										<span>Belt rides on a </span>
										<span class="slider-label"></span>
										<span> Steel Slider</span>
									</td>
								</tr>
							</table>
							<br>

							<table class="pdf-table">
								<tbody data-margin-bottom="100">
									<tr>
										<th>Product Load</th>
										<td><span class="load-label"></span><span> lbs</span></td>
									</tr>

									<tr>
										<th>Accumulation</th>
										<td>
											<span class="accumulating">Yes. Product accumulation is allowed</span>

											<span class="continuous">No. Product accumulation is NOT allowed</span>
										</td>
									</tr>	
								</tbody>
								
							</table>
							<br>

							<table class="pdf-table">
								<tr>
									<th>Speed</th>
									<td>
										<span class="speed-label"></span>
										<span> fpm<br>
										Speed is </span>
										<span class="speed-mode-label"></span>
									</td>
								</tr>
								<tr>
									<th>Motor</th>
									<td>
										<span class="motor-manufacturer-label"></span>
										<span> </span>
										<span class="motor-description"></span>
										<span> motor
										<br>Motor </span>
										<span class="motor-hp"></span>
										<span> Hp</span>
									</td>
								</tr>
								<tr>
									<th>Speed Control</th>
									<td>
										<span>Bodine Speed Control<br>
										115 VAC line input, 130 VDC Output<br>
										</span>

										<span class="motor-cord-control"></span>
									</td>
								</tr>

							</table>
							<br>

							<table class="pdf-table">
								<tr>
									<th>Control Options</th>
									<td>
										<span class="none-1">Continuous Run
											<br></span>
										<span class="control-1">
											Robot Interface Cable and Indexing Option<br>

											<!-- ADD YOUR TEXT HERE -->
											<small class="font-weight-bold text-danger">Applicable for Yushin Servo Robots only. If another robot model or robot supplier is used, special quotation is required.</small>
										</span>
									</td>
								</tr>
								<tr>
									<th>Detection Options</th>
									<td>
										<span class="none-2">None requested
											<br></span>
										<span class="control-2">Sensor Set for 'Drop-Zone Clear' detection
											<br></span>
										<span class="control-3">Additional Sensor Set for 'Conveyor Full' detection</span>
									</td>
								</tr>
							</table>
							<br>

							<table class="pdf-table">
								<tr>
									<th>Side Rails</th>
									<td>
										<span class="rail-system"></span><br>
										<span class="side-rail-oal-container">
											<span class="side-rail-oal"></span> mm OAL
											<br>
										</span>
										<span class="side-rail-desc-1"></span>
										<span>
											<br></span>
										<span class="side-rail-desc-2"></span>
									</td>
								</tr>
							</table>
							<br>

							<table class="pdf-table">
								<tr>
									<th>Stands</th>
									<td>
										<span class="stand-none">No Stands</span>
										<span class="stand-quantity-container">Quantity: <span class="stand-quantity"></span>
										<br></span>
										<span class="stand-height-label"></span>
										<span>
										<br></span>
										<span class="stand-extras-desc"></span>
										<span>
										<br></span>
										<span class="stand-stringers-desc"></span>
									</td>
								</tr>
							</table>

							<table class="pdf-table">
								<tr>
									<th>Special Notes</th>
									<td>
										<span class="customer-notes"></span>
									</td>
								</tr>
							</table>


							<table class="pdf-table">
								
							</table>

							<table class="pdf-table end-price">
								<tr class="end-price-tr">
									<th>Net Price</th>
									<td>
										<span class="total-price price-top"></span>
										<span> / ea</span>
									</td>
								</tr>
								
							</table>
						</div>



						<div class="hidden-prices-hide">
							<div class="pdf-table">
								<h3>Frame</h3>
								<div class="ml-5 pdf-subtext">Conveyer Width: <span class="frame-width"></span></div>
								<div class="ml-5 pdf-subtext">Conveyer Length: <span class="frame-length"></span></div>
								<div class="price-top ml-5"><b>Sub-Total Price:<span class="frame-price float-right">$</span></b></div>
								<br>
							</div>
							

							<div class="pdf-table">
								<h3>Support Rolls</h3>
								<div class="ml-5 w-75 pdf-subtext">Number of support rolls: <span class="support-roll-number"></span></div>
								<div class="ml-5 w-75 pdf-subtext hidden-prices-hide">Price per support roll: <span class="support-roll-price"></span></div>
								<div class="price-top ml-5"><b>Sub-Total Price:<span class="support-roll-total-price float-right"></span></b></div>
								<br>
							</div>

							<div class="pdf-table">
								<h3>Drive</h3>

								<!-- <div class="pdf-container"> -->
									<div class="ml-5 w-75 pdf-subtext">Drive Version: <span class="drive-version"></span></div>
									<div class="ml-5 w-75 pdf-subtext">Drive Location: <span class="drive-location"></span></div>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="drive-part-num"></span></div>

									<div class="price-top ml-5"><b>Sub-Total Price:<span class="drive-version-total-price float-right"></span></b></div>
									<br>
								<!-- </div> -->
								

								<div class="drive-width-vars pdf-container hidden-prices-hide">
									<h6>Drive Width Vars</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="drive-width-vars-part"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="drive-width-vars-total-price float-right"></span></b></div>
									<br>
								</div>

								
								<div class="drive-drum-container pdf-container hidden-prices-hide">
									<h6>Drive Drum</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="drive-drum-part"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="drive-drum-total-price float-right"></span></b></div>
									<br>
								</div>

								<div class="pdf-container">
									<h6>Drive Train</h6>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="drive-train-price float-right"></span></b></div>
								</div>
								
								<br>
							</div>
							

							

							<div class="pdf-table">
								<h3>Infeed</h3>

								<!-- <div class="pdf-container"> -->
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="infeed-tail-part"></span></div>
									<div class="ml-5 price-top"><b>Sub-Total Price:<span class="infeed-tail-total-price float-right"></span></b></div>
									<br>
								<!-- </div> -->

								<div class="pdf-container">
									<h6>Infeed Tail Width Vars</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="infeed-width-vars-part"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="infeed-width-vars-total-price float-right"></span></b></div>
									<br>
								</div>
							</div>
							

							<div class="pdf-table outfeed">
								<h3>Outfeed</h3>

								<!-- <div class="pdf-container"> -->
									<div class="ml-5 w-75 pdf-subtext hidden-prices-hide">Part#: <span class="outfeed-tail-part"></span></div>
									<div class="ml-5 price-top "><b>Sub-Total Price:<span class="outfeed-tail-total-price float-right"></span></b></div>
									<br>
								<!-- </div> -->
								

								<div class="pdf-container hidden-prices-hide">
									<h6>Outfeed Tail Width Vars</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="outfeed-width-vars-part"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="outfeed-width-vars-total-price float-right"></span></b></div>
									<br>
								</div>
							</div>


							<div class="pdf-table">
								<h3>Motors</h3>

								<div class="ml-5 w-75 pdf-subtext"><i><span class="motor-note text-danger"></span></i></div>
								

								<div class="ml-5 w-75 pdf-subtext">Load: <span class="motor-load"></span></div>
								<div class="ml-5 w-75 pdf-subtext">Max Speed: <span class="motor-max-speed"></span></div>
								<div class="ml-5 w-75 pdf-subtext">Speed Mode: <span class="motor-speed-mode"></span></div>
								<div class="ml-5 w-75 pdf-subtext">Mode of Operations: <span class="motor-ops-mode"></span></div>
								<div class="ml-5 w-75 pdf-subtext">Voltage: <span class="motor-voltage"></span></div>

								<br>
								<div class="pdf-container">
									<h6>Motor</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="motor-model"></span></div>
									<div class="ml-5 w-75 pdf-subtext">Manufacturer: <span class="motor-manufacturer"></span></div>
									<div class="ml-5 w-75 pdf-subtext">Horse Power: <span class="motor-hp"></span> hp</div>
									<div class="ml-5 w-75 pdf-subtext">Output Speed: <span class="motor-speed"></span> rpm</div>
									<div class="ml-5 w-75 pdf-subtext">Torque: <span class="motor-torque"></span> lb-in</div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="motor-price float-right"></span></b></div>
								</div>
								

								<div class="motor-adapter-plate-container pdf-container">
									<br>
									<h6>Adapter Plate</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="motor-adapter-plate"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="motor-adapter-plate-price float-right"></span></b></div>
								</div>
							

								<div class="motor-terminal-box-container pdf-container">
									<br>
									<h6>Terminal Box</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="motor-terminal-box"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="motor-terminal-box-price float-right"></span></b></div>
								</div>

								<div class="motor-capacitor-container pdf-container">
									<br>
									<h6>Capacitor</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="motor-capacitor"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="motor-capacitor-price float-right"></span></b></div>
								</div>

								<div class="motor-speed-control-container pdf-container">
									<br>
									<h6>Speed Control</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="motor-speed-control"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="motor-speed-control-price float-right"></span></b></div>
								</div>

								<div class="motor-hp-resistor-container pdf-container">
									<br>
									<h6>HP Resistor</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="motor-hp-resistor"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="motor-hp-resistor-price float-right"></span></b></div>
								</div>

								<div class="motor-arm-fuse-container pdf-container">
									<br>
									<h6>Armature Fuse</h6>
									<div class="ml-5 w-75 pdf-subtext">Part#: <span class="motor-arm-fuse"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="motor-arm-fuse-price float-right"></span></b></div>
								</div>

								<br>

							</div>
							

							<div class="pdf-table">
								<h3>Belt</h3>
								<div class="ml-5 no-belt-selected pdf-subtext"><i>No Belt Selected</i></div>
								<div class="ml-5 w-75 pdf-subtext">Surface Material: <span class="belt-values belt-surface-material"></span></div>
								<div class="ml-5 w-75 pdf-subtext">Surface Description: <span class="belt-values belt-surface-desc"></span></div>
								<div class="ml-5 w-75 pdf-subtext">Surface Color: <span class="belt-values belt-surface-color"></span></div>
								<div class="ml-5 w-75 pdf-subtext">Max Temp[&#176;F]: <span class="belt-values belt-max-temp"></span></div>
								<div class="ml-5 w-75 pdf-subtext">Notes: <span class="belt-values belt-notes"></span></div>
					
								<div class="ml-5 mt-3 w-75 pdf-subtext">
									Belt Width:
									<span class="belt-na">n.a.</span>
									<span class="belt-label">
										<span class="belt-width-mm"></span> mm 
										( <span class="belt-width-in"></span> in )
									</span>
								</div>

								<div class="ml-5 w-75 pdf-subtext">
									Belt Width:
									<span class="belt-na">n.a.</span>
									<span class="belt-label">
										<span class="belt-length-mm"></span> mm 
										( <span class="belt-length-in"></span> in )
									</span>
								</div>

								
								<div class="ml-5 price-top"><b>Sub-Total Price:<span class="belt-total-price float-right"></span></b></div>
								<br>
							</div>
							

							<div class="pdf-table">
								<h3>Rail System</h3>
								<div class="ml-5 w-75 pdf-subtext">Rails: <span class="side-rails-note"></span></div>

								<div class="ml-5 price-top"><b>Sub-Total Price:<span class="side-rails-total-price float-right"></span></b></div>
								<br>
							</div>
							

							<div class="pdf-table">
								<h3>Stand System</h3>
								<div class="ml-5 w-75 pdf-subtext">Stand Type: <span class="stand-type"></span></div>

								<div class="ml-5 w-75 pdf-subtext stand-height-label">Height: <span class="stand-height"></span></div>

								<div class="ml-5 w-75 pdf-subtext hidden-prices-hide">Base Price: <span class="stand-price"></span></div>

								<div class="ml-5 w-75 pdf-subtext">Quantity: <span class="stand-quantity"></span></div>


								<div class="ml-5 price-top"><b>Sub-Total Price:<span class="stand-total-price float-right"></span></b></div>
								<br>

								<div class="leveling pdf-container">
									<h6>Floor Mounting Brackets</h6>
									<div class="ml-5 w-75 pdf-subtext hidden-prices-hide">Base Price: <span class="stand-leveling-price"></span></div>
									<div class="ml-5 w-75 pdf-subtext">Quantity: <span class="stand-leveling-quantity"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="stand-leveling-total-price float-right"></span></b></div>
									<br>
								</div>
								<br>

								<div class="casters pdf-container">
									<h6>Casters</h6>
									<div class="ml-5 w-75 pdf-subtext hidden-prices-hide">Base Price: <span class="stand-caster-price"></span></div>
									<div class="ml-5 w-75 pdf-subtext">Quantity: <span class="stand-caster-quantity"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="stand-caster-total-price float-right"></span></b></div>
									<br>
								</div>

								<div class="stringers pdf-container">
									<h6>Stringers</h6>
									<div class="ml-5 w-75 pdf-subtext hidden-prices-hide">Base Price: <span class="stand-stringers-price"></span></div>
									<div class="ml-5 w-75 pdf-subtext hidden-prices-hide">Mtg Price: <span class="stand-stringers-mtg-price"></span></div>
									<div class="ml-5 w-75 pdf-subtext">Quantity: <span class="stand-stringers-quantity"></span></div>
									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="stand-stringers-total-price float-right"></span></b></div>
									<br>
								</div>
								
							</div>
							

							<div class="pdf-table accessories-container">
								<h3>Accessories</h3>
								<div class="accessories pdf-container">
									<div class="template ml-5 w-75 pdf-subtext">(<span class="accessories-part"></span>) <span class="accessories-description"></span>: <span class="accessories-quantity"></span> * <span class="accessories-price"></span></div>
								</div>
								<div class="ml-5 price-top"><b>Sub-Total Price:<span class="accessories-total-price float-right"></span></b></div>
							</div>

							<hr>
							<br>


							<div class="pdf-table">
								<h3>Pricing Scheme</h3>

								<div class="pdf-container">
									<h6>Price Increase</h6>
									<div class="ml-5 w-75 pdf-subtext">Base Price: <span class="base-price"></span></div>
									<div class="ml-5 w-75 pdf-subtext">Price Increase: <span class="price-inc1"></span></div>

									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="price-inc1-price float-right"></span></b></div>
								</div>
								
							
								<div class="pdf-container">
									<h6>Price Increase</h6>
									<div class="ml-5 w-75 pdf-subtext">Price Increase: <span class="price-inc2"></span></div>

									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="price-inc2-price float-right"></span></b></div>
								</div>


								<div class="pdf-container">
									<h6>Packaging</h6>

									<div class="ml-5 w-75 pdf-subtext">Packaging Price: <span class="price-packaging"></span></div>

									<div class="ml-5 price-second"><b>List Price:<span class="price-list-price float-right"></span></b></div>
								</div>



								<div class="pdf-container">
									<h6>Discount</h6>
									<div class="ml-5 w-75 pdf-subtext">Discount Given: <span class="price-discount"></span></div>

									<div class="ml-5 price-second"><b>Yushin Net:<span class="price-yushin-net float-right"></span></b></div>
								</div>

								


								<br>

								<div class="pdf-container">
									<h6>End Price <i>(without controls)</i></h6>
									<div class="ml-5 w-75 pdf-subtext">Markup: <span class="price-markup"></span></div>

									<div class="ml-5 price-second"><b>Subtotal Price:<span class="price-total float-right"></span></b></div>
								</div>
							</div>
							<br>
							<hr>
							<br>

							<!-- Controls -->
							<div class="pdf-table">
								<h3>Controls</h3>



								<div class="ml-5 w-75 pdf-subtext no-control-options">No control options</div>

								<div class="pdf-container control-container-1">
									<h6></h6>

									<div class="ml-5 w-75 pdf-subtext">Addition of robot interface cable and indexing option to above control box</div>

									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="control-1-price float-right"></span></b></div>
								</div>
								<br>

								<div class="pdf-container control-container-2">
									<h6></h6>

									<div class="ml-5 w-75 pdf-subtext">Addition of robot interface cable and indexing option to above control box</div>

									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="control-2-price float-right"></span></b></div>
								</div>
								<br>

								<div class="pdf-container control-container-3">
									<h6></h6>

									<div class="ml-5 w-75 pdf-subtext">Addition of robot interface cable and indexing option to above control box</div>

									<div class="ml-5 price-second"><b>Sub-Total Price:<span class="control-3-price float-right"></span></b></div>
								</div>
							</div>

						</div>


						

						
						<br><br>

						<div class="pdf-table  end-price">
							<h3  class="d-inline-block m-0 show-price">END PRICE</h3>
							&nbsp;
							<button type="button" onclick="generatePDF()" class="btn btn-secondary">Generate QUOTE</button>

							<div class="float-right price-top font-weight-bold"><span class="total-price"></span></div>
						</div>
				<!-- </form> -->

				<br>




				</div>
			</div>

			<div id="about-spacer" class="col-3 pr-0 d-none"></div>
			<div id="about-container" class="col-3 text-center p-0 d-none">
				<img class="w-100 preview" src="./assets/gufp2000.png"><br><br>
				<h5 class="title p-1">GUF-P 2000</h5>
				<br>

				<i>Our most popular and versatile conveyor</i><br><br><br>

				<table class="text-left">
					<tr>
						<th>Max Load: </th>
						<td>250 lbs</td>
					</tr>
					<tr>
						<th>Length: </th>
						<td>Variable up to 32'</td>
					</tr>
					<tr>
						<th>Widths: </th>
						<td>1.96" to 31.5"</td>
					</tr>
					<tr>
						<th>Speeds: </th>
						<td>Upto 260 fpm</td>
					</tr>
					<tr>
						<th  class="pr-4">Frame Height: </th>
						<td>1.96"</td>
					</tr>
				</table>

				<!-- <b>Max Load: </b> 250lbs<br>
				<b>Length: </b> Variable upto 32' -->
			</div>
		</div>
	</div>
</div>