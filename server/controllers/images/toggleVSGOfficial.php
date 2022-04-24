<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		$image = new Image();
		$imgData = $image->toggleVSGOfficial($req);
		
		if ($imgData) {
			echo json_encode(['status' => 'Success: 200 (Image VSG data upadated)', 'body' => $imgData]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}