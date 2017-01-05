import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FAQsService } from '../../shared/service/faqs.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'create-faq',
  styleUrls: [ './create-faq.style.scss' ],
  templateUrl: './create-faq.template.html'
})
export class CreateFAQ implements OnInit {
  public faqData;
  public editForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private faqsService: FAQsService) {}
  ngOnInit(): void {
    if (this.route.snapshot.data['faq']) {
      this.faqData = this.route.snapshot.data['faq'];
    }

    if (!this.faqData) {
      this.editForm = this.formBuilder.group({
        name: ['', Validators.required],
        content: ['', Validators.required]
      });
    } else {
      this.editForm = this.formBuilder.group({
        name: [this.faqData.name, Validators.required],
        content: [this.faqData.content, Validators.required],
      });
    }
  }

  public create() {
    if (!this.editForm.valid) return;

    this.faqsService.createFAQ(this.editForm.value)
      .subscribe( () => this.router.navigate(['/app/faqs/list']),
        error => {
          console.log(error);
      });
  }

  public update() {
    if (!this.editForm.valid) return;

    this.faqsService.updateFAQ(this.editForm.value, this.faqData.id)
      .subscribe( () => this.router.navigate(['/app/faqs/list']));

  }
}
