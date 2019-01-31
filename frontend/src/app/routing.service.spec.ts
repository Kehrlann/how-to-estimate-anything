import { TestBed } from '@angular/core/testing';

import { RoutingService } from './routing.service';
import { Router, RoutesRecognized } from '@angular/router';
import { QuestionService } from './question/question.service';

describe('RoutingService', () => {
  let service: RoutingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: jasmine.createSpyObj('', ['navigate'])
        },
        {
          provide: QuestionService,
          useValue: jasmine.createSpyObj('', ['getNextQuestion'])
        }
      ]
    });
    service = TestBed.get(RoutingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('next question', () => {
    it('navigates to the next question', () => {
      const questionService: jasmine.SpyObj<QuestionService> = TestBed.get(
        QuestionService
      );
      questionService.getNextQuestion.and.returnValue({ id: 42 });
      const router: jasmine.SpyObj<Router> = TestBed.get(Router);

      service.navigateToNextQuestion(1337);

      expect(questionService.getNextQuestion).toHaveBeenCalledWith(1337);
      expect(router.navigate).toHaveBeenCalledWith(['question', 42]);
    });
  });
});
