define(["jquery", "knockout", "promise/extensions", "durandal/app", "durandal/system", "plugins/router"], function ($, ko, promiseExt, app, system, router) {
    var
        // Properties


        // Handlers

        // Lifecycle

        activate = function () {
            return promiseExt.timeout(1000).then(function () {
                app.showMessage("I'm activated after 1000ms", "I'm a message");
            });
        },

        deactivate = function () {
            return app.showConfirm("Are you sure you want to deactivate ?", "I'm a confirmation");
        };

    return {
        // Place your public properties here
        activate: activate,
        deactivate: deactivate
    };
});
