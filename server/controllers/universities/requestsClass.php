<?php
	require './controllers/universities/utils.php';

	class Universities {
		private $uniesFile = './db/universities.json';

		function fetchAll() {
			$data = file_get_contents($this->uniesFile);
			return json_decode($data);
		}

		function addNew($req) {
			$uniesLength = count(json_decode(file_get_contents($this->uniesFile)));
			$newUni['id'] = $uniesLength + 1;
			$newUni['name'] = $req['data']['name'];
			$newUni['acronym'] = $req['data']['acronym'];
			$newUni['courses'] = [];

			writeToJsonFile($this->uniesFile, $newUni);
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

	}