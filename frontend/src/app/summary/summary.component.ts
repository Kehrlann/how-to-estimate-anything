import { Component, OnInit } from '@angular/core';
import { Question, QuestionWithAnswer } from '@common/models';
import { QuestionService } from '../question/question.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  questions: QuestionAnswerAndCorrectness[] = [];
  get score(): number {
    return this.questions.filter(q => q.correct).length;
  }

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questions = this.questionService
      .getQuestions()
      .map(q => ({ ...q, correct: q.min <= q.answer && q.max >= q.answer }));
  }
}

type QuestionAnswerAndCorrectness = QuestionWithAnswer & { correct: boolean };
