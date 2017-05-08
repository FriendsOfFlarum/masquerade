var gulp = require('flarum-gulp');

gulp({
    modules: {
        'flagrow/bian-lian': [
            '../lib/**/*.js',
            'src/**/*.js'
        ]
    }
});
