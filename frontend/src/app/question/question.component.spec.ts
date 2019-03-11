import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { RoutingService } from '../routing.service';
import { QuestionComponent } from './question.component';
import { QuestionWithOrder } from '@common/models';
import { QuestionService } from './question.service';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let routeSubject: Subject<ParamMap>;
  let testQuestion: QuestionWithOrder;

  beforeEach(() => {
    routeSubject = new Subject();
    testQuestion = {
      id: 1,
      text: 'Question 1 ?',
      isLast: false
    };

    TestBed.configureTestingModule({
      declarations: [QuestionComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: routeSubject
          }
        },
        {
          provide: QuestionService,
          useValue: jasmine.createSpyObj('questionService', [
            'getQuestion',
            'saveEstimate'
          ])
        },
        {
          provide: RoutingService,
          useValue: jasmine.createSpyObj('', [
            'navigateToNextQuestion',
            'navigateToSummary'
          ])
        }
      ]
    }).compileComponents();
  });

  // The callback MUST be async for the fakeAsync tests to work
  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    TestBed.get(QuestionService).getQuestion.and.returnValue(testQuestion);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit => subscription to route

    routeSubject.next(convertToParamMap({ id: 1 }));
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets the current question from the service', () => {
    const question = fixture.debugElement
      .query(By.css('#question'))
      .nativeElement.textContent.trim();

    expect(question).toEqual('Question 1 ?');
  });

  it('focuses the min field', () => {
    const minField = fixture.debugElement.query(By.css('input#min'));
    const focusedField = fixture.debugElement.query(By.css(':focus'));

    expect(focusedField).toBe(minField);
  });

  it('displays a field for min and for max', fakeAsync(() => {
    const minField = fixture.debugElement.query(By.css('input#min'));
    const maxField = fixture.debugElement.query(By.css('input#max'));

    expect(minField).not.toBeNull();
    expect(maxField).not.toBeNull();

    minField.nativeElement.value = 1;
    minField.nativeElement.dispatchEvent(new Event('input'));
    maxField.nativeElement.value = 9;
    maxField.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();

    expect(component.question.min).toBe(1);
    expect(component.question.max).toBe(9);
  }));

  it('displays a "next" button', () => {
    const nextButton = fixture.debugElement.query(By.css('button#next'))
      .nativeElement;

    expect(nextButton.textContent).toEqual('Next');
  });

  describe('when filling out a question', () => {
    it('cant navigate to the next question until both fields are filled', () => {
      const button = fixture.debugElement.query(By.css('button#next'));
      expect(button.nativeElement.disabled).toBeTruthy();

      component.question.min = 1;
      component.question.max = undefined;
      fixture.detectChanges();
      expect(button.nativeElement.disabled).toBeTruthy();

      component.question.min = undefined;
      component.question.max = 9;
      fixture.detectChanges();
      expect(button.nativeElement.disabled).toBeTruthy();

      component.question.min = 1;
      component.question.max = 9;
      fixture.detectChanges();
      expect(button.nativeElement.disabled).toBeFalsy();
    });
  });

  describe('when the form is filled and the button clicked', () => {
    beforeEach(() => {
      component.question.min = 1;
      component.question.max = 9;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button#next'))
        .nativeElement;
      button.click();
    });

    it('saves the estimate', () => {
      expect(TestBed.get(QuestionService).saveEstimate).toHaveBeenCalledWith(
        1,
        1,
        9
      );
    });

    it('navigates to the next question', () => {
      expect(
        TestBed.get(RoutingService).navigateToNextQuestion
      ).toHaveBeenCalledWith(testQuestion);
    });
  });

  describe('when navigating to the last question', () => {
    beforeEach(() => {
      const getQuestionSpy: jasmine.Spy = TestBed.get(QuestionService)
        .getQuestion;
      getQuestionSpy.and.returnValue({
        id: 2,
        text: 'Question 2 ?',
        isLast: true
      });
      routeSubject.next(convertToParamMap({ id: 47 }));
      fixture.detectChanges();
    });

    it('loads the question', () => {
      const question = fixture.debugElement
        .query(By.css('#question'))
        .nativeElement.textContent.trim();

      expect(question).toEqual('Question 2 ?');
    });

    it('displays a button with "FINISH"', () => {
      const finishButton = fixture.debugElement.query(By.css('button#next'))
        .nativeElement;

      expect(finishButton.textContent).toEqual('Finish');
    });

    it('navigates to the summary page', () => {
      const finishButton = fixture.debugElement.query(By.css('button#next'))
        .nativeElement;
      const navigateSpy: jasmine.Spy = TestBed.get(RoutingService)
        .navigateToSummary;

      component.question.min = 1;
      component.question.max = 9;
      fixture.detectChanges();
      finishButton.click();

      expect(navigateSpy).toHaveBeenCalled();
    });
  });
});
