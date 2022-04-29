<?php 
	require './controllers/authentication/requestsClass.php';

	function init($req) {
		$user = new Auth();
		$logout = $user->logout();

		if ($logout) {
			setcookie('graphic-lib-session', 'null', time() - 1000, '/', '', true, true);
			echo json_encode(['status' => 'Success: 200 (Logged out)', 'body' => null]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}