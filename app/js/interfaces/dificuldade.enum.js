System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var dificuldade;
    return {
        setters: [],
        execute: function () {
            (function (dificuldade) {
                dificuldade[dificuldade["facil"] = 0] = "facil";
                dificuldade[dificuldade["medio"] = 1] = "medio";
                dificuldade[dificuldade["dificil"] = 2] = "dificil";
            })(dificuldade || (dificuldade = {}));
            exports_1("dificuldade", dificuldade);
        }
    };
});
//# sourceMappingURL=dificuldade.enum.js.map