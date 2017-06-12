System.register(["../utils/random"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var random_1, allQuestoes, BancoQuestoes;
    return {
        setters: [
            function (random_1_1) {
                random_1 = random_1_1;
            }
        ],
        execute: function () {
            allQuestoes = [];
            BancoQuestoes = (function () {
                function BancoQuestoes() {
                    this._questoes = {};
                }
                BancoQuestoes.prototype.sortearQuestao = function (_a) {
                    var dificuldade = _a.dificuldade, conjunto = _a.conjunto;
                    var questoes = this._getQuestoes(conjunto, dificuldade);
                    var idx = random_1.getRandomInteger(0, questoes.length - 1);
                    return this._extractQuestao(conjunto, dificuldade, idx);
                };
                BancoQuestoes.prototype._getQuestoes = function (conjunto, dificuldade) {
                    if (!this._questoes[conjunto][dificuldade].length) {
                        this._questoes[conjunto][dificuldade] = allQuestoes[conjunto][dificuldade].slice(0);
                    }
                    return this._questoes[conjunto][dificuldade];
                };
                BancoQuestoes.prototype._extractQuestao = function (conjunto, dificuldade, index) {
                    return this._questoes[conjunto][dificuldade].splice(index, 1)[0];
                };
                return BancoQuestoes;
            }());
            exports_1("BancoQuestoes", BancoQuestoes);
        }
    };
});
//# sourceMappingURL=BancoQuestoes.js.map