<?php 
	require './controllers/universities/requestsClass.php';

	function init($req) {
		$unies = new Universities();
		$allUnies = $unies->fetchAll();

		if ($allUnies) {
			echo json_encode(['status' => 'Success: 200 (Fetched all universities)', 'body' => $allUnies]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}