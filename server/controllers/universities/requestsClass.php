<?php
	require './controllers/universities/utils.php';

	class Universities {
		private $uniesFile = './db/universities.json';

		function fetchAll() {
			$data = file_get_contents($this->uniesFile);
			return json_decode($data);
		}

		function addNew($req) {
			$allUnies = json_decode(file_get_contents($this->uniesFile));
			$newUni['id'] = $allUnies[count($allUnies) - 1]->id + 1;
			$newUni['name'] = $req['data']['name'];
			$newUni['acronym'] = $req['data']['acronym'];
			$newUni['courses'] = [];

			appendToJsonFile($this->uniesFile, $newUni);
			$output = file_get_contents($this->uniesFile);
			
			return json_decode($output);
		}

		function addNewCourse($req) {
			$unies = json_decode(file_get_contents($this->uniesFile));
			$selectedUni = null;
			foreach ($unies as $uni) {
				if ($uni->acronym === $req['data']['uni']) {
					$selectedUni = $uni;
				}
			}
			$selectedUni->courses[] = $req['data']['course'];

			updateJsonFile($this->uniesFile, $selectedUni, $selectedUni->id);
			$output = file_get_contents($this->uniesFile);
			
			return json_decode($output);
		}

		function deleteUni($req) {
			$successfullyDeletedFromDB = removeFromJsonFile($this->uniesFile, $req['data']['id']);
			return $successfullyDeletedFromDB ? $req['data'] : null;
		}

		function deleteCourse($req) {
			$unies = json_decode(file_get_contents($this->uniesFile));
			$selectedUni = null;
			foreach ($unies as $uni) {
				if ($uni->id === $req['data']['id']) {
					$selectedUni = $uni;
				}
			}
			foreach ($selectedUni->courses as $i => $course) {
				if ($course === $req['data']['course']) {
					array_splice($selectedUni->courses, $i, 1);
				}
			}
			$successfullyDeletedFromDB = updateJsonFile($this->uniesFile, $selectedUni, $req['data']['id']);
			return $successfullyDeletedFromDB ? $selectedUni : null;
		}

	}