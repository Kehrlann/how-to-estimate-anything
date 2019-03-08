import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../routing.service';
import { QuestionWithOrder } from '@common/question.model';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild('minInput') minInputField: ElementRef;
  question: QuestionWithOrder = { id: 0, text: '', isLast: false };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(pm => {
      const id: number = parseInt(pm.get('id'), 10);
      this.updateQuestion(id);
    });
  }

  private updateQuestion(id: number) {
    this.question = this.questionService.getQuestion(id);
    this.minInputField.nativeElement.focus();
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
