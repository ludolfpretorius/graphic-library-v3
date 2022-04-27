<?php
	function updateJsonFile($filepath, $updatedObject, $id) {
		$data = json_decode(file_get_contents($filepath));
		$index = null;
		foreach ($data as $i => $obj) {
			if ($obj->id === $id) {
				$index = $i;
			} 
		}
		$data[$index] = $updatedObject;
		file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT));
	}

	function removeFromJsonFile($filepath, $id) {
		$data = json_decode(file_get_contents($filepath));
		$index = null;
		foreach ($data as $ind => $obj) {
			if ($obj->id === $id) {
				$index = $ind;
			} 
		}
		$successfullyDeleted = array_splice($data, $index, 1);
		if ($successfullyDeleted) {
			file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT));
		}
	}

	function appendToJsonFile($filepath, $newObject) {
		$data = json_decode(file_get_contents($filepath));
		$data[] = $newObject;
		$wroteSuccessfully = file_put_contents($filepath, json_encode($data, JSON_PRETTY_PRINT));
		return $wroteSuccessfully;
	}

	function writeJsonFile($filepath, $array) {
		$wroteSuccessfully = file_put_contents($filepath, json_encode($array, JSON_PRETTY_PRINT));
		return $wroteSuccessfully;
	}
	
	function removeImageFile($folderPath, $filename) {
		$location = $folderPath.$filename.'.svg';
		$successfullyDeletedImageFile = unlink($location);
		return $successfullyDeletedImageFile;
	}