import { IAnswer } from "./answer.model";

export interface IQuestion {
    id: string;
    question: string;
    answers: IAnswer[];
    userAnswer: 1 | 2 | 3 | 4 | -1;
}