import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountSidebarLinks } from './accounting-sidebar-link';

@Component({
  selector: 'app-account-sidebar',
  templateUrl: './account-sidebar.component.html',
  styleUrls: ['./account-sidebar.component.scss'],
})
export class AccountSidebarComponent implements OnInit {
  accountSidebarLinks = AccountSidebarLinks;
  @Input() ActiveLink: number;
  constructor(private xmodalService: NgbModal) {}

  ngOnInit(): void {}
  NewModelshow(content) {
    //debugger
    this.xmodalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        windowClass: 'NewModel',
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  close() {
    this.xmodalService.dismissAll();
  }
  toggleWithGreeting(popover) {
    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open();
    }
  }
  closeModal() {
    this.xmodalService.dismissAll();
  }
}
