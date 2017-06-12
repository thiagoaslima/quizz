import { IQuestao } from '../interfaces/questao.interface';
import { ITela } from '../interfaces/tela.interface';

const jQuery: any = window['jQuery']

export const QuestaoScreen = {

    template: `
    <div class="geral {{ classe }}">
        <div class="wrapper">
                <div class="pure-g">
                {{ pergunta }}
                {{ timer }}
                {{ questoes }}
                {{ foto }}
                {{ paginacao }}
                <div class="pure-u-1-4">
                    <div class="sair">
                        <p><a href="#0">sair <img src="img/sair.png"></a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    timer: `
         <div class="pure-u-1-4 timer">
            <p>{{ tempo }}</p>
        </div>
    `,

    pergunta: `
        <div class="pure-u-3-4 pergunta">
            <h1>{{ texto }}</h1>
        </div>
    `,

    questoes: `
         <div class="pure-u-1-2 questoes">
            {{ questao }}
        </div>
    `,

    questao: `
        <button class="resposta">{{ texto }}</button>
    `,

    foto: `
        <div class="pure-u-1-2 foto">
            <img src="{{ src }}">
        </div>
    `,

    paginacao: `
        <div class="pure-u-3-4">
            <ul class="perguntas">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
            </ul>
            <div class="linha"></div>
        </div>
    `,

    getHTML(questao: IQuestao, tempo: string) {
        let tmpl = this.template;
        const classe = this.classes[questao.conjunto];

        tmpl = tmpl.replace('{{ classe }}', classe)
            .replace('{{ pergunta }}', this.pergunta.replace('{{ texto }}', questao.pergunta))
            .replace('{{ timer }}', this.timer.replace('{{ tempo }}', tempo))
            .replace('{{ questoes }}', this.questoes.replace('{{ questao }}', this._buildOpcoes(questao.opcoes)))
            .replace('{{ foto }}', questao.imagemSrc ? this.foto.replace('{{ src }}', questao.imagemSrc) : '<div class="pure-u-1-2 foto"></div>')
            .replace('{{ paginacao }}', this.paginacao)
            ;

        return tmpl;
    },

    classes: {
        brasil: 'fundo2',
        paises: 'fundo1'
    },

    _buildOpcoes(opcoes: string[]): string {
        return opcoes.map(texto => this.questao.replace('{{ texto }}', texto)).join('');
    },

    render(questao: IQuestao, tempo: string, container: HTMLElement = document.body) {
        let tmpl = this.getHTML(questao, tempo);
        jQuery(container).html(tmpl);
        this.updatePaginacao(0);
    },

    updateScreen(questao: IQuestao, tempo: string, paginacao: number) {
        this.updateQuestao(questao);
        this.updateTimer(tempo);
        this.updatePaginacao(paginacao);
    },

    updateQuestao(questao: IQuestao) {
        const self = this;
        jQuery('.pergunta h1').text(questao.pergunta);
        jQuery('.questoes').html(jQuery(self._buildOpcoes(questao.opcoes)));

        const classe = this.classes[questao.conjunto];
        if (!jQuery('.geral').hasClass(classe)) {
            jQuery('.geral').attr('class', 'geral ' + classe)
        }
    },

    updatePaginacao(index: number) {
        jQuery('.perguntas').find('li').map((idx: number, el: HTMLElement) => {
            if (idx < index) {
                jQuery(el).attr('class', 'passada')
            }
            if (idx === index) {
                jQuery(el).attr('class', 'atual')
            }
            if (idx > index) {
                jQuery(el).attr('class', '')
            }
        })
    },

    updateTimer(time: string): void {
        let [m, s] = time.split(':').map(n => parseInt(n, 10));

        if (m === 0 && s < 10) {
            jQuery('.timer p').css('color', 'red')
        } else {
            jQuery('.timer p').css('color', 'black')
        }

        jQuery('.timer p').text(time);
    }

} 