import { IQuestao } from "app/ts/interfaces";

export interface IBancoQuestoes {
    sortearQuestao(criterios: {[prop: string]: any}): IQuestao 
}