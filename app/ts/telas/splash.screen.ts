import { ITela } from '../interfaces/index';

export const splashScreen: ITela = {
    template: `<div class="geral splash">
            <div class="pure-g">
                <div class="pure-u-1">
                    <img src="img/ibgego.png">
                    <h1>Acerte as perguntas do quiz<br>e ganhe um atlas do IBGE!</h1>
                    <button class="resposta">começar</button>
                </div>
            </div>
        </div>`,

    render(container: HTMLElement = document.body) {
        container.innerHTML = this.template;
    },

    getHTML(): string {
        return this.template;
    }
}