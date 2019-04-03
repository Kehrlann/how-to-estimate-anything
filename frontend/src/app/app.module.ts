import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService, QUESTION_DB } from './question/question.service';
import { SummaryComponent } from './summary/summary.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { getQuestions } from '@common/data';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    WelcomePageComponent,
    SummaryComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [
    QuestionService,
    { provide: QUESTION_DB, useValue: { getQuestions } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
