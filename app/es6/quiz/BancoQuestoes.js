import { getRandomInteger, shuffleArray } from '../utils/random';
import { banco } from './banco';
const allQuestoes = banco;
export class BancoQuestoes {
    constructor() {
        this._questoes = Object.create(null);
    }
    sortearQuestao(conjunto, dificuldade) {
        let questoes = this._getQuestoes(conjunto, dificuldade);
        let idx = getRandomInteger(0, questoes.length - 1);
        let questao = this._extractQuestao(conjunto, dificuldade, idx);
        return {
            id: questao.id,
            pergunta: questao.pergunta,
            dificuldade: questao.dificuldade,
            resposta: questao.resposta,
            opcoes: shuffleArray(questao.falsas.concat(questao.resposta)),
            conjunto: questao.conjunto,
            imagemSrc: questao.imagemSrc
        };
    }
    _getQuestoes(conjunto, dificuldade) {
        if (!this._questoes[conjunto]) {
            this._questoes[conjunto] = Object.create(null);
        }
        if (!this._questoes[conjunto][dificuldade] || this._questoes[conjunto][dificuldade].length === 0) {
            this._questoes[conjunto][dificuldade] = allQuestoes[conjunto][dificuldade].slice(0);
        }
        return this._questoes[conjunto][dificuldade];
    }
    _extractQuestao(conjunto, dificuldade, index) {
        return this._questoes[conjunto][dificuldade].splice(index, 1)[0];
    }
}
//# sourceMappingURL=BancoQuestoes.js.map