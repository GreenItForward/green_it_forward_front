import { Component } from '@angular/core';
import { BreakpointObserver,Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'green_it_forward_front';
  isPhone = false;

  constructor(public responsive: BreakpointObserver) {}

  ngOnInit() {

  this.responsive.observe(Breakpoints.HandsetPortrait)
  .subscribe(result => {
      this.isPhone = false;

      if (result.matches) {
      this.isPhone = true;
      }

  });
  }
  }
