import { Component, OnInit } from '@angular/core';
import { Question } from '../question/question.model';
import { QuestionService } from '../question/question.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    this.questions = this.questionService.getQuestions();
  }
}
