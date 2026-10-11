<?php
/**
 * The person: /cv/, the same CV as a PDF, and /about/, all from cv.php in
 * this module.
 */
class Cv extends Trongate {

    const PDF_NAME = 'cv_jonas_hansen_software_developer.pdf';

    public function index(): void {
        $cv = $this->content->cv();

        $data = [
            'view_module' => 'cv',
            'view_file' => 'cv',
            'cv' => $cv,
            'pdf_url' => '/' . self::PDF_NAME,
            'nav' => 'cv',
            'meta' => [
                'title' => 'CV — ' . $cv['site']['name'],
                'description' => $cv['site']['name'] . ', ' . $cv['site']['title'] . '. '
                    . $cv['contact']['town'] . ', ' . $cv['contact']['postcode'] . '.',
                'path' => '/cv/',
                'og_type' => 'website',
            ],
        ];
        $this->templates->public($data);
    }

    /**
     * The CV as an A4 PDF: views/pdf.php, a plain page of the same content,
     * rendered by dompdf. Nothing remote is loaded.
     */
    public function pdf(): void {
        require_once APPPATH . 'packages/autoload.php';
        $cv = $this->content->cv();
        $title = $cv['site']['name'] . ' — CV';
        $html = $this->view('pdf', ['cv' => $cv, 'title' => $title], true);

        $options = new \Dompdf\Options();
        $options->setIsRemoteEnabled(false);
        $options->setIsJavascriptEnabled(false);
        $options->setChroot(__DIR__);
        // The app may run without write access to its own folder.
        $options->setTempDir(sys_get_temp_dir());
        $options->setFontCache(sys_get_temp_dir());

        $dompdf = new \Dompdf\Dompdf($options);
        $dompdf->loadHtml($html, 'UTF-8');
        $dompdf->setPaper('A4');
        $dompdf->render();
        $dompdf->addInfo('Title', $title);
        $pdf = (string) $dompdf->output();

        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="' . self::PDF_NAME . '"');
        header('Content-Length: ' . strlen($pdf));
        echo $pdf;
    }

    public function about(): void {
        $cv = $this->content->cv();

        $data = [
            'view_module' => 'cv',
            'view_file' => 'about',
            'cv' => $cv,
            'nav' => 'about',
            'meta' => [
                'title' => 'About — ' . $cv['site']['name'],
                'description' => $cv['site']['title'] . ' in ' . $cv['contact']['town'] . '. ' . $cv['site']['available_note'] . '.',
                'path' => '/about/',
                'og_type' => 'website',
            ],
        ];
        $this->templates->public($data);
    }

}
