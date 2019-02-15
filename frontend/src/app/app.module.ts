import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './question/question.service';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { FormsModule } from '@angular/forms';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [AppComponent, QuestionComponent, WelcomePageComponent, SummaryComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
