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
        max: 19,
        answer: 15
      },
      {
        id: 2,
        text: 'Two',
        min: 20,
        max: 29,
        answer: 42
      }
    ]);

    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('displaying results', () => {
    let one: DebugElement;
    let two: DebugElement;

    beforeEach(() => {
      const estimates = fixture.debugElement.queryAll(By.css('.estimate'));
      one = estimates[0];
      two = estimates[1];
    });

    it('displays results for all questions', () => {
      const oneText = one.nativeElement.textContent;
      const twoText = two.nativeElement.textContent;

      expect(oneText).toContain('One');
      expect(oneText).toContain('10 - 19');
      expect(oneText).toContain('15');

      expect(twoText).toContain('Two');
      expect(twoText).toContain('20 - 29');
      expect(twoText).toContain('42');
    });

    it('displays a symbol for in.correct estimation', () => {
      const markOne = one.query(By.css('.icon')).nativeElement;
      const markTwo = two.query(By.css('.icon')).nativeElement;

      expect(markOne.textContent.trim()).toEqual('✔');
      expect(markOne.classList).toContain('correct');

      expect(markTwo.textContent.trim()).toEqual('✘');
      expect(markTwo.classList).toContain('incorrect');
    });
  });
});
