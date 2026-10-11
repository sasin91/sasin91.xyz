<?php
/**
 * The blog posts, newest first: each one's details from the array in
 * modules/blog/posts.php, and its body in the view of the same key under
 * modules/blog/views/posts.
 *
 * Loading renders no body; a page that shows one post renders that one
 * (Content::post).
 */
class Posts {

    private array $details;
    private string $dir;

    /**
     * @param array<string, array> $details Each post's details, keyed by its view's name.
     */
    public function __construct(array $details, string $dir) {
        $this->details = $details;
        $this->dir = rtrim($dir, '/');
    }

    /**
     * Every post, newest first, with one exception: a series is kept together
     * and read in part order, and sits in the list at the date of its newest
     * part. Ties outside a series break on path, so the order is stable.
     *
     * @return array<int, array>
     */
    public function all(): array {
        $posts = [];
        foreach ($this->details as $view => $details) {
            $posts[] = $this->load($view, $details);
        }

        $anchors = $this->series_anchors($posts);
        foreach ($posts as $index => $post) {
            $posts[$index]['listed_date'] = $anchors[$post['series']] ?? $post['date'];
        }

        usort($posts, [$this, 'compare']);
        return $posts;
    }

    private function compare(array $a, array $b): int {
        return [$b['listed_date'], $a['series'] ?? '', $a['part'] ?? 0, $a['path']]
            <=> [$a['listed_date'], $b['series'] ?? '', $b['part'] ?? 0, $b['path']];
    }

    /**
     * The date of each series' newest part.
     */
    private function series_anchors(array $posts): array {
        $anchors = [];
        foreach ($posts as $post) {
            $series = $post['series'];
            if ($series === null) {
                continue;
            }
            $newest = $anchors[$series] ?? '';
            if ($post['date'] > $newest) {
                $anchors[$series] = $post['date'];
            }
        }
        return $anchors;
    }

    private function load(string $view, array $details): array {
        $file = $this->dir . '/' . $view . '.php';
        if (!is_file($file)) {
            throw new RuntimeException("post \"{$view}\": no view at {$file}");
        }

        foreach (['path', 'title', 'date', 'description'] as $required) {
            if (!isset($details[$required])) {
                throw new RuntimeException("post \"{$view}\": has no {$required}");
            }
        }

        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $details['date'], new DateTimeZone('UTC'));
        if ($date === false || $date->format('Y-m-d') !== $details['date']) {
            throw new RuntimeException("post \"{$view}\": invalid date \"{$details['date']}\" (want YYYY-MM-DD)");
        }

        return [
            'file' => $file,
            'path' => $details['path'],
            'url' => '/' . $details['path'] . '/',
            'title' => $details['title'],
            'date' => $details['date'],
            'date_iso' => $details['date'],
            'date_long' => $date->format('F j, Y'),
            'date_rfc2822' => $date->format('D, j M Y H:i:s O'),
            'description' => $details['description'],
            'hero' => $details['hero'] ?? null,
            'hero_alt' => $details['hero_alt'] ?? null,
            'card' => $details['card'] ?? null,
            'card_alt' => $details['card_alt'] ?? null,
            'series' => $details['series'] ?? null,
            'part' => $details['part'] ?? null,
            'ask' => $details['ask'] ?? [],
        ];
    }

}
