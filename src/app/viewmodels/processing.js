define(
    ["jquery", "knockout", "math/matrix4", "promise/extensions", "durandal/app", "durandal/system", "plugins/router"],
    function ($, ko, M4, promiseExt, app, system, router) {
        var
            // Properties
            list = [],
            m1 = [
                0.8, 2.5, 0.0, 0.0,
                1.5, 0.7, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ],
            m2 = [
                1.0, 0.8, 0.0, 0.0,
                0.7, 1.0, 0.0, 0.0,
                0.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 1.0
            ],

            // Handlers
            onBadProcessClick = function () {
                badProcessing();
            },
            onWellProcessClick = function () {
                wellProcessing();
            },

            // Private Methods
            badProcessing = function () {
                if (DEBUG) {
                    console.time("badprocess");
                }
                var i = 0, len = 5000, res = m1;
                for (; i < len; i++) {
                    res = M4.mul(M4.inverse(M4.mul(m1, res)), m2);
                    list.push(res);
                    console.log(res);
                }
                if (DEBUG) {
                    console.timeEnd("badprocess");
                }
            },
            wellProcessing = function () {
                if (DEBUG) {
                    console.time("wellprocess");
                }
                var res = m1,
                    iterator = function (val, i) {
                        res = M4.mul(M4.inverse(M4.mul(m1, res)), m2);
                        list[i] = res;
                        console.log(res);
                    };

                list = new Array(5000);

                return promiseExt.forEach(list, iterator).then(function () {
                    if (DEBUG) {
                        console.timeEnd("wellprocess");
                    }
                });
            },

            // Lifecycle

            activate = function () {
            },

            deactivate = function () {
                list = []; // free up list
            };

        return {
            onBadProcessClick: onBadProcessClick,
            onWellProcessClick: onWellProcessClick,

            // Place your public properties here
            activate: activate,
            deactivate: deactivate
        };
    });
