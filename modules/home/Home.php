<?php
/**
 * The home page: who this is, and the latest writing.
 */
class Home extends Trongate {

    public function index(): void {
        $cv = $this->content->cv();

        $data = [
            'view_module' => 'home',
            'view_file' => 'home',
            'cv' => $cv,
            'posts' => $this->content->posts(),
            'nav' => '',
            'meta' => [
                'title' => $cv['site']['name'] . ' — ' . $cv['site']['title'],
                'description' => $cv['site']['stack_line'],
                'path' => '/',
                'og_type' => 'website',
            ],
        ];
        $this->layout->page($data);
    }

}
