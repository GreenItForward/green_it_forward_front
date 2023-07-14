import { CommonService } from 'src/app/services/common.service';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from './../../services/confirmation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  token: string | null = null;
  
  constructor(
    private activatesRoute: ActivatedRoute,
    protected router: Router,
    private confirmationService: ConfirmationService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    const token = this.activatesRoute.snapshot.queryParamMap.get('token');
    if (token) {
      lastValueFrom(this.confirmationService.confirm(token)).then(
        response => {
          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 1250);
        },
        error => {
          this.commonService.navigateToErrorPage(`Désolé, ce lien n'est pas valide, ${error.error.message}`);
        }
      );
    }
  }
}