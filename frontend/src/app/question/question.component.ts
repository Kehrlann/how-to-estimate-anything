import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from './question.service';
import { Question } from './question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  question: Question;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {
    this.route.paramMap.subscribe(pm => {
      const id: number = parseInt(pm.get('id'));
      this.updateQuestion(id);
    })
  }

  ngOnInit() {
  }

  private updateQuestion(id: number) {
    this.question = this.questionService.getQuestion(id);
  }
}
