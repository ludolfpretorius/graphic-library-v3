<?php 
	require './controllers/guest/requestsClass.php';

	function init($req) {
		$guest = new Guest();
		$success = $guest->expireLink($req);

		if ($success) {
			echo json_encode(['status' => 'Success: 200 (Link expired)', 'body' => null]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}