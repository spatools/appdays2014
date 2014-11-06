define(['promise'], function (Promise) {
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

    function base() {
        return new Promise(function (resolve) {
            require(
                ['ui/ui'],
                function () { resolve(); }
            );
        });
    }

    function initialize() {
        if (CORDOVA) {
            return ensureCordova().then(base);
        }
        else {
            return base();
        }
    }

    return {
        initialize: initialize
    };
});