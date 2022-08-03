import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FakeService } from 'src/services/fake.service';


import { DataComponent } from './data.component';
import { HttpErrorResponse } from '@angular/common/http';

import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';


beforeAll(() => {
  TestBed.resetTestEnvironment();
  TestBed.initTestEnvironment(BrowserDynamicTestingModule,platformBrowserDynamicTesting());
});

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;

  beforeEach(async () => {
    fakeServiceMock= {
      getDataV1: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ DataComponent ],
      providers:[
        {
          provide: FakeService, useValue:fakeServiceMock,
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getServiceData set serviceData', () => {
    const expRes = {
      name : "ouss"
    }
    jest.spyOn(fakeServiceMock,'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.serviceData.name).toBe(expRes.name);
  });

  it('should getServiceData set errorMessage', () => {
    const errorMessage = new HttpErrorResponse ({
      error: 'test 404 erroe',
      status: 404, statusText: 'Not Found'
    });
    jest.spyOn(fakeServiceMock,'getDataV1').mockReturnValue(throwError(errorMessage));
    component.getServiceData();
    expect(component.errorMessage).toBe('Not Found');
  });

});
