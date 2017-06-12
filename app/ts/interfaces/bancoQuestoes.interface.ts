import { IQuestao } from "app/ts/interfaces";

export interface IBancoQuestoes {
    sortearQuestao(conjunto: string, dificuldade: number): IQuestao 
}