import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RoutingService } from '../routing.service';
import { WelcomePageComponent } from './welcome-page.component';

describe('WelcomePageComponent', () => {
  let component: WelcomePageComponent;
  let fixture: ComponentFixture<WelcomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomePageComponent],
      providers: [
        {
          provide: RoutingService,
          useValue: jasmine.createSpyObj('', ['navigateToFirstQuestion'])
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('navigates to the first question on button click', () => {
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    const routingService: jasmine.SpyObj<RoutingService> = TestBed.get(
      RoutingService
    );
    expect(routingService.navigateToFirstQuestion).toHaveBeenCalled();
  });
});
