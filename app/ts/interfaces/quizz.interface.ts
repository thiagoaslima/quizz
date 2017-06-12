import { IQuestao } from './questao.interface';

export interface IQuizz {
    listaQuestoes: { [assunto: string]: IQuestao[] }
    totalQuestoes: number
    questaoAtual: number
}