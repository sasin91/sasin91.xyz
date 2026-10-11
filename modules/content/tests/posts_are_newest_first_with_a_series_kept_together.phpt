--TEST--
posts are newest first, ties break on path, nested paths survive, and a series reads in part order at its newest date
--FILE--
<?php
require __DIR__ . '/setup.inc';
$posts = posts_in(fixture_dir('posts'), [
    'later' => post_details('blog/later', '2026-08-09'),
    'three' => post_details('blog/three', '2026-08-04', ['series' => 's', 'part' => 3]),
    'one' => post_details('blog/one', '2026-08-01', ['series' => 's', 'part' => 1]),
    'two' => post_details('blog/two', '2026-08-02', ['series' => 's', 'part' => 2]),
    'b-post' => post_details('blog/b-post', '2026-07-26'),
    'a-post' => post_details('blog/a-post', '2026-07-26'),
    'nested' => post_details('blog/trongate/mx-transition', '2025-03-03'),
])->all();

foreach ($posts as $post) {
    echo $post['url'], ' ', $post['date_long'], ' ', $post['date_rfc2822'], "\n";
}
?>
--EXPECT--
/blog/later/ August 9, 2026 Sun, 9 Aug 2026 00:00:00 +0000
/blog/one/ August 1, 2026 Sat, 1 Aug 2026 00:00:00 +0000
/blog/two/ August 2, 2026 Sun, 2 Aug 2026 00:00:00 +0000
/blog/three/ August 4, 2026 Tue, 4 Aug 2026 00:00:00 +0000
/blog/a-post/ July 26, 2026 Sun, 26 Jul 2026 00:00:00 +0000
/blog/b-post/ July 26, 2026 Sun, 26 Jul 2026 00:00:00 +0000
/blog/trongate/mx-transition/ March 3, 2025 Mon, 3 Mar 2025 00:00:00 +0000
