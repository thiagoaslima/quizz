import { Questao } from './questao.interface';

export interface Quizz {
    listaQuestoes: { [assunto: string]: Questao[] }
    totalQuestoes: number
    questaoAtual: number
}