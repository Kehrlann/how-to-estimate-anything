import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from './question/question.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  constructor(
    private router: Router,
    private questionService: QuestionService
  ) {}

  navigateToNextQuestion(currentQuestionId: number) {
    const question = this.questionService.getNextQuestion(currentQuestionId);
    this.router.navigate(['question', question.id]);
  }
}
