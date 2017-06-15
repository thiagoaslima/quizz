import { ITela } from '../interfaces/index';

export const vitoriaScreen: ITela = {
    template: `
        <div class="geral splash">
             <div class="pure-g">
                <div class="pure-u-1">
                    <h1>Parabéns! Você acertou<br>{{ acertos }} perguntas!</h1>
                    <h2>Digite seu email e procure-nos para ganhar seu brinde</h2>
                    <input class="seunome" type="email" placeholder="seu email">
                    <br> 
                    <label style="font-size:24px; font-family: 'luckiest_guyregular', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;">
                        <input type="checkbox" checked style="margin-right:10px; vertical-align: middle;">Quero receber novidades do IBGE
                    </label>
                    <br>
                    <button style="margin-top:25px" class="resposta enviar">Enviar</button>
                </div>
            </div>
        </div>`,

    render(score: number, total: number, container: HTMLElement = document.body) {
        container.innerHTML = this.getHTML(score, total);
    },

    getHTML(score: number, total: number): string {
        return this.template.replace('{{ acertos }}', score < total ? score + ' de ' + total : 'todas as');
    }
}