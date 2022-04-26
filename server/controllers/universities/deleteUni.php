<?php 
	require './controllers/universities/requestsClass.php';

	function init($req) {
		$unies = new Universities();
		$uniEntry = $unies->deleteUni($req);

		if ($uniEntry) {
			echo json_encode(['status' => 'Success: 200 (University deleted)', 'body' => $uniEntry]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}