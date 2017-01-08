import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BadgesService } from '../../shared/service/badges.service';

@Injectable()
export class GetBadgeResolve implements Resolve<any> {

  constructor (private badgesSetvice: BadgesService) {}
  resolve(route: ActivatedRouteSnapshot) {
    return this.badgesSetvice.getBadgeById(route.params['id']);
  }
}
