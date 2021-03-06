import { ITela } from '../interfaces/index';

export const splashScreen: ITela = {
    template: `<div class="geral splash">
            <div class="pure-g">
                <div class="pure-u-1">
                    <img src="img/ibgego.png">
                    <h1>Acerte {{ numero }} perguntas do quiz<br>e ganhe um brinde do IBGE!</h1>
                    <button class="resposta">começar</button>
                </div>
            </div>
        </div>`,

    render(threshold: number, total: number, container: HTMLElement = document.body) {
        container.innerHTML = this.getHTML(threshold, total);
    },

    getHTML(threshold: number, total: number): string {
        return this.template.replace('{{ numero }}', threshold < total ? threshold : 'todas as');
    }
}