<?php
	
	class Auth {
		private $hashesFile = './db/hashes.json';

		function login($req) {
			$data = json_decode(file_get_contents($this->hashesFile));
			$req['data']['password'] = filter_var($req['data']['password'], FILTER_SANITIZE_STRING);
			$output = ['success' => false, 'user' => null];
			if (password_verify($req['data']['password'], $data->user)) {
				$output['success'] = true;
				$output['user'] = 1;
				$output['cookie'] = $data->userCookie;
			}
			if (password_verify($req['data']['password'], $data->admin)) {
				$output['success'] = true;
				$output['user'] = 2;
				$output['cookie'] = $data->adminCookie;
			}
			return $output;
		}

		function authSession() {
			$data = json_decode(file_get_contents($this->hashesFile));
			$output = ['success' => false, 'user' => null];
			if (isset($_COOKIE['graphic-lib-session'])) {
				$cookie = $_COOKIE['graphic-lib-session'];
				if (password_verify('gl-user', $data->userCookie)) {
					$output['success'] = true;
					$output['user'] = 1;
				}
				if (password_verify('gl-admin', $data->adminCookie)) {
					$output['success'] = true;
					$output['user'] = 2;
				}
			}
			return $output;
		}
	}