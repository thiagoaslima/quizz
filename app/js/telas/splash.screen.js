System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var splashScreen;
    return {
        setters:[],
        execute: function() {
            exports_1("splashScreen", splashScreen = {
                template: "<div class=\"geral splash\">\n            <div class=\"pure-g\">\n                <div class=\"pure-u-1\">\n                    <img src=\"img/ibgego.png\">\n                    <h1>Acerte as perguntas do quiz<br>e ganhe um atlas do IBGE!</h1>\n                    <button class=\"resposta\">come\u00E7ar</button>\n                </div>\n            </div>\n        </div>",
                render: function (container) {
                    if (container === void 0) { container = document.body; }
                    container.innerHTML = this.template;
                },
                getHTML: function () {
                    return this.template;
                }
            });
        }
    }
});
//# sourceMappingURL=splash.screen.js.map