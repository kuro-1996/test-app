import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
interface Type{
  id: number;
}
@Injectable({providedIn: 'root'})
export class ApiService {
  constructor(private http: HttpClient) {}
  private Url = environment.url;

  create(url, item) {
    const fullUrl = `${this.Url}/${url}`;
    return this.http.post(fullUrl,item);
  }

  update(url, item, id) {
    const fullUrl = `${this.Url}/${url}/${id}`;
    return this.http.put(fullUrl,item);
  }

  delete(url, id) {
    const fullUrl = `${this.Url}/${url}/${id}`;
    return this.http.delete(fullUrl);
  }

  get(url) {
    const fullUrl = `${this.Url}/${url}`;
    return this.http.get<any>(fullUrl);
  }
}