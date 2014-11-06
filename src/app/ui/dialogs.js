define(["knockout", "promise", "durandal/app"], function (ko, Promise, app) {
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