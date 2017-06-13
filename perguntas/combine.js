var fs = require("fs");
var brasil = require('./brasil.json'),
    paises = require('./paises.json'),
    biomas = require('./biomas.json');

var questoes = brasil.concat(paises, biomas);

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

fs.writeFile('../app/ts/quiz/banco.ts', 'export const banco = ' + JSON.stringify(banco), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 