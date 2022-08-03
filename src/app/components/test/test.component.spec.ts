import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';

import { TestComponent } from './test.component';


describe('TestComponent', () => {
  let fixture: TestComponent;
  let fakeServiceMock: any;

  beforeEach(async () => {
    fakeServiceMock = {
      getDataV1: jest.fn(() => of())
    }
    fixture = new TestComponent(
      fakeServiceMock
    )
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  describe('Test ngOnInit', () => {

    it('should call getServiceData', () => {
      const instanceFunc = jest.spyOn(fixture, 'getServiceData');
      fixture.ngOnInit();
      expect(instanceFunc).toHaveBeenCalled()
    });

  });

  describe('Test getServiceData', () => {

    it('should return data', () => {
      let resp = {
        name: 'prodOne'
      }
      jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(of(resp));
      fixture.getServiceData();
      expect(fixture.serviceData).toBe(resp);
    });

    it('should return error', () => {
      const errorMessage = new HttpErrorResponse({
        error: 'test 404 erroe',
        status: 404, statusText: 'Not Found'
      });
      jest.spyOn(fakeServiceMock, 'getDataV1').mockReturnValue(throwError(errorMessage));
      fixture.getServiceData();
      expect(fixture.errorMessage).toBe('Not Found');
    });
  });


});


