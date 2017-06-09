function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

jQuery(function ($) {

    var Quiz = {
        nome: "",
        numeroAlternativas: 4,
        listaQuestoes: [],
        telas: [
            {
                dificuldade: 3
            },
            {
                dificuldade: 3
            }
        ],
        telaAtual: 0,

        start: function _start() {
            var that = this;
            return this.getQuestoes().then(function () {
                return that.mostrarPergunta(0);
            });
        },

        end: function _end(situacao) {
            alert(situacao);
        },

        getQuestoes: function () {
            var that = this;
            return $.getJSON('perguntas/' + this.nome + '.json')
                .then(function (json) {
                    that.listaQuestoes = json;
                    return json;
                });
        },

        mostrarPergunta: function _mostrarPergunta(indice) {
            var configuracao = this.telas[indice];
            if (!configuracao) { return this.end('ganhou'); }
        
            this.telaAtual = indice;
            var questoes = this.filtrarQuestoes(configuracao);
            var questao = this.sortearQuestao(questoes);
            var dados = this.prepararPergunta(questao);

            return this.appendElements(dados);
        },

        appendElements(dados) {
            var that = this;
            $('#quiz').html('');

            var $div = $('<div />');
            var $pergunta = $('<h3 />', { text: dados.pergunta });
            var alternativasEls = dados.alternativas.map(function(alternativa) {
                return $('<p />', { 
                    text: alternativa, 
                    "class": "alternativas",
                    click: function(e) {
                        if ($(this).text() === dados.resposta) {
                            return that.mostrarPergunta(that.telaAtual + 1);
                        } else {
                            return that.end('perdeu');
                        }
                    }
                 })
            });

            $div.append($pergunta);
            alternativasEls.forEach(function($alternativa) {
                $div.append($alternativa);
            });

            $('#quiz').append($div);
        },

        filtrarQuestoes: function _filtrarQuestoes(configuracao) {
            return this.listaQuestoes.filter(function(questao) {
                return questao.dificuldade === configuracao.dificuldade;
            });
        },

        prepararPergunta: function _prepararPergunta(questao) {
            var alternativas = questao.falsas.slice(0);

            while (alternativas.length > this.numeroAlternativas - 1) {
                var retirarIndex = getRandomInteger(0, alternativas.length - 1);
                alternativas.splice(retirarIndex, 1);
            }

            return {
                pergunta: questao.pergunta,
                resposta: questao.resposta,
                imagens: questao.imagens,
                alternativas: shuffleArray(alternativas.concat(questao.resposta))
            }
        },

        sortearQuestao: function _sortearQuestao(questoes) {
            var index = getRandomInteger(0, questoes.length - 1);
            var questao = questoes[index];
            this.removerQuestaoUtilizadaDaLista(questao);
            return questao;
        },

        removerQuestaoUtilizadaDaLista: function _remover(questao) {
            this.listaQuestoes = this.listaQuestoes.filter(function(item) {
                return item !== questao;
            });
        }
    }

    var paises = Object.create(Quiz, {nome: {value: "paises"}});

    paises.start();
})
