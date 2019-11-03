import { Component } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { LinkService } from '../link.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


export enum State {
  INIT,
  PENDING,
  SUCCESS,
  ERROR,
}

@Component({
  selector: 'app-link-edit',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.css']
})
export class LinkEditComponent {
  linkEditForm: FormGroup;
  store = new BehaviorSubject<State>(State.INIT);

  get state(){return State;}
 constructor(
    private linkSerivce: LinkService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.linkEditForm = this.formBuilder.group({
      shortUrl: '',
      originalUrl: ''
    });
    // query param redirect ?url=xxx
    this.route.queryParams.subscribe(params => {
      this.linkEditForm.patchValue({shortUrl: params['url']});
  });
   // Url redirect  /xxxx
    this.route.paramMap.subscribe(params => {
      this.linkEditForm.patchValue({shortUrl: params.get('url')});
  });

    
    this.store.subscribe(state => {
      switch(state) {
        case State.PENDING:
        case State.INIT:
        case State.ERROR:
          break;
        case State.SUCCESS:
          break;
      }
    })
  }

  onSubmit(linkEditForm) {
    var response = this.linkSerivce.edit(linkEditForm.shortUrl, linkEditForm.originalUrl);

    response.pipe( resp => {
      this.store.next(State.PENDING);
      return resp;
    }).subscribe(response => {
        this.store.next(State.SUCCESS);
      }, error => {
        this.store.next(State.ERROR);
        console.log(error)
      }
      );
    
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/