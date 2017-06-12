import { IQuestao } from '../interfaces/questao.interface';
import { ITela } from '../interfaces/tela.interface';

export const QuestaoScreen: ITela = {
    template: `
    <div class="{{classe}}">
        <div class="wrapper">
                <div class="pure-g">
                {{ pergunta }}
                {{ timer }}
                {{ questoes }}
                {{ foto }}
                {{ paginacao }}
                    
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
                <li class="passada">1</li>
                <li class="passada">2</li>
                <li class="atual">3</li>
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

    sair: `
        <div class="pure-u-1-4">
            <div class="sair">
                <p><a href="">sair <img src="img/sair.png"></a></p>
            </div>
        </div>
    `


    getHTML() {

    },

    render(conjunto: string, questao: IQuestao) {
        let tmpl = this.template;
        const classe = switch (conjunto) {
            case 'brasil':
                return 'fundo1'
            
            case 'paises':
                return 'fundo2'
        }
        tmpl = tmpl
                    .replace('{{ classe }}', classe)
                    .replace('{{ pergunta }}', this.pergunta.replace('{{ texto }}', questao.pergunta))
                    .replace('{{ timer }}', this.timer.replace('{{ tempo }}', '00:30'))
                    .replace('{{ questoes }}', this.questoes.replace('{{ questao }}', 'questao'))
    },

    _updateTimer(): void {

    }

    _updateQuestao(): void {

    }

    _updateIndicePerguntas() {
        
    }
} 