if (WIN8) {
    //#region Settings

    if (!WinJS.Utilities.isPhone) {
        var appSettings = Windows.UI.ApplicationSettings,
            settingsPane = appSettings.SettingsPane.getForCurrentView(),
            aboutFlyout;

        function createFlyout(title, flyoutSettings, compositionSettings) {
            var container = $("<div>"),
                header = $("<div>").addClass("win-ui-light").addClass("win-header").appendTo(container),
                content = $("<div>").addClass("win-content").appendTo(container);

            $("<button>").addClass("win-backbutton").attr({ type: "button", onclick: "WinJS.UI.SettingsFlyout.show()" }).appendTo(header);
            $("<div>").addClass("win-label").text(title).appendTo(header);

            $("<div>").addClass("loading-base").appendTo(content);

            var flyout = new WinJS.UI.SettingsFlyout(container.get(0), flyoutSettings);
            flyout.addEventListener("aftershow", function () {
                if (compositionSettings) {
                    require(["durandal/composition"], function (composition) { composition.compose(content.get(0), compositionSettings); });
                }
            });

            container.appendTo("body");

            return flyout;
        }

        function processingHandler(e) {
            require(["plugins/router"], function (router) { router.navigate("processing"); });
        }
        function authorHandler(e) {
            var uri = new Windows.Foundation.Uri("https://github.com/spatools");
            Windows.System.Launcher.launchUriAsync(uri);
        }
        function aboutHandler(e) {
            if (!aboutFlyout)
                aboutFlyout = createFlyout("About", { settingsCommandId: "about", width: "narrow" }, "about.html");

            aboutFlyout.show();
        }

        function onCommandsRequested(e) {
            var processingCommand = new appSettings.SettingsCommand("processing", "Processing", processingHandler),
                authorCommand = new appSettings.SettingsCommand("author", "Author", authorHandler),
                aboutCommand = new appSettings.SettingsCommand("about", "About", aboutHandler);

            e.request.applicationCommands.append(processingCommand);
            e.request.applicationCommands.append(authorCommand);
            e.request.applicationCommands.append(aboutCommand);
        }

        settingsPane.addEventListener("commandsrequested", onCommandsRequested);
    }

    //#endregion

    //#region Add UI

    var winJSVersion = "1.0";
    if (WinJS.Utilities.isPhone) {
        winJSVersion = "2.1";
    }
    else if (navigator.appVersion.indexOf("MSAppHost/2.0;") > -1) {
        winJSVersion = "2.0";
    }

    var uiScript = document.createElement("script");
    uiScript.src = "//Microsoft.WinJS." + winJSVersion + "/js/ui.js";
    document.head.appendChild(uiScript);

    var uiStyles = document.createElement("link");
    uiStyles.href = "//Microsoft.WinJS." + winJSVersion + "/css/ui-light.css";
    uiStyles.type = "text/css";
    uiStyles.rel = "stylesheet";
    document.head.insertBefore(uiStyles, document.querySelector("link[rel=stylesheet]"));

    //#endregion
}

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