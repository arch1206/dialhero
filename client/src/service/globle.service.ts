import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Subscriber } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })

export class GlobleService{
    saltKey = "Archit_Lumiq";
    token:String;
    headers;
    islogin = false;
    apiUrl="http://49.50.85.27:4230/api/";
    constructor(private http: HttpClient, private router: Router){
        if (localStorage.getItem("token") != undefined) {
          this.decrypt(localStorage.getItem("token"), (des) => {
            this.token = des;
            var userPayload = JSON.parse(atob(this.token.split('.')[1]));
            if(userPayload.exp<Date.now()/1000)
            {
              this.islogin = false;
              // this.router.navigate(['admin/login']);
            }
            else
            {
              if(localStorage.getItem("login") != undefined)
              {
                    this.islogin = true;
                               
              }
              this.headers = new HttpHeaders({'Authorization': 'Bearer ' + des,'Content-Type': 'application/json; charset=utf-8' });
            }
          });
        }  
    }
    login(data,callback){
      const headers = new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8",
      });
      this.http
        .post(this.apiUrl + "login", data, { headers: headers })
        .subscribe((a) => {
          console.log("api",a)
          if (a["msg"] == "SUCCESS") {
            localStorage.setItem("userid", a["data"]["uid"]);
            this.token = a["data"]["token"];
            this.headers = new HttpHeaders({
              Authorization: "Bearer " + a["data"]["token"],
              "Content-Type": "application/json; charset=utf-8",
            });
            this.encrypt(a["data"]["token"], (enc) => {
              localStorage.setItem("token", enc);
            });
            callback(a["msg"]);
          } else {
            callback(a["msg"]);
          }
        });
    }
    logout(){
      this.headers = null;
      localStorage.removeItem('login')
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      this.router.navigate(['login'])
      return 
    }
    jwtVerify(callback) {
      if (localStorage.getItem("token")) {
        var data = {};
        this.http
          .post(this.apiUrl + "verifyToken", data, { headers: this.headers })
          .subscribe((a) => {
            callback(a["data"]);
          });
      } else {
        callback(false);
      }
    }
    postData(path,data,callback)
    {
      this.http.post(this.apiUrl+path,data).subscribe(a=>{
        callback(a['msg'])
      })
    }
    getById(path,data,callback){
      this.http.get(this.apiUrl+path+"/"+data).subscribe(a=>{
        callback(a)
      })
    }
    delete(path,data,callback)
    {
      this.http.post(this.apiUrl+path,data).subscribe(a=>{
       callback(a['msg'])
      })
    }
    encrypt(string, cal) {
      cal(CryptoJS.AES.encrypt(string, this.saltKey).toString());
    }
    decrypt(string, cal) {
      cal(CryptoJS.AES.decrypt(string, this.saltKey).toString(CryptoJS.enc.Utf8));
    }

}