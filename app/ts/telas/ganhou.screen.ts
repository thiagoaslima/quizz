import { ITela } from '../interfaces/index';

export const vitoriaScreen: ITela = {
    template: `
        <div class="geral splash">
             <div class="pure-g">
                <div class="pure-u-1">
                    <h1>Parabéns! Você acertou<br>todas as perguntas!</h1>
                    <h2>Digite seu email e procure-nos para ganhar seu atlas</h2>
                    <input class="seunome" type="email" placeholder="seu email">
                    <br> 
                    <button class="resposta enviar">Enviar</button>
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