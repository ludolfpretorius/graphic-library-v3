<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		$img = new Image();
		$link = $img->generateShareableLink($req);

		if ($link) {
			echo json_encode(['status' => 'Success: 200 (Link generated)', 'body' => $link]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}