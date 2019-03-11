import { TestBed } from '@angular/core/testing';
import { QuestionService } from './question.service';
import { ReportingService } from '../backend/reporting.service';

describe('QuestionService', () => {
  let service: QuestionService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ReportingService,
          useValue: jasmine.createSpyObj('reportingService', ['reportEstimate'])
        }
      ]
    });
    service = TestBed.get(QuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns the list of questions', () => {
    const questions = service.getQuestions();
    expect(questions.length).toBe(2);
  });

  it('returns the first question', () => {
    const question = service.getFirstQuestion();
    expect(question.id).toBe(1);
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

  describe('saveEstimate', () => {
    beforeEach(() => {
      service.saveEstimate(1, 42, 1337);
    });

    it('saves an estimate', () => {
      const question = service.getQuestion(1);
      expect(question.min).toEqual(42);
      expect(question.max).toEqual(1337);
    });

    it('publishes the results to the backend on every estimate', () => {
      expect(TestBed.get(ReportingService).reportEstimate).toHaveBeenCalledWith(
        1,
        42,
        1337
      );
    });
  });

  it('does not modify the base questions', () => {
    expect(service.getQuestions()).not.toBe(service.getQuestions());

    service.getFirstQuestion().text = 'toto';
    expect(service.getFirstQuestion().text).not.toEqual('toto');
  });
});
