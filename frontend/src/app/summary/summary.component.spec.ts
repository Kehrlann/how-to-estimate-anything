import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { QuestionService } from '../question/question.service';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent],
      providers: [
        {
          provide: QuestionService,
          useValue: jasmine.createSpyObj('', ['getQuestions'])
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const service: jasmine.SpyObj<QuestionService> = TestBed.get(
      QuestionService
    );
    service.getQuestions.and.returnValue([
      {
        id: 1,
        text: 'One',
        min: 10,
        max: 19
      },
      {
        id: 2,
        text: 'Two',
        min: 20,
        max: 29
      }
    ]);

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays results for all questions', () => {
    const estimates = fixture.debugElement.queryAll(By.css('.estimate'));
    const one = estimates[0].nativeElement;
    const two = estimates[1].nativeElement;

    expect(one.textContent).toContain('One');
    expect(one.textContent).toContain('10 - 19');

    expect(two.textContent).toContain('Two');
    expect(two.textContent).toContain('20 - 29');
  });
});
