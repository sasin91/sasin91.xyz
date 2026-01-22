<?php

describe('Smoke tests', function () {
    test('guest smoke tests', function () {
        visit([
            '/',
            '/blog',
            '/blog/trongate',
            '/blog/trongate/mx-transition',
            '/login',
            '/register',
        ])->assertNoSmoke();
    });

    test('authenticated smoke tests', function () {
        visit([
            '/dashboard',
            '/settings'
        ])->assertNoSmoke();
    });
});
