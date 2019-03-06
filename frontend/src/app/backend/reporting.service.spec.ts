import { TestBed } from '@angular/core/testing';
import { SocketIoService } from '../socket-io.service';
import { ReportingService } from './reporting.service';

describe('ReportingService', () => {
  let ioSpy: jasmine.Spy;

  beforeEach(() => {
    ioSpy = jasmine.createSpy();
    TestBed.configureTestingModule({
      providers: [{ provide: SocketIoService, useValue: { io: ioSpy } }]
    });
  });

  it('should be created', () => {
    const service: ReportingService = TestBed.get(ReportingService);
    expect(service).toBeTruthy();
  });

  it('connects to the backend', () => {
    TestBed.get(ReportingService);

    expect(ioSpy).toHaveBeenCalledWith('/client');
  });
});
