--TEST--
CV dates read as months, and a malformed one names the role it is in
--FILE--
<?php
require __DIR__ . '/setup.inc';
$source = require APPPATH . 'modules/cv/cv.php';
$cv = Cv_data::load($source);
echo $cv['roles'][0]['start_label'], "\n";
var_dump(str_contains(implode(' ', array_merge(...array_column($cv['roles'], 'achievements_html'))), '<span class="cv-jump cv-jump-six">6</span>'));

$source['roles'][0]['start'] = '2024-13';
try {
    Cv_data::load($source);
} catch (RuntimeException $error) {
    echo $error->getMessage(), "\n";
}
?>
--EXPECT--
September 2024
bool(true)
the CV has a bad date: role Web Developer at JUICE ApS: start date: invalid date "2024-13" (want YYYY-MM)
