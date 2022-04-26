<?php
	require('./utilities.php');
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$obj = new stdClass();
		$obj->id = count(json_decode(file_get_contents('../db/ups.json'))) + 1;
		$obj->name = $_POST['name'];
		$obj->acronym = $_POST['acronym'];
		$courses = preg_match('/[,]/', $_POST['courses']) ? explode(',', $_POST['courses']) : [$_POST['courses']];
		foreach ($courses as $c) {
			$obj->courses[] = trim($c);
		}
		if (!empty($_POST['schools'])) {
			$schools = preg_match('/[,]/', $_POST['schools']) ? explode(',', $_POST['schools']) : [$_POST['schools']];
			foreach ($schools as $s) {
				$obj->schools[] = trim($s);
			}
		} else {
			$obj->schools = [];
		}
		appendToJsonFile('../db/ups.json', $obj);

		$output = file_get_contents('../db/ups.json');
		echo $output;
	}