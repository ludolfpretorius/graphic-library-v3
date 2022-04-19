<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		

		$img = new Image();
		$allImgs = $img->delete($req);

		if ($allImgs) {
			echo json_encode(['status' => 'Success: 200 (Image deleted)', 'body' => $allImgs]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}

	