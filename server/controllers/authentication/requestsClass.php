<?php

	date_default_timezone_set("Africa/Johannesburg");

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
				if (password_verify('gl-user', $cookie)) {
					$output['success'] = true;
					$output['user'] = 1;
				}
				if (password_verify('gl-admin', $cookie)) {
					$output['success'] = true;
					$output['user'] = 2;
				}
			}
			return $output;
		}

		function logout() {
			if (isset($_COOKIE['graphic-lib-session'])) {
				return true;
			}
			return false;
		}

		function changeDefaultPassword($req) {
			$data = json_decode(file_get_contents($this->hashesFile));
			$output = ['success' => false];	
			if (password_verify($req['data']['oldPassword'], $data->user)) {
					$newPassword = password_hash($req['data']['newPassword'], PASSWORD_DEFAULT);
					$data->user = $newPassword;
					file_put_contents($this->hashesFile, json_encode($data, JSON_PRETTY_PRINT));
					$output['success'] = true;
				}
			return $output;
		}

		function changeAdminPassword($req) {
			$data = json_decode(file_get_contents($this->hashesFile));
			$output = ['success' => false];
			if (password_verify($req['data']['oldPassword'], $data->admin)) {
					$newPassword = password_hash($req['data']['newPassword'], PASSWORD_DEFAULT);
					$data->admin = $newPassword;
					file_put_contents($this->hashesFile, json_encode($data, JSON_PRETTY_PRINT));
					$output['success'] = true;
				}
			return $output;
		}
	}