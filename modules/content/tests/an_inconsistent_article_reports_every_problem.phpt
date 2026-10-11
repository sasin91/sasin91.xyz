--TEST--
an inconsistent article reports every problem at once
--FILE--
<?php
require __DIR__ . '/setup.inc';
$dir = fixture_dir('article');
mkdir("$dir/views/nodes", 0777, true);
$article = ['path' => 'blog/ai', 'title' => 't', 'description' => 'd', 'published' => '2026-10-02', 'updated' => '2026-10-02',
    'parts' => [['title' => 'P', 'nodes' => ['a', 'b', 'ghost']]]];
$nodes = [
    'a' => ['title' => 'A', 'summary' => 's', 'concepts' => ['c'], 'prerequisites' => ['b']],
    'b' => ['title' => 'B', 'summary' => 's', 'concepts' => []],
    'c' => ['title' => 'C', 'summary' => 's', 'concepts' => ['c']],
];
file_put_contents("$dir/article.php", '<?php return ' . var_export($article, true) . ';');
file_put_contents("$dir/nodes.php", '<?php return ' . var_export($nodes, true) . ';');
file_put_contents("$dir/views/nodes/a.php", "<p>See <a href=\"#b\">b</a> and <a href=\"#nowhere\">nothing</a>.</p>\n");
file_put_contents("$dir/views/nodes/b.php", "<?= section_open('A heading') ?>\n<?= section_close() ?>\n");
file_put_contents("$dir/views/nodes/c.php", "<p>x</p>\n");
try {
    (new Knowledge_article($dir))->load();
} catch (RuntimeException $error) {
    echo $error->getMessage(), "\n";
}

// A view with no details, and details with no view, are each named.
file_put_contents("$dir/views/nodes/stray.php", "<p>x</p>\n");
try {
    (new Knowledge_article($dir))->load();
} catch (RuntimeException $error) {
    echo $error->getMessage(), "\n";
}
unlink("$dir/views/nodes/stray.php");
unlink("$dir/views/nodes/c.php");
try {
    (new Knowledge_article($dir))->load();
} catch (RuntimeException $error) {
    echo $error->getMessage(), "\n";
}
?>
--EXPECT--
the AI article is invalid:
  - node "b": list at least one concept
  - node "b": the body contains a heading; the node title is the heading, so split the node instead
  - part "P" lists "ghost", which is not a node
  - node "c" is not listed in any part of article.php
  - node "a": prerequisite "b" comes later in the article; move one of them, or make it `related` instead
  - node "a": links to #nowhere, which is not a node or part
views/nodes/stray.php has no entry in nodes.php
node "c": no view at views/nodes/c.php
