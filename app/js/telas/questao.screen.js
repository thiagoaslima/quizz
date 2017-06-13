System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var jQuery, QuestaoScreen;
    return {
        setters:[],
        execute: function() {
            jQuery = window['jQuery'];
            exports_1("QuestaoScreen", QuestaoScreen = {
                template: "\n    <div class=\"geral {{ classe }}\">\n        <div class=\"wrapper\">\n                <div class=\"pure-g\">\n                {{ pergunta }}\n                {{ timer }}\n                {{ questoes }}\n                {{ foto }}\n                {{ paginacao }}\n                <div class=\"pure-u-1-4\">\n                    <div class=\"sair\">\n                        <p><a href=\"#0\">sair <img src=\"img/sair.png\"></a></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ",
                timer: "\n         <div class=\"pure-u-1-4 timer\">\n            <p>{{ tempo }}</p>\n        </div>\n    ",
                pergunta: "\n        <div class=\"pure-u-3-4 pergunta\">\n            <h1>{{ texto }}</h1>\n        </div>\n    ",
                questoes: "\n         <div class=\"pure-u-1-2 questoes\">\n            {{ questao }}\n        </div>\n    ",
                questao: "\n        <button class=\"resposta\">{{ texto }}</button>\n    ",
                foto: "\n        <div class=\"pure-u-1-2 foto\">\n            <img src=\"{{ src }}\">\n        </div>\n    ",
                paginacao: "\n        <div class=\"pure-u-3-4\">\n            <ul class=\"perguntas\">\n                <li>1</li>\n                <li>2</li>\n                <li>3</li>\n                <li>4</li>\n                <li>5</li>\n                <li>6</li>\n                <li>7</li>\n                <li>8</li>\n                <li>9</li>\n            </ul>\n            <div class=\"linha\"></div>\n        </div>\n    ",
                getHTML: function (questao, tempo) {
                    var tmpl = this.template;
                    var classe = this.classes[questao.conjunto];
                    tmpl = tmpl.replace('{{ classe }}', classe)
                        .replace('{{ pergunta }}', this.pergunta.replace('{{ texto }}', questao.pergunta))
                        .replace('{{ timer }}', this.timer.replace('{{ tempo }}', tempo))
                        .replace('{{ questoes }}', this.questoes.replace('{{ questao }}', this._buildOpcoes(questao.opcoes)))
                        .replace('{{ foto }}', questao.imagemSrc ? this.foto.replace('{{ src }}', 'img/' + questao.imagemSrc) : '<div class="pure-u-1-2 foto"></div>')
                        .replace('{{ paginacao }}', this.paginacao);
                    return tmpl;
                },
                classes: {
                    brasil: 'fundo2',
                    paises: 'fundo1',
                    biomas: 'fundo3'
                },
                _buildOpcoes: function (opcoes) {
                    var _this = this;
                    return opcoes.map(function (texto) { return _this.questao.replace('{{ texto }}', texto); }).join('');
                },
                render: function (questao, tempo, container) {
                    if (container === void 0) { container = document.body; }
                    var tmpl = this.getHTML(questao, tempo);
                    jQuery(container).html(tmpl);
                    this.updatePaginacao(0);
                },
                updateScreen: function (questao, tempo, paginacao) {
                    this.updateQuestao(questao);
                    this.updateImagem(questao);
                    this.updateTimer(tempo);
                    this.updatePaginacao(paginacao);
                },
                updateImagem: function (questao) {
                    if (questao.imagemSrc) {
                        jQuery('.foto').replaceWith(this.foto.replace('{{ src }}', 'img/' + questao.imagemSrc));
                    }
                    else {
                        jQuery('.foto').html('');
                    }
                },
                updateQuestao: function (questao) {
                    var self = this;
                    jQuery('.pergunta h1').text(questao.pergunta);
                    jQuery('.questoes').html(jQuery(self._buildOpcoes(questao.opcoes)));
                    var classe = this.classes[questao.conjunto];
                    if (!jQuery('.geral').hasClass(classe)) {
                        jQuery('.geral').attr('class', 'geral ' + classe);
                    }
                },
                updatePaginacao: function (index) {
                    jQuery('.perguntas').find('li').map(function (idx, el) {
                        if (idx < index) {
                            jQuery(el).attr('class', 'passada');
                        }
                        if (idx === index) {
                            jQuery(el).attr('class', 'atual');
                        }
                        if (idx > index) {
                            jQuery(el).attr('class', '');
                        }
                    });
                },
                updateTimer: function (time) {
                    var _a = time.split(':').map(function (n) { return parseInt(n, 10); }), m = _a[0], s = _a[1];
                    if (m === 0 && s < 10) {
                        jQuery('.timer p').css('color', 'red');
                    }
                    else {
                        jQuery('.timer p').css('color', 'black');
                    }
                    jQuery('.timer p').text(time);
                }
            });
        }
    }
});
//# sourceMappingURL=questao.screen.js.map