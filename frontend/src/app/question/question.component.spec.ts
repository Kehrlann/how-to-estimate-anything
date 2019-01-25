import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ActivatedRoute,
  convertToParamMap,
  ParamMap,
  RouterModule
} from '@angular/router';
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
      .query(By.css('#label'))
      .nativeElement.textContent.trim();

    expect(question).toEqual('Question 1 ?');
  });

  describe('when navigating to another question', () => {
    it('loads the question', () => {
      routeSubject.next(convertToParamMap({ id: 2 }));
      fixture.detectChanges();

      const question = fixture.debugElement
        .query(By.css('#label'))
        .nativeElement.textContent.trim();

      expect(question).toEqual('Question 2 ?');
    });
  });
});