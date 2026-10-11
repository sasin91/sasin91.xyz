--TEST--
a post's details name a view that exists, carry every required field and a real date, and each mistake names the post
--FILE--
<?php
require __DIR__ . '/setup.inc';
$dir = fixture_dir('post-details');
file_put_contents("$dir/here.php", "<p>body</p>\n");
$cases = [
    ['missing' => post_details('blog/missing', '2026-08-01')],
    ['here' => ['path' => 'blog/here', 'title' => 't', 'date' => '2026-08-01']],
    ['here' => post_details('blog/here', '2026-02-30')],
];
foreach ($cases as $details) {
    try {
        (new Posts($details, $dir))->all();
    } catch (RuntimeException $error) {
        echo str_replace($dir, 'DIR', $error->getMessage()), "\n";
    }
}
?>
--EXPECT--
post "missing": no view at DIR/missing.php
post "here": has no description
post "here": invalid date "2026-02-30" (want YYYY-MM-DD)
