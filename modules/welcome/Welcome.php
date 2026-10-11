<?php
/**
 * The home page: who this is, and the latest writing.
 */
class Welcome extends Trongate {

    public function index(): void {
        $cv = $this->content->cv();

        $data = [
            'view_module' => 'welcome',
            'view_file' => 'default_homepage',
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
        $this->templates->public($data);
    }

}
