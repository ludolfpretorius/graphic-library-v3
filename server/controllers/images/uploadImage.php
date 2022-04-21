<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		$img = new Image();
		$resp = $img->upload($req);

		if ($resp !== 'Error') {
			echo json_encode(['status' => 'Success: 200 (Image uploaded)', 'body' => $resp]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}

	