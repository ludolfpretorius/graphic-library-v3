<?php 
	require './controllers/authentication/requestsClass.php';

	function init($req) {
		$user = new Auth();
		$changed = $user->changePassword($req);

		if ($changed['success']) {
			echo json_encode(['status' => 'Success: 200 (Password changed)', 'body' => null]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}