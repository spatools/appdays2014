requirejs.config({
    paths: {
        'text': '../bower_components/requirejs-text/text',
        'css': '../bower_components/require-css/css',
        'durandal': '../bower_components/durandal/js',
        'plugins': '../bower_components/durandal/js/plugins',
        'transitions': '../bower_components/durandal/js/transitions',
        'knockout': '../bower_components/knockout.js/knockout.debug',
        'jquery': '../bower_components/jquery/dist/jquery',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
        'modernizr': '../bower_components/modernizr/modernizr',
        'promise': '../bower_components/promise-ext/dist/promise',
        'math': '../bower_components/geomath/dist/math',
        'prism': '../bower_components/prismjs/prism',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jQuery'
        },
        modernizr: {
            exports: 'Modernizr'
        },
        prism: {
            exports: 'Prism'
        }
    }
});

//>>excludeStart("build", true);
var DEBUG = true,
    CORDOVA = false;
//>>excludeEnd("build");

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'initializer', 'bootstrap'], function (system, app, viewLocator, initializer) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    app.title = 'AppDays';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start()
        .then(initializer.initialize)
        .then(function () {
            // Replace 'viewmodels' in the moduleId with 'views' to locate the view.
            // Look for partial views in a 'views' folder in the root.
            viewLocator.useConvention();

            // Show the app by setting the root view model for our application with a transition.
            app.setRoot('viewmodels/shell');
        });
});
