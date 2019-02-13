import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../routing.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(private routingService: RoutingService) {}

  ngOnInit() {}

  start() {
    this.routingService.navigateToFirstQuestion();
  }
}
