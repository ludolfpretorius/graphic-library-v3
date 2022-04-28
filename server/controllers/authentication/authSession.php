<?php 
	require './controllers/authentication/requestsClass.php';

	function init($req) {
		$user = new Auth();
		$session = $user->authSession();

		if ($session['success']) {
			echo json_encode(['status' => 'Success: 200 (Session authenticated)', 'body' => ['user' => $session['user']]]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}