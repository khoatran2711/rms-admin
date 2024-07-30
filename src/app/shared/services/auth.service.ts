import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  currentUser(){
    return JSON.parse(localStorage.getItem("currentUser"))
  }

  saveUser(data){
    localStorage.setItem("currentUser", JSON.stringify(data))
  }
  logout(){
    localStorage.removeItem("currentUser")
    location.reload();
  }
}
