import { Component, OnInit } from '@angular/core';
import { ChartDataService } from '../charts-service/chart-data.service';
import Chart from 'chart.js/auto';
import { Post } from './models';
import {InventoryItem} from './models';

@Component({
  selector: 'app-charts-dashboard',
  templateUrl: './charts-dashboard.component.html',
  styleUrls: ['./charts-dashboard.component.css'],
})
export class ChartsDashboardComponent implements OnInit {
  public chart: any;
  public chartInfo: any;
  public labeldata: any[] = [];
  public realdata: any[] = [];
  public colordata: any[] = [];

  public pieChart: any;
  public inventoryData: InventoryItem[] = [];
  public lineChart: any;

  constructor(public service: ChartDataService) {}

  ngOnInit(): void {
    //FOR BAR CHART : SALARVY AVERAGE
    this.service.getSalaryChartInfo().subscribe((response) => {
      this.chartInfo = response as Post[]; // Type assertion
      if (this.chartInfo != null) {
        const serviceSalaries: {
          [key: string]: { total: number; count: number };
        } = {}; // Type the serviceSalaries object

        for (let i = 0; i < this.chartInfo.length; i++) {
          const service = this.chartInfo[i].services;
          const salary = parseInt(this.chartInfo[i].salary);

          if (serviceSalaries[service]) {
            serviceSalaries[service].total += salary;
            serviceSalaries[service].count += 1;
          } else {
            serviceSalaries[service] = { total: salary, count: 1 };
            this.labeldata.push(service);
          }
        }

        for (const service in serviceSalaries) {
          if (serviceSalaries.hasOwnProperty(service)) {
            const averageSalary =
              serviceSalaries[service].total / serviceSalaries[service].count;
            this.realdata.push(averageSalary);
            this.colordata.push(getRandomColor());
          }
        }

        this.createChart(this.labeldata, this.realdata, this.colordata);
      }
    });

    //FOR PIE CHART: INVENTORY DATA
    this.service.getInventoryData().subscribe((response) => {
      this.inventoryData = response as InventoryItem[];
      if (this.inventoryData && this.inventoryData.length > 0) {
        const itemNames = this.inventoryData.map((item) => item.itemName);
        const quantities = this.inventoryData.map((item) => item.quantity);

        this.createPieChart(itemNames, quantities);
      }
    });

    //FOR LINE CHART: INVENTORY DATA
    this.service.getInventoryData().subscribe((response) => {
      this.inventoryData = response as InventoryItem[];
      if (this.inventoryData && this.inventoryData.length > 0) {
        const dates = this.inventoryData.map((item) => item.date);
        const amounts = this.inventoryData.map((item) => item.amount);

        this.createLineChart(dates, amounts);
      }
    });
  }

  //FOR BAR CHART : AVERAGE SALARY
  createChart(labeldata: any, realdata: any, colordata: any) {
    this.chart = new Chart('MyChart', {
      type: 'bar', // this denotes the type of chart
      data: {
        labels: labeldata, // x-axis
        datasets: [
          {
            label: 'Average Salary', //label color
            data: realdata,
            backgroundColor: colordata,
            borderColor: 'rgba(0, 0, 0, 0.2)', // Add a border color here
            borderWidth: 3, // Set the width of the border
            barThickness: 40,
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            display: false, // Hide the legend (label at the top)
          },
        },
      },
    });
  }

  //FOR PIE CHART: INVENTORY DATA
  createPieChart(itemNames: string[], quantities: number[]) {
    const ctx = document.getElementById('PieChart') as HTMLCanvasElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: itemNames,
        datasets: [
          {
            data: quantities,
            backgroundColor: quantities.map(() => getRandomColor()),
          },
        ],
      },
    });
  }

  //FOR LINE CHART: INVENTORY DATA
  createLineChart(dates: string[], amounts: number[]) {
    const ctx = document.getElementById('LineChart') as HTMLCanvasElement;
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates, // x-axis labels (dates)
        datasets: [
          {
            label: 'Amount', // Label for the dataset
            data: amounts, // y-axis data (amounts)
            borderColor: getRandomColor(), // Line color
            borderWidth: 5, // Line width
            fill: true, // Do not fill the area under the line
          },
        ],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}



// Helper function to generate random colors
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

