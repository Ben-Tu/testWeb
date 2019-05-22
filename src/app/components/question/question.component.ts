import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IQuestion } from 'src/app/common/models';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() question: IQuestion;
  @Output() onAnswerClick: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  onAnswerClicked(i: number) {
    this.onAnswerClick.emit(i);
  }

}
