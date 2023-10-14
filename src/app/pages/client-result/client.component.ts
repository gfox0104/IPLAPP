import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
            <app-header-client-result #datas></app-header-client-result>
            <div style = "/*margin-top: 10%*/ margin:132px auto 0;">
              <router-outlet></router-outlet>
              </div>
            `
})

export class ClientComponent implements OnInit {
  constructor(private xRoute: ActivatedRoute) {}
  ngOnInit() {

  }
}
