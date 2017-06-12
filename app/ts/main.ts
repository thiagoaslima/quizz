import { BancoQuestoes } from './quiz/BancoQuestoes';
import { Quiz } from './quiz/Quiz';

const quiz = new Quiz(new BancoQuestoes());
quiz.run();