<?php
/**
 * Converts a Model2Vec static embedding model, as published on Hugging Face,
 * into the two files the site ships for search:
 *
 *   vocab.txt         one token per line; the line number is the token ID
 *   embeddings.q8.bin [vocab x f32 scale][vocab x dim x i8 weight], little-endian
 *
 * Each row is quantised on its own: scale = max(|row|) / 127, weight =
 * round(value / scale). That cuts the file to a quarter of the float32
 * original while keeping every row's direction almost exactly, which is all
 * cosine similarity looks at.
 *
 * Run once when changing models, then commit the output. Nothing downloads
 * anything at runtime; see models/README.md for the provenance of the model
 * that is committed.
 *
 *   php bin/quantize-model.php <downloaded-model-dir> <output-dir>
 *
 * The input directory needs model.safetensors and vocab.txt from the pinned
 * revision of the model repository.
 */

if ($argc !== 3) {
    fwrite(STDERR, "usage: php bin/quantize-model.php <model-dir> <output-dir>\n");
    exit(2);
}
[, $input, $output] = $argv;

$file = file_get_contents($input . '/model.safetensors');

// safetensors: an 8-byte little-endian header length, a JSON header naming
// each tensor's dtype, shape and byte range, then the raw tensor bytes.
$header_length = unpack('P', $file, 0)[1];
$header = json_decode(substr($file, 8, $header_length), true, 512, JSON_THROW_ON_ERROR);
$tensor = $header['embeddings'] ?? null;
if ($tensor === null || $tensor['dtype'] !== 'F32' || count($tensor['shape']) !== 2) {
    throw new RuntimeException('expected one F32 [vocab, dim] tensor named "embeddings", got ' . json_encode($header));
}
[$vocab, $dim] = $tensor['shape'];
$start = 8 + $header_length + $tensor['data_offsets'][0];

$vocab_text = file_get_contents($input . '/vocab.txt');
$tokens = explode("\n", rtrim($vocab_text, "\n"));
if (count($tokens) !== $vocab) {
    throw new RuntimeException('vocab.txt has ' . count($tokens) . " tokens but the tensor has {$vocab} rows");
}

$scales = '';
$weights = '';
$worst = 1.0;
$total = 0.0;
for ($row = 0; $row < $vocab; $row++) {
    $values = array_values(unpack('g' . $dim, $file, $start + $row * $dim * 4));

    $max = 0.0;
    foreach ($values as $value) {
        $max = max($max, abs($value));
    }
    $scale = $max / 127 ?: 1.0;
    $scales .= pack('g', $scale);

    $dot = 0.0;
    $a = 0.0;
    $b = 0.0;
    $quantised = [];
    foreach ($values as $value) {
        // floor(x + 0.5), not round(): JavaScript's Math.round, which the
        // committed model was made with, rounds halves up, not away from zero.
        $q = (int) floor($value / $scale + 0.5);
        $quantised[] = $q;
        $back = $q * $scale;
        $dot += $value * $back;
        $a += $value * $value;
        $b += $back * $back;
    }
    $weights .= pack('c*', ...$quantised);

    $cosine = ($a > 0 && $b > 0) ? $dot / sqrt($a * $b) : 1.0;
    $worst = min($worst, $cosine);
    $total += $cosine;
}

if (!is_dir($output)) {
    mkdir($output, 0777, true);
}
$bytes = $scales . $weights;
file_put_contents($output . '/embeddings.q8.bin', $bytes);
copy($input . '/vocab.txt', $output . '/vocab.txt');

printf("rows %d, dim %d\n", $vocab, $dim);
printf("row cosine float32 vs int8: mean %.6f, worst %.6f\n", $total / $vocab, $worst);
printf("model.safetensors sha256 %s\n", hash('sha256', $file));
printf("vocab.txt         sha256 %s\n", hash('sha256', $vocab_text));
printf("embeddings.q8.bin sha256 %s (%d bytes)\n", hash('sha256', $bytes), strlen($bytes));
