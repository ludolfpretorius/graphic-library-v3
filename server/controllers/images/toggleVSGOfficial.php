<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		$image = new Image();
		$allTags = $image->toggleVSGOfficial($req);
		
		if (true) {
			echo json_encode(['status' => 'Success: 200 (Image VSG data upadated)', 'body' => $allTags]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}