import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../routing.service';
import { QuestionWithOrder } from './question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: QuestionWithOrder;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private routingService: RoutingService
  ) {
    this.route.paramMap.subscribe(pm => {
      const id: number = parseInt(pm.get('id'), 10);
      this.updateQuestion(id);
    });
  }

  ngOnInit() {}

  private updateQuestion(id: number) {
    this.question = this.questionService.getQuestion(id);
  }

  nextQuestion() {
    this.questionService.answerQuestion(
      this.question.id,
      this.question.min,
      this.question.max
    );
    if (this.question.isLast) {
      this.routingService.navigateToSummary();
    } else {
      this.routingService.navigateToNextQuestion(this.question);
    }
  }
}
