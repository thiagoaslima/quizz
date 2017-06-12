import { BancoQuestoes } from './quizz/BancoQuestoes';
import { Quizz } from './quizz/Quizz';

const quizz = new Quizz(new BancoQuestoes());
quizz.run();