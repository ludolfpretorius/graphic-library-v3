<?php 
	require './controllers/authentication/requestsClass.php';

	function init($req) {
		$user = new Auth();
		$login = $user->login($req);

		if ($login['success']) {
			$cookiedata = $login['cookie'];
			unset($login['cookie']);

			echo json_encode(['status' => 'Success: 200 (Logged in)', 'body' => ['user' => $login['user']]]);
			setcookie('graphic-lib-session', $cookiedata, time() + (86400 * 30), '/');

		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}