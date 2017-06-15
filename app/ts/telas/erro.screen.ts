import { ITela, IQuestao } from '../interfaces/index';

export const erroScreen: ITela = {
    template: `
    <div class="geral splash2">
        <div class="pure-g">
            <div class="pure-u-1">
                <h1>Ops! Você acertou apenas<br>{{ acertos }} de {{ total }} perguntas...</h1>
                <h2>Quer receber novidades do IBGE? Digite seu email.</h2>
                <input class="seunome" type="text" placeholder="seu email">
                <br>
                <button class="resposta mailing">tentar de novo</button>
            </div>
        </div>
    </div>
    `,

    render(acertos: number, total: number, container: HTMLElement = document.body) {
        container.innerHTML = this.getHTML(acertos, total);
    },

    getHTML(acertos: number, total: number): string {
        return this.template
            .replace('{{ acertos }}', acertos)
            .replace('{{ total }}', total)
    }
}