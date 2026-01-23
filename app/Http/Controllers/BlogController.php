<?php

namespace App\Http\Controllers;

class BlogController extends Controller
{
    public function index()
    {
        return inertia('blog/index');
    }

    public function trongate()
    {
        return inertia('blog/trongate');
    }

    public function mxTransition()
    {
        return inertia('blog/mx-transition');
    }
}
