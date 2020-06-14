import { Component, OnInit } from '@angular/core';
import { GlobleService } from 'src/service/globle.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  heroForm: FormGroup;
  error:String;
  constructor(private service: GlobleService, private route: Router, private fbuilder: FormBuilder){
    this.buildForm();
    this.error = "";
  }

  ngOnInit() {
  }
  buildForm() {
    this.heroForm = this.fbuilder.group(
      {
        'name': ['', [Validators.required, Validators.minLength(4)]],
      }
    );
  }
  save()
  {
    var letters = /^[A-Za-z]+$/;
    if(this.heroForm.value.name.match(letters))
    {
      this.service.postData("heros",this.heroForm.value, (msg) => {
        if (msg == "SUCCESS") {
          console.log(1)
          this.route.navigate(["/list"]);
        } else {
          this.error = msg;
          this.heroForm.reset();
        }
      });
    }
    else
    {
      alert("Invalid Characters");
    }
    
  }

}
