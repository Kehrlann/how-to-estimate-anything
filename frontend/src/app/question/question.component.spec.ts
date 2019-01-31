import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { QuestionComponent } from './question.component';
import { Question } from './question.model';
import { QuestionService } from './question.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let routeSubject: Subject<ParamMap>;

  beforeEach(async(() => {
    routeSubject = new Subject();

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
            getQuestion: (id: number): Question => {
              if (id === 1) {
                return { id: 1, text: 'Question 1 ?' };
              } else {
                return { id: 2, text: 'Question 2 ?' };
              }
            }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    routeSubject.next(convertToParamMap({ id: 1 }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the current question from the service', () => {
    const question = fixture.debugElement
      .query(By.css('#question'))
      .nativeElement.textContent.trim();

    expect(question).toEqual('Question 1 ?');
  });

  it('displays a field for min and for max', fakeAsync(() => {
    const minField = fixture.debugElement.query(By.css('input#min'));
    const maxField = fixture.debugElement.query(By.css('input#max'));

    expect(minField).not.toBeNull();
    expect(maxField).not.toBeNull();

    component.question.min = 1;
    component.question.max = 9;
    fixture.detectChanges();
    tick();

    expect(minField.nativeElement.value).toBe('1');
    expect(maxField.nativeElement.value).toBe('9');
  }));

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

  describe('when navigating to another question', () => {
    beforeEach(() => {
      routeSubject.next(convertToParamMap({ id: 2 }));
      fixture.detectChanges();
    });

    it('loads the question', () => {
      const question = fixture.debugElement
        .query(By.css('#question'))
        .nativeElement.textContent.trim();

      expect(question).toEqual('Question 2 ?');
    });
  });
});
