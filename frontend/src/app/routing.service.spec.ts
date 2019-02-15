import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { QuestionService } from './question/question.service';
import { RoutingService } from './routing.service';

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
          useValue: jasmine.createSpyObj('', [
            'getNextQuestion',
            'getFirstQuestion'
          ])
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

      service.navigateToNextQuestion({
        id: 1337,
        text: 'question',
        isLast: false
      });

      expect(questionService.getNextQuestion).toHaveBeenCalledWith(1337);
      expect(router.navigate).toHaveBeenCalledWith(['question', 42]);
    });
  });

  describe('first question', () => {
    it('navigates to the first question', () => {
      const questionService: jasmine.SpyObj<QuestionService> = TestBed.get(
        QuestionService
      );
      questionService.getFirstQuestion.and.returnValue({ id: 99 });
      const router: jasmine.SpyObj<Router> = TestBed.get(Router);

      service.navigateToFirstQuestion();

      expect(router.navigate).toHaveBeenCalledWith(['question', 99]);
    });
  });

  describe('summary', () => {
    it('navigates to the summary page', () => {
      const router: jasmine.SpyObj<Router> = TestBed.get(Router);

      service.navigateToSummary();

      expect(router.navigate).toHaveBeenCalledWith(['summary']);
    });
  });
});
