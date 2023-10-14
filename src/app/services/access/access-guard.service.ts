import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

import { MenuMasterModel } from '../../pages/user/add-group/add-group-model';
import { AddGroupsServices } from '../../pages/user/add-group/add-group.service';
import { EncrDecrService } from '../util/encr-decr.service';

@Injectable({
  providedIn: 'root'
})

export class AccessGuardService implements CanActivate {

  MenuMasterModelObj: MenuMasterModel = new MenuMasterModel();
  groupRoles: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  menuList$: Observable<Array<any>>;
  constructor(
    public xAddGroupsServices: AddGroupsServices,
    public auth: AuthService,
    public router: Router,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //debugger
    let roles: any = JSON.parse(localStorage.getItem('groupRoles'));
    if (!roles) return;
    let role = route.data.role;
    let menus: Array<any> = roles[role.number][0].ChildMenu;
    let page = menus.find(p => p.MenuName === role.page_name);
    if (page.IsAssignedMenu) {
      return true;
    } 
    else {
      this.router.navigate(['/access/accessdenied']);
      return false;
    }
  }
}
