import { getRandomInteger, shuffleArray } from '../utils/random';
import { IBancoQuestoes, IQuestao, dificuldade } from '../interfaces/index';
import { banco } from './banco'

const allQuestoes = banco;

export class BancoQuestoes implements IBancoQuestoes {
    private _questoes: { [conjunto: string]: { [dificuldade: number]: IQuestao[] } } = Object.create(null);
    
    sortearQuestao(conjunto: string, dificuldade: number) {
        let questoes = this._getQuestoes(conjunto, dificuldade);
        let idx = getRandomInteger(0, questoes.length-1);
        let questao = this._extractQuestao(conjunto, dificuldade, idx);

        console.log(this._questoes);

        return {
            id: questao.id,
            pergunta: questao.pergunta,
            dificuldade: questao.dificuldade,
            resposta: questao.resposta,
            opcoes: shuffleArray(questao.falsas.concat(questao.resposta)),
            conjunto: questao.conjunto,
            imagemSrc: questao.imagemSrc
        }
    }

    _getQuestoes(conjunto: string, dificuldade: number): IQuestao[] {
        if (!this._questoes[conjunto]) {
            this._questoes[conjunto] = Object.create(null);
        }

        if (!this._questoes[conjunto][dificuldade] || this._questoes[conjunto][dificuldade].length === 0) {
            this._questoes[conjunto][dificuldade] = allQuestoes[conjunto][dificuldade].slice(0);
        }
        return this._questoes[conjunto][dificuldade];
    }

    _extractQuestao(conjunto: string, dificuldade: number, index: number): IQuestao {
        return this._questoes[conjunto][dificuldade].splice(index, 1)[0];
    }
}