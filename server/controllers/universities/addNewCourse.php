<?php 
	require './controllers/universities/requestsClass.php';

	function init($req) {
		$unies = new Universities();
		$allUnies = $unies->addNewCourse($req);

		if ($allUnies) {
			echo json_encode(['status' => 'Success: 200 (New course added)', 'body' => $allUnies]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}