<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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
        return inertia('blog/trongate/mx-transition');
    }
}
