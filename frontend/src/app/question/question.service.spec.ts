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
    const questions = service.getQuestion(2);
    expect(questions.text).toBe('Question two ?');
  });
});
