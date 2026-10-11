<?php
define('APPPATH', str_replace('\\', '/', dirname(__DIR__, 3)) . '/');
define('BASE_URL', 'http://localhost/');
require_once APPPATH . 'engine/Trongate.php';
require_once APPPATH . 'engine/Modules.php';
require_once __DIR__ . '/../Search_index.php';

$model = Static_model::from_dir(APPPATH . 'models/potion-base-4M');
