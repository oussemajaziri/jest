import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/services/fake.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  serviceData: any;
  errorMessage: any;

  constructor(private fakeService: FakeService) { }

  ngOnInit(): void {
    this.getServiceData();
  }

  getServiceData(){
    this.fakeService.getDataV1().subscribe({
      next:data => {
        this.serviceData = data;
      }, error: err => {
        this.errorMessage = err.statusText;
      }, complete: () => {
        console.log('Finiched');
      }
    });
  }

}
