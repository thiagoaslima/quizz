export const erroScreen = {
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
    render(acertos, total, container = document.body) {
        container.innerHTML = this.getHTML(acertos, total);
    },
    getHTML(acertos, total) {
        return this.template
            .replace('{{ acertos }}', acertos)
            .replace('{{ total }}', total);
    }
};
//# sourceMappingURL=erro.screen.js.map