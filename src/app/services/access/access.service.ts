import { Injectable, OnInit } from '@angular/core';
import { EncrDecrService } from '../util/encr-decr.service';

Injectable({
  providedIn: 'root'
})

export class AccessService {
  constructor(private EncrDecr: EncrDecrService) {}

  public isAccess(): boolean {
    var groupRoleId;
    if (localStorage.getItem('usertemp_') != null) {
      var encuser = JSON.parse(localStorage.getItem('usertemp_'));
      var decval = this.EncrDecr.get('123456$#@$^@1ERF', (encuser));
      var decuser = JSON.parse(decval);
      var user  = decuser;
      groupRoleId = user.GroupRoleId;
    }

    return groupRoleId === 1 ? true : false;
  }
}

