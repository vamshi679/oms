 import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private hc:HttpClient) { }
  
  //to send post request to db with order data
  sendData(x):Observable<any>
  {
    //console.log('data is service',x)
    return this.hc.post('/order',x)
  }

  //to get receive from db
  getData():Observable<any>
  {
    return this.hc.get('/readAll')
  }

  //to delete data from db
  deleteData(ono):Observable<any>
  {
    return this.hc.delete(`/delete/${ono}`)
  }

  //edit data update
  editData(edit):Observable<any>
  {
    return this.hc.put('/update',edit)
  }
}
