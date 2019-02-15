import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionWithOrder } from './question/question.model';
import { QuestionService } from './question/question.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  navigateToNextQuestion(currentQuestion: QuestionWithOrder) {
    const question = this.questionService.getNextQuestion(currentQuestion.id);
    this.router.navigate(['question', question.id]);
  }

  navigateToFirstQuestion() {
    const question = this.questionService.getFirstQuestion();
    this.router.navigate(['question', question.id]);
  }

  navigateToSummary() {
    this.router.navigate(['summary']);
  }
}
