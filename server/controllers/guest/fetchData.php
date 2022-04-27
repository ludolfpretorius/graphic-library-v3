<?php 
	require './controllers/guest/requestsClass.php';

	function init($req) {
		$guest = new Guest();
		$guestData = $guest->fetchData($req);

		if ($guestData) {
			echo json_encode(['status' => 'Success: 200 (Guest is valid)', 'body' => $guestData]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}