import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LinkEditComponent } from './link-edit/link-edit.component';
import { LinkService } from './link.service';
import { HttpClientModule } from '@angular/common/http';
import { LinkCompletedComponent } from './link-completed/link-completed.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: LinkEditComponent },
      // redirect with a shortLink prefilled
      { path: 'redirect.php', component: LinkEditComponent }, 
   ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    LinkEditComponent,
    LinkCompletedComponent,
  ],
  bootstrap: [ AppComponent ],
  providers: [LinkService]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/