System.register(["../utils/routes", "../telas/splash.screen", "../interfaces/index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var routes_1, splash_screen_1, index_1, jQuery, Quizz;
    return {
        setters: [
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (splash_screen_1_1) {
                splash_screen_1 = splash_screen_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            jQuery = window['jQuery'];
            Quizz = (function () {
                function Quizz(_banco) {
                    this._banco = _banco;
                    this._questoes = [{
                            dificuldade: index_1.dificuldade.facil,
                            conjunto: 'brasil'
                        }, {
                            dificuldade: index_1.dificuldade.medio,
                            conjunto: 'brasil'
                        }, {
                            dificuldade: index_1.dificuldade.dificil,
                            conjunto: 'brasil'
                        }, {
                            dificuldade: index_1.dificuldade.facil,
                            conjunto: 'paises'
                        }, {
                            dificuldade: index_1.dificuldade.medio,
                            conjunto: 'paises'
                        }, {
                            dificuldade: index_1.dificuldade.dificil,
                            conjunto: 'paises'
                        }];
                    this.paginaAtual = 0;
                }
                Quizz.prototype.run = function () {
                    var _this = this;
                    window.addEventListener('hashchange', function (evt) {
                        _this._showPage(routes_1.getHash());
                    });
                    if (routes_1.getHash() !== '0') {
                        routes_1.goToHash('0');
                    }
                };
                Quizz.prototype._showPage = function (state) {
                    this.paginaAtual = isNaN(parseInt(state, 10)) ? state : parseInt(state, 10);
                    switch (state) {
                        case '0':
                            this.idle();
                            break;
                        case 'vitoria':
                            this._success();
                            break;
                        case 'erro':
                            this._lose('erro');
                            break;
                        case 'tempo':
                            this._lose('tempo');
                            break;
                        default:
                            this.questao(parseInt(state, 10));
                    }
                };
                Quizz.prototype.idle = function () {
                    var self = this;
                    splash_screen_1.splashScreen.render(document.body);
                    jQuery('button').on('click', function () { return routes_1.goToHash('1'); });
                };
                Quizz.prototype.questao = function (index) {
                    var q = this._banco.sortearQuestao(this._questoes[index - 1]);
                    console.log(q);
                };
                Quizz.prototype._success = function () {
                };
                Quizz.prototype._lose = function (situacao) {
                };
                return Quizz;
            }());
            exports_1("Quizz", Quizz);
        }
    };
});
//# sourceMappingURL=Quizz.js.map