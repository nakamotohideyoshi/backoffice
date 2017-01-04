import { Component, OnInit } from '@angular/core';
import { ProvidersService } from '../../shared/service/providers.service';


@Component({
  selector: 'providers-list',
  styleUrls: [ 'providers-list.style.scss' ],
  templateUrl: 'providers-list.template.html',
})
export class ProvidersListComponent implements OnInit {
  public providers: any;
  constructor(private providerService: ProvidersService) {
  }
  ngOnInit(): void {
    this.providerService.getProviders()
      .subscribe(res => this.providers = res);
  }
}
