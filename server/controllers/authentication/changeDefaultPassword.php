<?php 
	require './controllers/authentication/requestsClass.php';

	function init($req) {
		$user = new Auth();
		$changed = $user->changeDefaultPassword($req);

		if ($changed['success']) {
			echo json_encode(['status' => 'Success: 200 (Default password changed)', 'body' => null]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}