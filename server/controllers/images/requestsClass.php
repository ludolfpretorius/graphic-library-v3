<?php
	require './controllers/images/utils.php';

	class Image {
		private $imagesFile = './db/images.json';
		private $imagesFolder = './upload/';
		private $tagsFile = './db/tags.json';
		private $tokensFile = './db/tokens.json';

		private function createRandomString() {
            $length = random_bytes('12');
            $name = bin2hex($length);
            return $name;
        }

		function fetchAll() {
			$data = file_get_contents($this->imagesFile);
			return json_decode($data);
		}

		function fetchTags() {
			$data = file_get_contents($this->tagsFile);
			return json_decode($data);
		}

        function toggleVSGOfficial($req) {
            $data = json_decode(file_get_contents($this->imagesFile));
            $selectedImage = null;
            foreach ($data as $image) {
                if ($image->id === $req['data']['id']) {
                    $selectedImage = $image;
                }
            }
            $selectedImage->vsgOfficial = $selectedImage->vsgOfficial === true ? false : true;

            updateJsonFile($this->imagesFile, $selectedImage, $selectedImage->id);
            // $output = file_get_contents($this->imagesFile);

            return $selectedImage;
        }

		function upload($req) {
			$uploadedFile = $_FILES['file1'];
			if ($uploadedFile) {
                $mimeType = $uploadedFile['type'];
                $allowedFileTypes = ['image/svg+xml'];
                if (!in_array($mimeType, $allowedFileTypes)) {
                    return 'Error';
                }
            }

			$successfullyMoved = false;
			$successfullyUploaded = false;
			$filename = '';
			foreach ($_FILES as $key => $file) {
				$folder = $this->imagesFolder;
				$filename = $this->createRandomString();
				$location = $folder.$filename.'.svg';
				$successfullyMoved = move_uploaded_file($_FILES[$key]['tmp_name'], $location);
				if ($successfullyMoved) {
					$imagesLength = count(json_decode(file_get_contents($this->imagesFile)));
					$uploadedInfo = json_decode($req['data']);
					$imageEntry = [];
					$imageEntry['id'] = $imagesLength + 2;
					foreach($uploadedInfo as $type => $value) {
						$imageEntry[$type] = $value;
					}
					$imageEntry['url'] = $filename;
					$successfullyUploaded = writeToJsonFile($this->imagesFile, $imageEntry);
				}
			}

			if ($successfullyUploaded) {
				// $allImages = $this->fetchAll();
				return $imageEntry;
			}
			return null;
		}

		function delete($req) {
			$successfullyDeletedImageFile = removeImageFile($this->imagesFolder, $req['data']['url']);
			if ($successfullyDeletedImageFile) {
				$successfullyDeletedFromDB = removeFromJsonFile($this->imagesFile, $req['data']['id']);
			}
			if ($successfullyDeletedFromDB) {
				$allImages = $this->fetchAll();
				return $allImages;
			}
			return $successfullyDeletedFromDB;
		}

		function generateShareableLink($req) {
			$tokensData = json_decode(file_get_contents($this->tokensFile));
			$newToken = $this->createRandomString();

			$newTokenData['id'] = count($tokensData) + 1;
			$newTokenData['token'] = $newToken;
			$newTokenData['filter'] = ['uni' => $req['data']['uni'], 'course' => $req['data']['course'], 'keyword' => $req['data']['keyword']];
			$newTokenData['link'] = $req['data']['url'].'?t='.$newToken;

			if ($req['expire'] === '2') {
				$newTokenData['expires'] = time() + (86400 * 7);
			} else if ($req['expire'] === '3') {
				$newTokenData['expires'] = time() + (86400 * 30);
			} else if ($req['expire'] === '4') {
				$newTokenData['expires'] = time() + ((86400 * 30) * 3);
			} else {
				$newTokenData['expires'] = time() + 86400;
			}

			writeToJsonFile($this->tokensFile, $newTokenData);

			return $newTokenData['link'];
		}
	}