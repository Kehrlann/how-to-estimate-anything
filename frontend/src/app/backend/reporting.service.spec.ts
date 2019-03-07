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

    expect(socketStub.emit).toHaveBeenCalledWith('answer', {
      id: 1,
      min: 5,
      max: 42
    });
  });
});
