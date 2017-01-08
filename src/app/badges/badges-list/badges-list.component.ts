import { Component, OnInit } from '@angular/core';
import { BadgesService } from '../../shared/service/badges.service';


@Component({
  selector: 'badges-list',
  styleUrls: [ 'badges-list.style.scss' ],
  templateUrl: 'badges-list.template.html',
})
export class BadgesListComponent implements OnInit {
  public badges: any;
  constructor(private badgesService: BadgesService) {
  }
  ngOnInit(): void {
    this.badgesService.getBadges()
      .subscribe(res => this.badges = res);
  }
}
