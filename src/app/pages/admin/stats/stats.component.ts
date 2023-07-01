import { Component, NgZone, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { StatsService } from 'src/app/services/stats.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  userData: { name: string, value: number }[] = [];

  constructor(private statsService: StatsService, private changeDetectorRef: ChangeDetectorRef, private zone: NgZone) { }
  async ngOnInit() : Promise<void> {
    try {
      const year = new Date().getFullYear();
      const newData = await this.statsService.getUsersPerMonth(year);
      this.zone.run(() => {
        this.userData = [...newData];
        this.chartOptions = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Statistiques mensuelles'
          },
          xAxis: {
            categories: this.userData.map(u => u.name),
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Values'
            }
          },
          series: [{
            type: 'column',
            name: 'Mois',
            data: this.userData.map(u => u.value),
            color: '#047857'
          }]
        };
     });
    } catch (error) {
      console.error(error);
    }


  }
}
