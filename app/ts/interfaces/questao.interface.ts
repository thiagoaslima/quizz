export interface IQuestao {
    id: number
    pergunta: string
    imagemSrc: string
    conjunto: string
    dificuldade: number
    resposta: string
    falsas?: string[]
    opcoes?: string[]
}