<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Running…</title>
</head>
<body data-retrieval-tests data-index="<?= out($index_url) ?>">
<h1>Retrieval tests</h1>
<ol id="results"></ol>
<script type="application/json" id="wordpiece-fixture"><?= $fixture ?></script>
<script type="module">
<?= $script ?>
</script>
</body>
</html>
