import { Component, EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { AppConfig } from '../../app.config';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { App } from '../../app.component';
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  styleUrls: [ './navbar.style.scss' ],
  templateUrl: './navbar.template.html'
})
export class Navbar implements OnInit {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;

  private searchForm: FormGroup;

  constructor(el: ElementRef, config: AppConfig,
              private router: Router,
              private fb: FormBuilder) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.searchForm = this.fb.group ({
      searchTerm: ''
    });
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }

  ngOnInit(): void {
    setTimeout(() => {
      let $chatNotification = jQuery('#chat-notification');
      $chatNotification.removeClass('hide').addClass('animated fadeIn')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                ' oanimationend animationend', () => {
                $chatNotification.addClass('hide');
              });
          }, 8000);
        });
      $chatNotification.siblings('#toggle-chat')
        .append('<i class="chat-notification-sing animated bounceIn"></i>');
    }, 4000);

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }

  public switchLanguage(lang) {
    SharedModule.translate.use(lang);
  }

  private searchProducts() {
    if (!this.searchForm.value['searchTerm'])  {
      this.router.navigate(['./app', 'products', 'list']);
    } else  {
      this.router.navigate(
        ['./app', 'products', 'list'],
        {queryParams: {q: this.searchForm.value['searchTerm']}}
      );
    }
  }
}
