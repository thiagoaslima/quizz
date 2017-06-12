import { vitoriaScreen } from '../telas/ganhou.screen';
import { erroScreen } from '../telas/erro.screen';
import { tempoScreen } from '../telas/tempo.screen';
import { QuestaoScreen } from '../telas/questao.screen';
import { getHash, goToHash } from '../utils/routes';
import { splashScreen } from '../telas/splash.screen';
import { BancoQuestoes } from './BancoQuestoes';
import { IQuestao, dificuldade } from '../interfaces/index';

const jQuery: any = window['jQuery']

export class Quiz {
    private _questoes = [{
        dificuldade: dificuldade.facil,
        conjunto: 'brasil'
    }, {
        dificuldade: dificuldade.medio,
        conjunto: 'brasil'
    }, {
        dificuldade: dificuldade.dificil,
        conjunto: 'brasil'
    }, {
        dificuldade: dificuldade.facil,
        conjunto: 'paises'
    }, {
        dificuldade: dificuldade.medio,
        conjunto: 'paises'
    }, {
        dificuldade: dificuldade.dificil,
        conjunto: 'paises'
    }]

    public paginaAtual: number | string = 0;
    public timer = 0;
    private questaoAtual: IQuestao = null;
    private intervalId: any = null;

    constructor(
        private _banco: BancoQuestoes
    ) {}

    run() {
        const self = this; 

        window.addEventListener('hashchange', (evt) => {
            this._showPage(getHash());
        });

         jQuery('body').on('click', '.enviar', function(evt:MouseEvent) {
            const name = jQuery('.seunome').val();
            console.log(name);

            goToHash('0');
        })

        jQuery('body').on('click', '.resposta', function(evt:MouseEvent) {
            if (!self.questaoAtual) { return; }

            if (jQuery(this).text() === self.questaoAtual.resposta) {
                let next = parseInt(self.paginaAtual.toString(), 10) + 1
                goToHash(next.toString());
            } else {
                goToHash('erro');
            }
        })

        jQuery('body').on('click', '.recomecar', function(evt:MouseEvent) {
             goToHash('0');   
        })

        if (getHash() !== '0') {
            goToHash('0')
        } else {
            this._showPage('0');
        }
    }

    _showPage(state: string): void {
        let _state = parseInt(state, 10);

        if (isNaN(_state)) {
            this.paginaAtual = state;
        } else if (_state > this._questoes.length) {
            this.paginaAtual = 'vitoria',
            state = 'vitoria'
        } else {
            this.paginaAtual = _state;
        }

        let questao = this.questaoAtual;

        switch(state) {
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
    }
    
    idle(): void {
        const self = this;
        splashScreen.render(document.body);
        jQuery('button').on('click', () => goToHash('1'))
    }

    questao(index: number) {
        const self = this;
        const {conjunto, dificuldade} = this._questoes[index-1]
        this.questaoAtual = this._banco.sortearQuestao(conjunto, dificuldade);
        if (this.paginaAtual === 1) {
            this.timer = 30;
            QuestaoScreen.render(this.questaoAtual, self.formatTimer(), document.body);
            this.startClock();
        } else {
            this.addTime(this.questaoAtual);
            QuestaoScreen.updateScreen(this.questaoAtual, self.formatTimer(), parseInt(this.paginaAtual.toString(), 10) - 1);
        }
    }

    private startClock() {
        const self = this;
        this.intervalId = setInterval(function() {
            if (self.timer === 0) { return goToHash('tempo') }

            self.timer -= 1;
            QuestaoScreen.updateTimer(self.formatTimer());
        }, 1000)
    }

    private stopClock(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private addTime(questao: IQuestao): void {
        if (questao.dificuldade === 0) {
            this.timer += 15
        }
        if (questao.dificuldade === 1) {
            this.timer += 20
        }
        if (questao.dificuldade === 2) {
            this.timer += 30
        }
    }

    private formatTimer(): string {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;

        const _m = minutes < 10 ? '0' + minutes : minutes.toString(10);
        const _s = seconds < 10 ? '0' + seconds : seconds.toString(10);

        return _m + ':' + _s;
    }

    private _success() {
        vitoriaScreen.render();
    }

    private _lose(situacao: string, questao?: IQuestao) {
        if (situacao === 'erro') {
            erroScreen.render(questao)
        } else {
            tempoScreen.render()
        }
    }

}