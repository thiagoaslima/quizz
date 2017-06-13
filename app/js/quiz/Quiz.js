System.register(['../telas/ganhou.screen', '../telas/erro.screen', '../telas/tempo.screen', '../telas/questao.screen', '../utils/routes', '../telas/splash.screen', '../interfaces/index'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ganhou_screen_1, erro_screen_1, tempo_screen_1, questao_screen_1, routes_1, splash_screen_1, index_1;
    var jQuery, Quiz;
    return {
        setters:[
            function (ganhou_screen_1_1) {
                ganhou_screen_1 = ganhou_screen_1_1;
            },
            function (erro_screen_1_1) {
                erro_screen_1 = erro_screen_1_1;
            },
            function (tempo_screen_1_1) {
                tempo_screen_1 = tempo_screen_1_1;
            },
            function (questao_screen_1_1) {
                questao_screen_1 = questao_screen_1_1;
            },
            function (routes_1_1) {
                routes_1 = routes_1_1;
            },
            function (splash_screen_1_1) {
                splash_screen_1 = splash_screen_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            jQuery = window['jQuery'];
            Quiz = (function () {
                function Quiz(_banco) {
                    this._banco = _banco;
                    this._questoes = [
                        {
                            dificuldade: index_1.dificuldade.facil,
                            conjunto: 'biomas'
                        },
                        {
                            dificuldade: index_1.dificuldade.medio,
                            conjunto: 'biomas'
                        },
                        {
                            dificuldade: index_1.dificuldade.dificil,
                            conjunto: 'biomas'
                        },
                        {
                            dificuldade: index_1.dificuldade.facil,
                            conjunto: 'brasil'
                        },
                        {
                            dificuldade: index_1.dificuldade.medio,
                            conjunto: 'brasil'
                        },
                        {
                            dificuldade: index_1.dificuldade.dificil,
                            conjunto: 'brasil'
                        },
                        {
                            dificuldade: index_1.dificuldade.facil,
                            conjunto: 'paises'
                        },
                        {
                            dificuldade: index_1.dificuldade.medio,
                            conjunto: 'paises'
                        },
                        {
                            dificuldade: index_1.dificuldade.dificil,
                            conjunto: 'paises'
                        },
                    ];
                    this.paginaAtual = 0;
                    this.timer = 0;
                    this.questaoAtual = null;
                    this.intervalId = null;
                }
                Quiz.prototype.run = function () {
                    var _this = this;
                    var self = this;
                    window.addEventListener('hashchange', function (evt) {
                        _this._showPage(routes_1.getHash());
                    });
                    jQuery('body').on('click', '.enviar', function (evt) {
                        var name = jQuery('.seunome').val();
                        routes_1.goToHash('0');
                    });
                    jQuery('body').on('click', '.resposta', function (evt) {
                        if (!self.questaoAtual) {
                            return;
                        }
                        self.timer += 2;
                        if (jQuery(this).text() === self.questaoAtual.resposta) {
                            var next_1 = parseInt(self.paginaAtual.toString(), 10) + 1;
                            jQuery(this).addClass('certa');
                            setTimeout(function () { routes_1.goToHash(next_1.toString()); }, 2000);
                        }
                        else {
                            jQuery(this).addClass('errada');
                            setTimeout(function () { routes_1.goToHash('erro'); }, 2000);
                        }
                    });
                    jQuery('body').on('click', '.recomecar', function (evt) {
                        routes_1.goToHash('0');
                    });
                    if (routes_1.getHash() !== '0') {
                        routes_1.goToHash('0');
                    }
                    else {
                        this._showPage('0');
                    }
                };
                Quiz.prototype._showPage = function (state) {
                    var _state = parseInt(state, 10);
                    if (isNaN(_state)) {
                        this.paginaAtual = state;
                    }
                    else if (_state > this._questoes.length) {
                        this.paginaAtual = 'vitoria',
                            state = 'vitoria';
                    }
                    else {
                        this.paginaAtual = _state;
                    }
                    var questao = this.questaoAtual;
                    switch (state) {
                        case '0':
                            this.questaoAtual = null;
                            this.stopClock();
                            this.idle();
                            break;
                        case 'vitoria':
                            this.questaoAtual = null;
                            this.stopClock();
                            this._success();
                            break;
                        case 'erro':
                            this.questaoAtual = null;
                            this.stopClock();
                            this._lose('erro', questao);
                            break;
                        case 'tempo':
                            this.questaoAtual = null;
                            this.stopClock();
                            this._lose('tempo');
                            break;
                        default:
                            this.questao(parseInt(state, 10));
                    }
                };
                Quiz.prototype.idle = function () {
                    var self = this;
                    splash_screen_1.splashScreen.render(document.body);
                    jQuery('button').on('click', function () { return routes_1.goToHash('1'); });
                };
                Quiz.prototype.questao = function (index) {
                    var self = this;
                    var _a = this._questoes[index - 1], conjunto = _a.conjunto, dificuldade = _a.dificuldade;
                    this.questaoAtual = this._banco.sortearQuestao(conjunto, dificuldade);
                    if (this.paginaAtual === 1) {
                        this.timer = 25;
                        questao_screen_1.QuestaoScreen.render(this.questaoAtual, self.formatTimer(), document.body);
                        this.startClock();
                    }
                    else {
                        this.addTime(this.questaoAtual);
                        questao_screen_1.QuestaoScreen.updateScreen(this.questaoAtual, self.formatTimer(), parseInt(this.paginaAtual.toString(), 10) - 1);
                    }
                };
                Quiz.prototype.startClock = function () {
                    var self = this;
                    this.intervalId = setInterval(function () {
                        if (self.timer === 0) {
                            return routes_1.goToHash('tempo');
                        }
                        self.timer -= 1;
                        questao_screen_1.QuestaoScreen.updateTimer(self.formatTimer());
                    }, 1000);
                };
                Quiz.prototype.stopClock = function () {
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                        this.intervalId = null;
                    }
                };
                Quiz.prototype.addTime = function (questao) {
                    if (questao.dificuldade === 0) {
                        this.timer += 5;
                    }
                    if (questao.dificuldade === 1) {
                        this.timer += 10;
                    }
                    if (questao.dificuldade === 2) {
                        this.timer += 15;
                    }
                };
                Quiz.prototype.formatTimer = function () {
                    var minutes = Math.floor(this.timer / 60);
                    var seconds = this.timer % 60;
                    var _m = minutes < 10 ? '0' + minutes : minutes.toString(10);
                    var _s = seconds < 10 ? '0' + seconds : seconds.toString(10);
                    return _m + ':' + _s;
                };
                Quiz.prototype._success = function () {
                    ganhou_screen_1.vitoriaScreen.render();
                };
                Quiz.prototype._lose = function (situacao, questao) {
                    if (situacao === 'erro') {
                        erro_screen_1.erroScreen.render(questao);
                    }
                    else {
                        tempo_screen_1.tempoScreen.render();
                    }
                };
                return Quiz;
            }());
            exports_1("Quiz", Quiz);
        }
    }
});
//# sourceMappingURL=Quiz.js.map