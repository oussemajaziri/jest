import { Component, OnInit } from '@angular/core';
import { FakeService } from 'src/services/fake.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

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
