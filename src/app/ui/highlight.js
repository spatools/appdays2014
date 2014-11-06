define(["knockout", "prism", "css!prism"], function (ko, Prism) {
    ko.bindingHandlers.highlight = {
        update: function (element, valueAccessor) {
            var value = ko.unwrap(valueAccessor());

            if (typeof value === "string")
                ko.bindingHandlers.html.update(element, valueAccessor);

            Prism.highlightElement(element);
        }
    };
});