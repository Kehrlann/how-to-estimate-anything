import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    expect(service).toBeTruthy();
  });

  it('returns the list of questions', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    const questions = service.getQuestions();
    expect(questions.length).toBe(2);
  });
});
