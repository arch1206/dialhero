import { Component, OnInit } from '@angular/core';
import { GlobleService } from 'src/service/globle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  number:String;
  constructor(private serivce:GlobleService) { 
    this.number = '';
  }

  ngOnInit() {}
  
  append(id)
  {
    if(this.number.length>18)
    {
      alert("The length should be less than 18 Characters")
    }
    else
    {
      this.number = this.number.concat(id);
    }

  }
  call()
  {
   if(this.number.substr(0,2)=="0 ")
   {
     var code = this.number.substr(2,this.number.length-1)
     this.serivce.getById("heros",code,(a)=>{
       if(a['msg']=="SUCCESS" && a["data"].length<1)
       {
         alert("No SuperHero exists on this code");
         this.number = "";
       }
       else if(a['msg']!="SUCCESS")
       {
         alert("No SuperHero exists on this code");
         this.number = "";
       }
       else{
         var names = ""
         a.data.name.forEach(element => {
           names = names.concat(", ")
           names = names.concat(element)
         });
         names = names.substr(2,names.length-1)
         alert ("You will be saved by "+names)
       }

     })
   }
   else
   {
     alert("Invalid code! Press 0 then # then Enter code")
   }
  }
  clear()
  {
    this.number ='';
  }

}
