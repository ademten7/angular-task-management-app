import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../interfaces/constants';
import { TaskData } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  postTask(data: TaskData): Observable<Object> {
    return this.http.post(API_URL, data);
  }

  getTasks(): Observable<any> {
    return this.http.get(API_URL);
  }
  putTask(data: TaskData, id: string): Observable<Object> {
    return this.http.put(API_URL + id, data);
  }
  deleteTask(id: string): Observable<Object> {
    return this.http.delete(API_URL + id);
  }
}
