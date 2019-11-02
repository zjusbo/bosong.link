import { Component } from '@angular/core';

import { products } from '../products';
import { FormBuilder } from '@angular/forms';
import { LinkService } from '../link.service';

@Component({
  selector: 'app-link-edit',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.css']
})
export class LinkEditComponent {
  products = products;
  linkEditForm;

 constructor(
    private linkSerivce: LinkService,
    private formBuilder: FormBuilder,
  ) {
    this.linkEditForm = this.formBuilder.group({
      shortUrl: '',
      originalUrl: ''
    });
  }

  onSubmit(linkEditForm) {
    var response = this.linkSerivce.edit(linkEditForm.shortUrl, linkEditForm.originalUrl);

    response.subscribe(response => {
        console.log(response)
      }, error => console.log(error));
    
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/