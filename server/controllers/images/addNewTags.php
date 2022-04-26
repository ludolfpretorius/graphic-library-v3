<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		$image = new Image();
		$allTags = $image->addNewTags($req);
		
		if ($allTags) {
			echo json_encode(['status' => 'Success: 200 (New tags added)', 'body' => $allTags]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}