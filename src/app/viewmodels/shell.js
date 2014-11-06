define(['plugins/router', "durandal/app"], function (router, app) {
    return {
        router: router,

        search: function() {
            app.showMessage("Not Implemented", "Error");
        },

        activate: function () {
            router.map([
                { route: '', moduleId: 'viewmodels/home', title: "Home", nav: true },
                { "route": "patterns/promise", "moduleId": "viewmodels/patterns/promise", "title": "Promise", "nav": true },
                { "route": "patterns/memoization", "moduleId": "viewmodels/patterns/memoization", "title": "Memoization", "nav": true },
                { "route": "patterns/reuse", "moduleId": "viewmodels/patterns/reuse", "title": "Reuse", "nav": true },
                /*{durandal:routes}*/
                { "route": "about", "moduleId": "viewmodels/about", "title": "About", "nav": true },
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});