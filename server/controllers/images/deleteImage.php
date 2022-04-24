<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		$img = new Image();
		$imageEntry = $img->delete($req);

		if ($imageEntry) {
			echo json_encode(['status' => 'Success: 200 (Image deleted)', 'body' => $imageEntry]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}

	