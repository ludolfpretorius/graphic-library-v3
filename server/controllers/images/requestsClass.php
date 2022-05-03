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

		function deleteTags($req) {
			$data = json_decode(file_get_contents($this->tagsFile));
			$output = [];
			foreach ($data as $tag) {
				if (!in_array($tag, $req['data']['tags'])) {
					$output[] = $tag;
				}
			}
			$successfullyWroteToDB = writeJsonFile($this->tagsFile, $output);
			return $successfullyWroteToDB ? $output : null;
		}

		function addNewTags($req) {
			$data = json_decode(file_get_contents($this->tagsFile));
			foreach ($req['data']['tags'] as $tag) {
				$data[] = $tag;
			}
			sort($data);
			$successfullyWroteToDB = writeJsonFile($this->tagsFile, $data);
			return $successfullyWroteToDB ? $data : null;
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

            return $selectedImage;
        }

        function editImageTags($req) {
            $data = json_decode(file_get_contents($this->imagesFile));
            $selectedImage = null;
            foreach ($data as $image) {
                if ($image->id === $req['data']['id']) {
                    $selectedImage = $image;
                }
            }
            $selectedImage->up = $req['data']['up'];
            $selectedImage->course = $req['data']['course'];
            $selectedImage->tags = $req['data']['tags'];

            updateJsonFile($this->imagesFile, $selectedImage, $selectedImage->id);

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
					$allImages = json_decode(file_get_contents($this->imagesFile));
					$uploadedInfo = json_decode($req['data']);
					$imageEntry = [];
					$imageEntry['id'] = $allImages[count($allImages) - 1]->id + 1;
					foreach($uploadedInfo as $type => $value) {
						$imageEntry[$type] = $value;
					}
					$imageEntry['url'] = $filename;
					$successfullyUploaded = appendToJsonFile($this->imagesFile, $imageEntry);
				}
			}

			if (!$successfullyUploaded) {
                return null;
			}

            return $imageEntry;
		}

		function delete($req) {
			$successfullyDeletedImageFile = removeImageFile($this->imagesFolder, $req['data']['url']);
			if ($successfullyDeletedImageFile) {
				$successfullyDeletedFromDB = removeFromJsonFile($this->imagesFile, $req['data']['id']);
			}
			return $successfullyDeletedFromDB ? $req['data'] : null;
		}

		function generateShareableLink($req) {
			$tokensData = json_decode(file_get_contents($this->tokensFile));
			$newToken = $this->createRandomString();

			$newTokenData['id'] = count($tokensData) ? $tokensData[count($tokensData) - 1]->id + 1 : 1;
			$newTokenData['token'] = $newToken;
			$newTokenData['filter'] = ['uni' => $req['data']['uni'], 'course' => $req['data']['course'], 'keyword' => $req['data']['keyword']];
			$newTokenData['link'] = $req['data']['url'].'?t='.$newToken;

			if ($req['data']['expires'] == 2) {
				$newTokenData['expires'] = time() + (86400 * 7);
			} else if ($req['data']['expires'] == 3) {
				$newTokenData['expires'] = time() + (86400 * 30);
			} else if ($req['data']['expires'] == 4) {
				$newTokenData['expires'] = time() + ((86400 * 30) * 3);
			} else {
				$newTokenData['expires'] = time() + 86400;
			}

			appendToJsonFile($this->tokensFile, $newTokenData);

			return $newTokenData['link'];
		}
	}