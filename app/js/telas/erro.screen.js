System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var erroScreen;
    return {
        setters:[],
        execute: function() {
            exports_1("erroScreen", erroScreen = {
                template: "\n    <div class=\"geral splash2\">\n        <div class=\"pure-g\">\n            <div class=\"pure-u-1\">\n                <h3>Errou!</h3>\n                <h2>A resposta certa \u00E9:</h2>\n                <h4>{{ resposta }}</h4>\n                <button class=\"resposta recomecar\">recome\u00E7ar</button>\n            </div>\n        </div>\n    </div>\n    ",
                render: function (questao, container) {
                    if (container === void 0) { container = document.body; }
                    container.innerHTML = this.getHTML(questao);
                },
                getHTML: function (questao) {
                    return this.template.replace('{{ resposta }}', questao.resposta);
                }
            });
        }
    }
});
//# sourceMappingURL=erro.screen.js.map