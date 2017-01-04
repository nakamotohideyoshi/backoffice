import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProvidersService } from '../../shared/service/providers.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'create-provider',
  styleUrls: [ './create-provider.style.scss' ],
  templateUrl: './create-provider.template.html'
})
export class CreateProvider implements OnInit {
  public providerData;
  public editForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private providerService: ProvidersService) {}
  ngOnInit(): void {
    if (this.route.snapshot.data['provider']) {
      this.providerData = this.route.snapshot.data['provider'];
    }

    if (!this.providerData) {
      this.editForm = this.formBuilder.group({
        name: ['', Validators.required],
        order_email: ['', Validators.required],
        contact_email: ['', Validators.required],
        phone: ['', Validators.required],
        website: ['', Validators.required]
      });
    } else {
      this.editForm = this.formBuilder.group({
        name: [this.providerData.name, Validators.required],
        order_email: [this.providerData.order_email, Validators.required],
        contact_email: [this.providerData.contact_email, Validators.required],
        phone: [this.providerData.phone, Validators.required],
        website: [this.providerData.website, Validators.required]
      });
    }
  }

  public update() {
    if (!this.editForm.valid) return;

    this.providerService.updateProvider(this.editForm.value, this.providerData.id)
      .subscribe( () => alert("done!"));

  }
}
