import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BadgesService } from '../../shared/service/badges.service';
import { Observable } from 'rxjs';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://api.reklambutiken.com/v1/images/badges';

@Component({
  selector: 'create-badge',
  styleUrls: [ './create-badge.style.scss' ],
  templateUrl: './create-badge.template.html'
})
export class CreateBadge implements OnInit {
  public badgeData;
  public editForm: FormGroup;
  public uploader: FileUploader = new FileUploader({url: URL, authToken:localStorage.getItem('token')});
  public uploadedObject: any;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private badgesService: BadgesService) {}
  ngOnInit(): void {
    if (this.route.snapshot.data['badge']) {
      this.badgeData = this.route.snapshot.data['badge'];
    }

    if (!this.badgeData) {
      this.editForm = this.formBuilder.group({
        alt: ['', Validators.required]
      });
    } else {
      this.editForm = this.formBuilder.group({
        alt: [this.badgeData.alt, Validators.required]
      });
    }

    this.uploader.setOptions({queueLimit: 1, url: URL, authToken:localStorage.getItem('token')});

    this.uploader.onAfterAddingFile = (fileItem: any) => {
      fileItem.withCredentials = false;
      fileItem.upload();
    };

    this.uploader.onSuccessItem = (item:any, response:String, status: Number, headers: any) => {
      setTimeout(() => {
        this.uploader.clearQueue();
        this.uploadedObject = JSON.parse(response.toString());
      }, 500);
    };
  }

  public create() {
    if (!this.editForm.valid) return;
    var newBadge = this.editForm.value;
    newBadge.image = this.uploadedObject;

    this.badgesService.createBadge(newBadge)
      .subscribe( () => this.router.navigate(['/app/badges/list']),
        error => {
          console.log(error);
      });
  }

  public update() {
    if (!this.editForm.valid) return;

    this.badgesService.updateBadge(this.editForm.value, this.badgeData.id)
      .subscribe( () => this.router.navigate(['/app/badges/list']));

  }

}
