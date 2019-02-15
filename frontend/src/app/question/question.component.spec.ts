import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { Subject } from 'rxjs';
import { RoutingService } from '../routing.service';
import { QuestionComponent } from './question.component';
import { QuestionWithOrder } from './question.model';
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
          useValue: {
            getQuestion: jasmine.createSpy().and.returnValue(testQuestion)
          }
        },
        {
          provide: RoutingService,
          useValue: jasmine.createSpyObj('', ['navigateToNextQuestion'])
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    routeSubject.next(convertToParamMap({ id: 1 }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('gets the current question from the service', () => {
    const question = fixture.debugElement
      .query(By.css('#question'))
      .nativeElement.textContent.trim();

    expect(question).toEqual('Question 1 ?');
  });

  it('displays a field for min and for max', () => {
    const minField = fixture.debugElement.query(By.css('input#min'));
    const maxField = fixture.debugElement.query(By.css('input#max'));

    expect(minField).not.toBeNull();
    expect(maxField).not.toBeNull();

    minField.nativeElement.value = 1;
    minField.nativeElement.dispatchEvent(new Event('input'));
    maxField.nativeElement.value = 9;
    maxField.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.question.min).toBe(1);
    expect(component.question.max).toBe(9);
  });

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

  describe('when the form is filled', () => {
    it('navigates to the next question', () => {
      component.question.min = 1;
      component.question.max = 9;
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button#next'))
        .nativeElement;
      button.click();

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
      const nextButton = fixture.debugElement.query(By.css('button#next'))
        .nativeElement;

      expect(nextButton.textContent).toEqual('Finish');
    });
  });
});
