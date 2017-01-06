import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../../shared/service/pages.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'create-page',
  styleUrls: [ './create-page.style.scss' ],
  templateUrl: './create-page.template.html'
})
export class CreatePage implements OnInit {
  public pageData;
  public editForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private pageService: PagesService) {}
  ngOnInit(): void {
    if (this.route.snapshot.data['page']) {
      this.pageData = this.route.snapshot.data['page'];
    }

    if (!this.pageData) {
      this.editForm = this.formBuilder.group({
        name: ['', Validators.required],
        content: ['', Validators.required]
      });
    } else {
      this.editForm = this.formBuilder.group({
        name: [this.pageData.name, Validators.required],
        content: [this.pageData.content, Validators.required],
      });
    }
  }

  public create() {
    if (!this.editForm.valid) return;

    this.pageService.createPage(this.editForm.value)
      .subscribe( () => this.router.navigate(['/app/pages/list']),
        error => {
          console.log(error);
      });
  }

  public update() {
    if (!this.editForm.valid) return;

    this.pageService.updatePage(this.editForm.value, this.pageData.id)
      .subscribe( () => this.router.navigate(['/app/pages/list']));

  }
}
