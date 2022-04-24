<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		$image = new Image();
		$imgData = $image->editImageTags($req);
		
		if (true) {
			echo json_encode(['status' => 'Success: 200 (Image tags updated)', 'body' => $imgData]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}