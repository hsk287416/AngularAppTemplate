import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { commonReducer } from './reducers/common.reducer';
import { studentReducer } from './reducers/student.reducer';
import { environment } from '../environments/environment';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { StudentEffect } from './effects/student.effect';
import { HttpUtil } from './utils/http.util';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    HttpClientModule,
    StoreModule.forRoot({
      common: commonReducer,
      student: studentReducer
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([
      StudentEffect
    ])
  ],
  providers: [
    HttpUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
