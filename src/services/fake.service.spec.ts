import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { FakeService } from './fake.service';


describe('FakeService', () => {
  let service: FakeService;
  let httpClientMock:any;

  beforeEach(() => {
    httpClientMock={
      get :jest.fn(),
      post :jest.fn()
    }
    service = new FakeService(httpClientMock);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it ('should test getDataV1', ()=>{
    const res = "jest course";
    const url = "https://oussjaz/1";
    jest.spyOn(httpClientMock,'get').mockReturnValue(of(res));
    service.getDataV1();
    expect(httpClientMock.get).toBeCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  })


  it ('should test getDataV2', (done)=>{
    const res = "jest course";
    const url = "https://oussjaz/1";
    jest.spyOn(httpClientMock,'get').mockReturnValue(of(res));
    service.getDataV2().subscribe(
      { 
        next: data => { expect (data).toEqual(res);
                        done();
        },
        error:error =>console.log(error)
      }
    );
    expect(httpClientMock.get).toBeCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  })
  

  it ('should getDataV2 throw error', (done)=>{
    const errorResponse = new HttpErrorResponse({
      error:'test 404 not found',
      status:404,statusText:'Not found'
    })
    const url = "https://oussjaz/1";
    jest.spyOn(httpClientMock,'get').mockReturnValue(throwError(errorResponse));
    service.getDataV2().subscribe(
      { 
        next: data => { console.log(data);
                        done();
        },
        error:error =>{
          expect(error.message).toContain('test 404 not found');
          done();
        }
      }
    );
    expect(httpClientMock.get).toBeCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  })


  it ('should test postDataV1', ()=>{
    const command = "testing";
    const res = "jest course";
    const url = "https://oussjaz/1";
    jest.spyOn(httpClientMock,'post').mockReturnValue(of(res));
    service.postDataV1(command);
    expect(httpClientMock.post).toBeCalledTimes(1);
  })


});
