import { ITela } from '../interfaces/index';

export const tempoScreen: ITela = {
    template: `
    <div class="geral splash2">
        <div class="pure-g">
            <div class="pure-u-1">
                <h3>Seu tempo acabou!</h3>
                <button class="resposta recomecar">recomeçar</button>
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