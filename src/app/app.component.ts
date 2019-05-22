import { Component } from '@angular/core';
import { QuestionsService } from './common/services/questions/questions.service';
import { IQuestion } from './common/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  question: IQuestion;
  hasNext: boolean;
  hasPrev: boolean;
  grade: number = -1;
  constructor(private questionsService: QuestionsService) {
    this.questionsService.loadQuestions()
      .then(res => {
        this.next();
        console.log('success')
      })
      .catch(err => alert('try again!'));
  }

  next() {
    const res = this.questionsService.getNextQuestion();
    this.hasNext = res.hasNext;
    this.hasPrev = res.hasPrev;
    this.question = res.q;
  }

  prev() {
    const res = this.questionsService.getPrevQuestion();
    this.hasNext = res.hasPrev;
    this.hasNext = res.hasNext;
    this.question = res.q;
  }

  done() {
    this.grade = this.questionsService.calcGrade()
    console.log(this.grade)
  }

  setAnswer(index) {
    this.questionsService.setAnswer(this.question.id, index);
  }
}
