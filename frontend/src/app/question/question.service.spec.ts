import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns the list of questions', () => {
    const questions = service.getQuestions();
    expect(questions.length).toBe(2);
  });

  it('returns a specific question', () => {
    const first = service.getQuestion(1);
    const last = service.getQuestion(2);

    expect(first.text).toBe('Question one ?');
    expect(first.isLast).toBeFalsy();
    expect(last.text).toBe('Question two ?');
    expect(last.isLast).toBeTruthy();
  });

  it('returns the next question', () => {
    const nextQuestion = service.getNextQuestion(1);
    expect(nextQuestion.id).toBe(2);
  });
});
