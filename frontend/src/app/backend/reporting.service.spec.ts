import { TestBed } from '@angular/core/testing';
import { SocketIoService } from '../socket-io.service';
import { ReportingService } from './reporting.service';

describe('ReportingService', () => {
  let ioSpy: jasmine.Spy;
  let socketStub: { emit: jasmine.Spy };
  let service: ReportingService;

  beforeEach(() => {
    ioSpy = jasmine.createSpy();
    socketStub = { emit: jasmine.createSpy() };
    ioSpy.and.returnValue(socketStub);
    TestBed.configureTestingModule({
      providers: [{ provide: SocketIoService, useValue: { io: ioSpy } }]
    });
  });

  it('should be created', () => {
    service = TestBed.get(ReportingService);
    expect(service).toBeTruthy();
  });

  it('connects to the backend', () => {
    TestBed.get(ReportingService);

    expect(ioSpy).toHaveBeenCalledWith('/client');
  });

  it('reports the answers', () => {
    service = TestBed.get(ReportingService);
    service.reportAnswer(1, 5, 42);

    const callArgs = socketStub.emit.calls.mostRecent().args;
    expect(callArgs[0]).toEqual('answer');
    const payload = callArgs[1];
    expect(payload.questionId).toEqual(1);
    expect(payload.clientId).not.toBeFalsy();
    expect(payload.answer).toEqual({
      min: 5,
      max: 42
    });
  });
});
