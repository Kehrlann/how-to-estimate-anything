import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './question/question.service';

@NgModule({
  declarations: [AppComponent, QuestionComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule {}
