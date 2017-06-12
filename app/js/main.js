System.register(["./quizz/BancoQuestoes", "./quizz/Quizz"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BancoQuestoes_1, Quizz_1, quizz;
    return {
        setters: [
            function (BancoQuestoes_1_1) {
                BancoQuestoes_1 = BancoQuestoes_1_1;
            },
            function (Quizz_1_1) {
                Quizz_1 = Quizz_1_1;
            }
        ],
        execute: function () {
            quizz = new Quizz_1.Quizz(new BancoQuestoes_1.BancoQuestoes());
            quizz.run();
        }
    };
});
//# sourceMappingURL=main.js.map