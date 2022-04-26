<?php 
	require './controllers/universities/requestsClass.php';

	function init($req) {
		$unies = new Universities();
		$uniEntry = $unies->deleteCourse($req);

		if ($uniEntry) {
			echo json_encode(['status' => 'Success: 200 (Course deleted)', 'body' => $uniEntry]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}