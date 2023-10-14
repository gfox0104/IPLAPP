import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-breadcrumb',
  template: `
              <div class="row onSmall">
                <div class="col-12">
                  <div class="page-title-box">
                    <div class="page-title-right">
                      <ol class="breadcrumb m-0">
                        <!-- <li class="breadcrumb-item"><a href="javascript: void(0);">Add New User</a></li>
                        <li class="breadcrumb-item active">{{title}}</li> -->
                      </ol>
                    </div>
                    <h4 class="page-title">{{title}}</h4>
                  </div>
                  <hr>
                </div>
              </div>
  `,
  styles:[`
          
  `]
})

export class AppBreadCrumbComponent {
  @Input() title;
}
