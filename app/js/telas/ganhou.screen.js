System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var vitoriaScreen;
    return {
        setters:[],
        execute: function() {
            exports_1("vitoriaScreen", vitoriaScreen = {
                template: "\n        <div class=\"geral splash\">\n             <div class=\"pure-g\">\n                <div class=\"pure-u-1\">\n                    <h1>Parab\u00E9ns! Voc\u00EA acertou<br>todas as perguntas!</h1>\n                    <h2>Digite seu email e procure-nos para ganhar seu atlas</h2>\n                    <input class=\"seunome\" type=\"email\" placeholder=\"seu email\">\n                    <br> \n                    <button class=\"resposta enviar\">Enviar</button>\n                </div>\n            </div>\n        </div>",
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
//# sourceMappingURL=ganhou.screen.js.map