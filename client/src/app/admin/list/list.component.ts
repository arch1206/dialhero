import { Component, OnInit } from '@angular/core';
import { GlobleService } from 'src/service/globle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  defaultContent
  heroData={
    modulename:"heros",
    tabletitle:"Heros List",
    createbtntitle:"Add New Books",
    buttons:[
      {title:"Delete",icon:"fas fa-edit", class:"btn btn-primary",type:"delete"},
    ],
    columns:[
      {name:"code",lable:"Code"},
      {name:"name",lable:"Name"},
      {name:'action',lable:"Actions"}]
  };
  constructor(private service:GlobleService, private router:Router) { 
  }

  ngOnInit() {
  }
  actionTable(data)
  {
    this.service.delete("deleteHero",data.data,(a)=>{
      console.log(a)
      return
    })
  }
}
