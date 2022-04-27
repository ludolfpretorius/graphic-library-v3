<?php 
	require './controllers/guest/requestsClass.php';

	function init($req) {
		$guest = new Guest();
		$guestImages = $guest->fetchImages($req);

		if ($guestImages) {
			echo json_encode(['status' => 'Success: 200 (Fetched guest images)', 'body' => $guestImages]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}