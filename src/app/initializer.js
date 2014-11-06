define(['promise', 'durandal/viewEngine'], function (Promise, viewEngine) {
    if (CORDOVA) {
        var isCordovaInit = false,
            cordovaResolve,
            cordovaPromise = new Promise(function (resolve) { cordovaResolve = resolve; });

        function initCordova() {
            cordovaResolve();
        }
        function ensureCordova() {
            if (!isCordovaInit) {
                isCordovaInit = true;
                document.addEventListener("deviceready", initCordova, false);
            }

            return cordovaPromise;
        }
    }

    if (WIN8) {
        function durandal() {
            var parser = viewEngine.parseMarkup;
            viewEngine.parseMarkup = function (markup) {
                return MSApp.execUnsafeLocalFunction(function () { return parser(markup); });
            };
        }
    }

    function base() {
        return new Promise(function (resolve) {
            require(
                ['ui/ui'],
                function () { resolve(); }
            );
        });
    }

    function initialize() {
        var promise = Promise.resolve();

        if (CORDOVA) {
            promise = promise.then(ensureCordova);
        }

        if (WIN8) {
            promise = promise.then(durandal);
        }

        return promise.then(base);
    }

    return {
        initialize: initialize
    };
});