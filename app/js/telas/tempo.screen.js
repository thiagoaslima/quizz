System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var tempoScreen;
    return {
        setters:[],
        execute: function() {
            exports_1("tempoScreen", tempoScreen = {
                template: "\n    <div class=\"geral splash2\">\n        <div class=\"pure-g\">\n            <div class=\"pure-u-1\">\n                <h3>Seu tempo acabou!</h3>\n                <button class=\"resposta recomecar\">recome\u00E7ar</button>\n            </div>\n        </div>\n    </div>\n    ",
                render: function (container) {
                    if (container === void 0) { container = document.body; }
                    container.innerHTML = this.getHTML();
                },
                getHTML: function () {
                    return this.template;
                }
            });
        }
    }
});
//# sourceMappingURL=tempo.screen.js.map