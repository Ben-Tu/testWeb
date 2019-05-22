import { Injectable } from '@angular/core';

import { IQuestion } from '../../models';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private _questions: IQuestion[] = [];
  private index = -1;
  constructor(private http: HttpClient) {
  }

  public async loadQuestions() {
    try {
      const res = await this.http.get(environment.questionsPath).toPromise()
      this._questions = res['questions'];
      this._questions.forEach(item => item.userAnswer = -1);
      return;
    } catch (err) {
      console.error('failed to fetch questions. err: ', err);
      throw err;
    }
  }

  public getNextQuestion() {
    this.index++;
    if (this.index >= this._questions.length) {
      this.index = this._questions.length
      return null;
    } else {
      return {
        q: this._questions[this.index],
        hasPrev: this.index !== 0,
        hasNext: this.index !== this._questions.length - 1
      }
    }
  }

  public getPrevQuestion() {
    this.index--;
    if (this.index < 0) {
      this.index = 0;
      return null;
    } else {
      return {
        q: this._questions[this.index],
        hasPrev: this.index !== 0,
        hasNext: this.index !== this._questions.length - 1
      }
    }
  }

  public setAnswer(id: string, answer: 1 | 2 | 3 | 4 | -1) {
    const ques = this._questions.find(item => item.id === id);
    if (ques) {
      ques.userAnswer = answer;
    }
  }

  public calcGrade() {
    if (!this._questions) {
      return 0;
    }
    let count = 0;
    this._questions.forEach(item => {
      if (item.userAnswer === -1) {
        return;
      }
      if (item.answers[item.userAnswer].correct) {
        count++;
      }
    });
    return Math.floor((count / this._questions.length) * 100);
  }
}
