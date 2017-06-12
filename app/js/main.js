System.register(['./quiz/BancoQuestoes', './quiz/Quiz'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BancoQuestoes_1, Quiz_1;
    var quiz;
    return {
        setters:[
            function (BancoQuestoes_1_1) {
                BancoQuestoes_1 = BancoQuestoes_1_1;
            },
            function (Quiz_1_1) {
                Quiz_1 = Quiz_1_1;
            }],
        execute: function() {
            quiz = new Quiz_1.Quiz(new BancoQuestoes_1.BancoQuestoes());
            quiz.run();
        }
    }
});
//# sourceMappingURL=main.js.map