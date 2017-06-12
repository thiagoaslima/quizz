import { getRandomInteger } from '../utils/random';
import { IBancoQuestoes, IQuestao, dificuldade } from '../interfaces/index';

const allQuestoes = [] as IQuestao[]

export class BancoQuestoes implements IBancoQuestoes {
    private _questoes: { [conjunto: string]: { [dificuldade: number]: IQuestao[] } } = {}
    sortearQuestao({ dificuldade, conjunto }: { dificuldade: dificuldade, conjunto: string }) {
        let questoes = this._getQuestoes(conjunto, dificuldade);
        let idx = getRandomInteger(0, questoes.length-1);
        return this._extractQuestao(conjunto, dificuldade, idx);
    }

    _getQuestoes(conjunto: string, dificuldade: dificuldade): IQuestao[] {
        if (!this._questoes[conjunto][dificuldade].length) {
            this._questoes[conjunto][dificuldade] = allQuestoes[conjunto][dificuldade].slice(0);
        }
        return this._questoes[conjunto][dificuldade];
    }

    _extractQuestao(conjunto: string, dificuldade: dificuldade, index: number): IQuestao {
        return this._questoes[conjunto][dificuldade].splice(index, 1)[0];
    }
}