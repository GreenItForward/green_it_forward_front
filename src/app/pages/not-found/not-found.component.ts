import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  description = this.route.snapshot.queryParams['description'] || "Désolé, nous ne pouvons pas trouver la page que vous recherchez."

}
