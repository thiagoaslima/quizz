import { ITela, IQuestao } from '../interfaces/index';

export const erroScreen: ITela = {
    template: `
    <div class="geral splash2">
        <div class="pure-g">
            <div class="pure-u-1">
                <h3>Errou!</h3>
                <h2>A resposta certa é:</h2>
                <h4>{{ resposta }}</h4>
                <button class="resposta recomecar">recomeçar</button>
            </div>
        </div>
    </div>
    `,

    render(questao: IQuestao, container: HTMLElement = document.body) {
        container.innerHTML = this.getHTML(questao);
    },

    getHTML(questao: IQuestao): string {
        return this.template.replace('{{ resposta }}', questao.resposta);
    }
}