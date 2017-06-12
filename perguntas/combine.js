var fs = require("fs");
var brasil = require('./brasil2.json'),
    paises = require('./paises2.json');

var questoes = brasil.concat(paises);

var banco = questoes.reduce( (agg, questao) => {
    if (!agg[questao.conjunto]) {
        agg[questao.conjunto] = Object.create(null);
    }

    if(!agg[questao.conjunto][questao.dificuldade]) {
        agg[questao.conjunto][questao.dificuldade] = [];
    }

    agg[questao.conjunto][questao.dificuldade].push(questao);

    return agg;
}, Object.create(null));

fs.writeFile('banco.json', JSON.stringify(banco), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 

fs.writeFile('../app/ts/quizz/banco.ts', 'export const banco = ' + JSON.stringify(banco), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 