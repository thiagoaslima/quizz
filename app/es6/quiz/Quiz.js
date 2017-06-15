import { vitoriaScreen } from '../telas/ganhou.screen';
import { erroScreen } from '../telas/erro.screen';
import { tempoScreen } from '../telas/tempo.screen';
import { QuestaoScreen } from '../telas/questao.screen';
import { getHash, goToHash } from '../utils/routes';
import { splashScreen } from '../telas/splash.screen';
import { dificuldade } from '../interfaces/index';
const jQuery = window['jQuery'];
export class Quiz {
    constructor(_banco) {
        this._banco = _banco;
        this._questoes = [
            {
                dificuldade: dificuldade.facil,
                conjunto: 'brasil'
            },
            {
                dificuldade: dificuldade.medio,
                conjunto: 'brasil'
            },
            {
                dificuldade: dificuldade.dificil,
                conjunto: 'brasil'
            },
            {
                dificuldade: dificuldade.facil,
                conjunto: 'paises'
            },
            {
                dificuldade: dificuldade.medio,
                conjunto: 'paises'
            },
            {
                dificuldade: dificuldade.dificil,
                conjunto: 'paises'
            },
            {
                dificuldade: dificuldade.facil,
                conjunto: 'biomas'
            },
            {
                dificuldade: dificuldade.medio,
                conjunto: 'biomas'
            },
            {
                dificuldade: dificuldade.dificil,
                conjunto: 'biomas'
            }
        ];
        this.score = 0;
        this.threshold = 9;
        this.paginaAtual = 0;
        this.timer = 0;
        this.questaoAtual = null;
        this.intervalId = null;
    }
    run() {
        const self = this;
        if (this._questoes.length < this.threshold) {
            this.threshold = this._questoes.length;
        }
        window['fails'] = [];
        window.addEventListener('hashchange', (evt) => {
            this._showPage(getHash());
        });
        jQuery('body').on('click', '.enviar', function (evt) {
            const email = jQuery('.seunome').val();
            jQuery(this).html('<img src="img/spin.gif" />');
            if (jQuery('input[type=checkbox]').is(":checked")) {
                jQuery.post('http://www.ibge.gov.br/temp/quizz_mailing.php', { email: email });
            }
            jQuery.post('http://www.ibge.gov.br/temp/quizz.php', { email: email })
                .done(function () {
                goToHash('0');
            })
                .fail(function () {
                window['fails'].push(email);
                alert('Não foi possível registrar seu email.');
            });
        });
        jQuery('body').on('click', '.mailing', function (evt) {
            const email = jQuery('.seunome').val();
            jQuery(this).html('<img src="img/spin.gif" />');
            if (!email.trim()) {
                return goToHash('0');
            }
            else {
                jQuery.post('http://www.ibge.gov.br/temp/quizz_mailing.php', { email: email })
                    .always(function () {
                    goToHash('0');
                });
            }
        });
        jQuery('body').on('click', '.resposta', function (evt) {
            if (!self.questaoAtual) {
                return;
            }
            self.timer += 2;
            let next = parseInt(self.paginaAtual.toString(), 10) + 1;
            jQuery('.questoes .resposta').each(function () {
                if (jQuery(this).text() === self.questaoAtual.resposta) {
                    jQuery(this).addClass('certa');
                }
            });
            if (jQuery(this).text() === self.questaoAtual.resposta) {
                self.score += 1;
            }
            else {
                jQuery(this).addClass('errada');
            }
            setTimeout(function () { goToHash(next.toString()); }, 2000);
        });
        jQuery('body').on('click', '.recomecar', function (evt) {
            goToHash('0');
        });
        if (getHash() !== '0') {
            goToHash('0');
        }
        else {
            this._showPage('0');
        }
    }
    _showPage(state) {
        let _state = parseInt(state, 10);
        if (isNaN(_state)) {
            this.paginaAtual = state;
        }
        else if (_state > this._questoes.length) {
            this.paginaAtual = this.score >= this.threshold ? 'vitoria' : 'erro',
                state = this.paginaAtual;
        }
        else {
            this.paginaAtual = _state;
        }
        let questao = this.questaoAtual;
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
                this._lose('erro');
                break;
            case 'tempo':
                this.questaoAtual = null;
                this.stopClock();
                this._lose('tempo');
                break;
            default:
                this.questao(parseInt(state, 10));
        }
    }
    idle() {
        const self = this;
        self.score = 0;
        splashScreen.render(document.body);
        jQuery('button').on('click', () => goToHash('1'));
    }
    questao(index) {
        const self = this;
        const { conjunto, dificuldade } = this._questoes[index - 1];
        this.questaoAtual = this._banco.sortearQuestao(conjunto, dificuldade);
        if (this.paginaAtual === 1) {
            this.timer = 25;
            QuestaoScreen.render(this.questaoAtual, self.formatTimer(), document.body);
            this.startClock();
        }
        else {
            this.addTime(this.questaoAtual);
            QuestaoScreen.updateScreen(this.questaoAtual, self.formatTimer(), parseInt(this.paginaAtual.toString(), 10) - 1);
        }
    }
    startClock() {
        const self = this;
        this.intervalId = setInterval(function () {
            if (self.timer === 0) {
                return goToHash('tempo');
            }
            self.timer -= 1;
            QuestaoScreen.updateTimer(self.formatTimer());
        }, 1000);
    }
    stopClock() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    addTime(questao) {
        if (questao.dificuldade === 0) {
            this.timer += 5;
        }
        if (questao.dificuldade === 1) {
            this.timer += 10;
        }
        if (questao.dificuldade === 2) {
            this.timer += 15;
        }
    }
    formatTimer() {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        const _m = minutes < 10 ? '0' + minutes : minutes.toString(10);
        const _s = seconds < 10 ? '0' + seconds : seconds.toString(10);
        return _m + ':' + _s;
    }
    _success() {
        vitoriaScreen.render(this.score, this._questoes.length);
    }
    _lose(situacao) {
        if (situacao === 'erro') {
            erroScreen.render(this.score, this._questoes.length);
        }
        else {
            tempoScreen.render();
        }
    }
}
//# sourceMappingURL=Quiz.js.map