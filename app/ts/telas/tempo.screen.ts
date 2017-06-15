import { ITela } from '../interfaces/index';

export const tempoScreen: ITela = {
    template: `
    <div class="geral splash2">
        <div class="pure-g">
            <div class="pure-u-1">
                <h3>Seu tempo acabou!</h3>
                <h2>Quer receber novidades do IBGE? Digite seu email.</h2>
                <input class="seunome" type="email" placeholder="seu email">
                <br>
                <button class="resposta mailing">tentar de novo</button>
            </div>
        </div>
    </div>
    `,
  
    render(container: HTMLElement = document.body) {
        container.innerHTML = this.getHTML();
    },

    getHTML(): string {
        return this.template;
    }
}