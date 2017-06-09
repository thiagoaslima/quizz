var path = 'brasil'

var fs = require("fs");
fs.readFile(path + '.txt', function (err, f) {
    var linhas = f.toString().split('\n');
    var json = [];
    var id = 30;
    var pergunta = linhas.reduce(function (obj, linha, idx) {
        linha = linha.trim();
        var primeiroCaracter = linha.charAt(0).toLowerCase();
        
        if (linha === '') return obj;
        if (linha === "Fácil") { obj.dificuldade = 1 }
        if (linha === "Moderado") { obj.dificuldade = 2 }
        if (linha === "Difícil") { obj.dificuldade = 3 }

        if (!isNaN(parseInt(primeiroCaracter, 10))) {
            obj.id = ++id;
            obj.pergunta = linha.substr(3).trim()
        }

        switch(primeiroCaracter) {
            case 'a':
                obj.resposta = linha.substr(3).trim()
                break;
            
            case 'b':
            case 'c':
            case 'd':
                obj.falsas.push(linha.substr(3).trim())
                break;

            case 'e':
                obj.falsas.push(linha.substr(3).trim())
                json.push({
                    "id": obj.id,
                    "pergunta": obj.pergunta,
                    "imagens": obj.imagens,
                    "dificuldade": obj.dificuldade,
                    "resposta": obj.resposta,
                    "falsas": obj.falsas
                });
                obj = { dificuldade: obj.dificuldade, falsas: [] }
                break;
        }

        return obj;
    }, { dificuldade: 1, falsas: [] })

    fs.writeFile('../perguntas/' + path + '.json', JSON.stringify(json), function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
});

