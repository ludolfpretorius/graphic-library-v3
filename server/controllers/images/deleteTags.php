<?php 
	require './controllers/images/requestsClass.php';

	function init($req) {
		$image = new Image();
		$allTags = $image->deleteTags($req);
		
		if ($allTags) {
			echo json_encode(['status' => 'Success: 200 (Tags deleted)', 'body' => $allTags]);
		} else {
			echo json_encode(['status' => 'Error: 400 (Bad request)']);
		}
	}