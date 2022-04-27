<?php
	require './controllers/guest/utils.php';
	
	class Guest {
		private $tokensFile = './db/tokens.json';
		private $imagesFile = './db/images.json';

		function fetchData($req) {
			$data = json_decode(file_get_contents($this->tokensFile));
			$guestData = null;
			foreach($data as $guest) {
				if ($guest->token === $req['data']['token'] && $guest->expires > time()) {
					$guestData = $guest;
				}
				if ($guest->expires < time()) {
					removeFromJsonFile($this->tokensFile, $guest->id);
				}
			}
			return $guestData;
		}

		function fetchImages($req) {
			$data = json_decode(file_get_contents($this->imagesFile));
			$guestImages = [];
			foreach($data as $img) {
				$uni = strlen($req['data']['uni']) ? $img->up === $req['data']['uni'] : true;
				$course = strlen($req['data']['course']) ? $img->course === $req['data']['course'] : true;
				$keyword = strlen($req['data']['keyword']) ? in_array($req['data']['keyword'], $img->tags) : true;
				if ($uni && $course && $keyword) {
					$guestImages[] = $img;
				}
			}
			return $guestImages;
		}

		function expireLink($req) {
			$data = json_decode(file_get_contents($this->tokensFile));
			$guestData = null;
			foreach($data as $guest) {
				if ($guest->token === $req['data']['token']) {
					$guestData = $guest;
				}
			}
			removeFromJsonFile($this->tokensFile, $guestData->id);
			return true;
		}

	}