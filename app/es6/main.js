import { BancoQuestoes } from './quiz/BancoQuestoes';
import { Quiz } from './quiz/Quiz';
var img = new Image();
img.src = "img/spin.gif";
const quiz = new Quiz(new BancoQuestoes());
quiz.run();
//# sourceMappingURL=main.js.map