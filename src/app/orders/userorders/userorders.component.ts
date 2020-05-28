import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.css']
})
export class UserordersComponent implements OnInit {

  details:any;
  orderdata:any;
  updatedata:any=[];


  constructor(private gs:GlobalService) { }

  //to get data from db
  ngOnInit() 
  {
    this.gs.getData().subscribe(data1=>{
      if(data1['message']=='no orders found')
      {
        alert('no orders found')
      }
      else
      {
        this.orderdata=data1['message']
      }
    })

    console.log(`data of type ${this.updatedata}`)
  }


  orderdetails(x)
  {
    //console.log(x)
    this.gs.sendData(x).subscribe(data=>{

      if(data['message']=='data inserted success')
      {
        alert('data inserted')
        this.ngOnInit()
      }
      else
      {
        alert(data['message'])
      }
    })
  }



  orderDelete(ono)
  {
    var a=confirm('do you really want to delete')
    if(a==true){
      this.gs.deleteData(ono).subscribe((data2)=>{
        if(data2['message']=='deleted successful')
        {
         alert("data deleted successfully")
          this.ngOnInit();
        }
      })
    }
    else{
      this.ngOnInit();
    }
  }


  orderEdit(x)
  {
    this.gs.editData(x).subscribe(data3=>{
      alert(data3['message'])
      this.ngOnInit()
    })
  }

  update(i)
  {
    this.updatedata=i
    console.log(this.updatedata)
  }
  



}


