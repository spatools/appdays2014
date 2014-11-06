define(["knockout", "promise", "durandal/app"], function (ko, Promise, app) {
    if (CORDOVA) {
        app.showMessage = function (message, title, options) {
            return new Promise(function (resolve) {
                var boxOptions = options || ['Ok'];

                if (boxOptions.length === 1) {
                    title = title || "Information";
                    navigator.notification.alert(message, function () { resolve(options[0]); }, title, boxOptions[0]);
                }
                else {
                    title = title || "Confirmation";
                    navigator.notification.confirm(message, function (i) { resolve(options[i - 1]); }, title, boxOptions);
                }
            });
        };
    }

    app.showChoice = function (message, title) {
        return app.showMessage(message, title, ["Oui", "Non", "Annuler"]).then(function (result) {
            if (result === "Annuler")
                return Promise.reject("Canceled");
            else
                return result;
        });
    };

    app.showConfirm = function (message, title) {
        return app.showMessage(message, title, ["Ok", "Annuler"]).then(function (result) {
            if (result !== "Ok")
                return Promise.reject("Canceled");
        });
    };
});