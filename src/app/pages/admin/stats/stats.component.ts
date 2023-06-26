import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;

  // TODO : get data from API
  userData = [
    {
      name: "Janvier",
      value: 50
    },
    {
      name: "Février",
      value: 78
    },
    {
      name: "Mars",
      value: 90
    },
  ];

  ngOnInit() {
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
  }
}
