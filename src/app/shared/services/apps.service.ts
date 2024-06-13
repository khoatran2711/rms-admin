import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Chat } from '../interfaces/chat.type';
// import { Files } from '../interfaces/file-manager.type';
// import { Mail } from '../interfaces/mail.type';
// import { ProjectList } from '../interfaces/project-list.type';
// import { ContactGrid } from '../interfaces/contacts-grid.type';

@Injectable({
  providedIn: 'root'
})
export class AppsService {
  constructor(private http: HttpClient) {}

  public getChatJSON(): Observable<any[]> {
    return this.http.get<any[]>('https://hexadash-angular.vercel.app/assets/data/apps/chat-data.json');
  }

  public getFileManagerJson(): Observable<any[]> {
    return this.http.get<any[]>('https://hexadash-angular.vercel.app/assets/data/apps/file-manager-data.json');
  }

  public getMailJson(): Observable<any[]> {
    return this.http.get<any[]>('https://hexadash-angular.vercel.app/assets/data/apps/mail-data.json');
  }

  public getReadMailJson(): Observable<any[]> {
    return this.http.get<any[]>('https://hexadash-angular.vercel.app/assets/data/apps/read-email.json');
  }

  public getProjectListJson(): Observable<any[]> {
    return this.http.get<any[]>('https://hexadash-angular.vercel.app/assets/data/apps/project-list-data.json');
  }
  public getContactGridJson(): Observable<any[]> {
    return this.http.get<any[]>('https://hexadash-angular.vercel.app/assets/data/apps/contacts.json');
  }
}
