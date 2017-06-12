import { getHash, goToHash } from '../utils/routes';
import { splashScreen } from '../telas/splash.screen';
import { BancoQuestoes } from './BancoQuestoes';
import { IQuestao, dificuldade } from '../interfaces/index';

const jQuery: any = window['jQuery']

export class Quizz {
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

    constructor(
        private _banco: BancoQuestoes
    ) {}

    run() {
        window.addEventListener('hashchange', (evt) => {
            this._showPage(getHash());
        });

        if (getHash() !== '0') {
            goToHash('0')
        }
    }

    _showPage(state: string): void {
        this.paginaAtual = isNaN(parseInt(state, 10)) ? state : parseInt(state, 10);

        switch(state) {
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
    }

    idle(): void {
        const self = this;
        splashScreen.render(document.body);
        jQuery('button').on('click', () => goToHash('1'))
    }

    questao(index: number){
        let q = this._banco.sortearQuestao(this._questoes[index-1]);
        console.log(q);
    }

    

    private _success() {

    }

    private _lose(situacao: string) {

    }

}