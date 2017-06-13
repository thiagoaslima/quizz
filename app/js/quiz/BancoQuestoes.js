System.register(['../utils/random', './banco'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var random_1, banco_1;
    var allQuestoes, BancoQuestoes;
    return {
        setters:[
            function (random_1_1) {
                random_1 = random_1_1;
            },
            function (banco_1_1) {
                banco_1 = banco_1_1;
            }],
        execute: function() {
            allQuestoes = banco_1.banco;
            BancoQuestoes = (function () {
                function BancoQuestoes() {
                    this._questoes = Object.create(null);
                }
                BancoQuestoes.prototype.sortearQuestao = function (conjunto, dificuldade) {
                    var questoes = this._getQuestoes(conjunto, dificuldade);
                    var idx = random_1.getRandomInteger(0, questoes.length - 1);
                    var questao = this._extractQuestao(conjunto, dificuldade, idx);
                    console.log(this._questoes);
                    return {
                        id: questao.id,
                        pergunta: questao.pergunta,
                        dificuldade: questao.dificuldade,
                        resposta: questao.resposta,
                        opcoes: random_1.shuffleArray(questao.falsas.concat(questao.resposta)),
                        conjunto: questao.conjunto,
                        imagemSrc: questao.imagemSrc
                    };
                };
                BancoQuestoes.prototype._getQuestoes = function (conjunto, dificuldade) {
                    if (!this._questoes[conjunto]) {
                        this._questoes[conjunto] = Object.create(null);
                    }
                    if (!this._questoes[conjunto][dificuldade] || this._questoes[conjunto][dificuldade].length === 0) {
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
    }
});
//# sourceMappingURL=BancoQuestoes.js.map